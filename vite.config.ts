import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

// TEMPORARY DIAGNOSTIC — logs memory usage at every major build stage so
// we can see exactly where a CI build is spiking, instead of guessing.
// Safe to remove once the build OOM is resolved.
function memoryLogger() {
  let transformCount = 0
  const log = (label: string) => {
    const m = process.memoryUsage()
    const mb = (n: number) => (n / 1024 / 1024).toFixed(0)
    console.log(
      `[mem] ${label} — rss=${mb(m.rss)}MB heapUsed=${mb(m.heapUsed)}MB heapTotal=${mb(m.heapTotal)}MB external=${mb(m.external)}MB arrayBuffers=${mb(m.arrayBuffers)}MB`
    )
  }

  // Ticks independently of any build hook, in case a single long native
  // call (e.g. Tailwind's Rust CSS engine) blocks without triggering any
  // Rollup/Vite hook in between.
  const ticker = setInterval(() => log('tick'), 2000)
  ;(ticker as any).unref?.()

  process.on('exit', (code) => log(`process exit (code ${code})`))
  process.on('uncaughtException', (err) => {
    log(`uncaughtException: ${err.message}`)
  })
  process.on('unhandledRejection', (reason) => {
    log(`unhandledRejection: ${reason}`)
  })
  process.on('SIGTERM', () => log('SIGTERM received'))

  return {
    name: 'memory-logger',
    buildStart() {
      log('buildStart')
    },
    transform(_code: string, id: string) {
      transformCount++
      if (transformCount % 250 === 0) {
        log(`transform #${transformCount} (${id.split('/').slice(-2).join('/')})`)
      }
      return null
    },
    buildEnd(err?: Error) {
      log(`buildEnd (transformed ${transformCount} modules)${err ? ' — ERROR: ' + err.message : ''}`)
    },
    renderStart() {
      log('renderStart')
    },
    renderChunk(code: string, chunk: { fileName: string }) {
      log(`renderChunk ${chunk.fileName} (${(code.length / 1024).toFixed(0)}KB source)`)
      return null
    },
    generateBundle() {
      log('generateBundle')
    },
    writeBundle() {
      log('writeBundle')
    },
    closeBundle() {
      log('closeBundle')
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    memoryLogger(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Splitting heavy dependencies into their own chunks keeps any single
    // chunk smaller, which reduces peak memory during minification (this
    // was contributing to CI build OOMs) and improves browser caching.
    rollupOptions: {
      // These are backend-only tooling (used by amplify/*.ts and
      // scripts/*.mjs) and must never end up in the browser bundle.
      // Pages only reference them via `import type`, which esbuild should
      // already strip, but externalizing here guarantees Rollup can never
      // resolve/bundle aws-cdk-lib (a very large package) into the client
      // build even if that stripping doesn't happen for some reason —
      // this was a suspected contributor to CI build OOMs.
      external: [
        '@aws-amplify/backend',
        '@aws-amplify/backend-cli',
        'aws-cdk-lib',
        'constructs',
        'jsforce',
        'dotenv',
      ],
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router'],
          'vendor-amplify': ['aws-amplify', '@aws-amplify/ui-react'],
          'vendor-editor': ['@tiptap/react', '@tiptap/starter-kit', '@tiptap/extension-image', '@tiptap/extension-link'],
          'vendor-charts': ['recharts'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 800,
    reportCompressedSize: false,
  },
})
