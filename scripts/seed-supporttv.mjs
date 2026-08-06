#!/usr/bin/env node
/**
 * Seeds SupportTVCategory / SupportTVItem / Video records from the
 * existing wireframe's hardcoded Support TV content, so the video
 * library structure isn't lost. Real per-video detail (title,
 * description, videoUrl) only existed in the wireframe for a handful of
 * playlists ("What's New" and "User Administration" categories) — the
 * rest are seeded as playlists with the right title/thumbnail/duration
 * but no videos yet; add those from /admin > Support TV.
 *
 * Usage: node scripts/seed-supporttv.mjs   (after `npx ampx sandbox`)
 * Safe to re-run — skips categories/items that already exist by slug.
 */
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import fs from 'node:fs';
import outputs from '../amplify_outputs.json' with { type: 'json' };

Amplify.configure(outputs);
const client = generateClient({ authMode: 'apiKey' });

const categoriesData = JSON.parse(
  fs.readFileSync(new URL('./supporttv-categories-seed.json', import.meta.url))
);
const videosData = JSON.parse(fs.readFileSync(new URL('./supporttv-videos-seed.json', import.meta.url)));

async function findBySlug(model, slug, extraFilter = {}) {
  const { data } = await client.models[model].list({ filter: { slug: { eq: slug }, ...extraFilter } });
  return data?.[0] ?? null;
}

async function main() {
  let catSort = 0;
  for (const cat of categoriesData) {
    let category = await findBySlug('SupportTVCategory', cat.id);
    if (!category) {
      const { data, errors } = await client.models.SupportTVCategory.create({
        slug: cat.id,
        title: cat.title,
        description: cat.description ?? '',
        sortOrder: catSort,
      });
      if (errors) {
        console.error('Failed to create category', cat.id, errors);
        continue;
      }
      category = data;
      console.log('Created category:', cat.title);
    }
    catSort += 1;

    let itemSort = 0;
    for (const item of cat.items) {
      const existing = await findBySlug('SupportTVItem', item.id, { categoryId: { eq: category.id } });
      if (existing) {
        itemSort += 1;
        continue;
      }
      const type = item.type === 'playlist' ? 'PLAYLIST' : 'VIDEO';
      const { data: itemRecord, errors } = await client.models.SupportTVItem.create({
        slug: item.id,
        title: item.title,
        description: item.description ?? '',
        type,
        thumbnailUrl: item.thumbnail ?? '',
        duration: item.duration ?? '',
        status: 'DRAFT',
        categoryId: category.id,
        sortOrder: itemSort,
      });
      if (errors) {
        console.error('  Failed to create item', item.id, errors);
        itemSort += 1;
        continue;
      }
      console.log('  Created item:', item.title, `(${type})`);
      itemSort += 1;

      // If we have real per-video detail for this playlist, seed the videos too.
      const realVideos = videosData[cat.id]?.[item.id]?.videos;
      if (type === 'PLAYLIST' && realVideos) {
        let videoSort = 0;
        for (const v of realVideos) {
          const { errors: vErrors } = await client.models.Video.create({
            title: v.title,
            description: v.description ?? '',
            duration: v.duration ?? '',
            thumbnailUrl: v.thumbnail ?? '',
            videoUrl: v.videoUrl ?? '',
            itemId: itemRecord.id,
            sortOrder: videoSort,
          });
          if (vErrors) console.error('    Failed to create video', v.title, vErrors);
          else console.log('    Added video:', v.title);
          videoSort += 1;
        }
      }
    }
  }
  console.log('\nDone. All items were created as DRAFT — publish the ones you want visible from /admin.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
