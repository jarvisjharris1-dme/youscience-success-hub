#!/usr/bin/env node
/**
 * Seeds the Amplify Data backend with the Success Hub's existing
 * product/section/article structure (parsed from the current hardcoded
 * ProductPage.tsx). Articles are created as DRAFTs with empty content —
 * run migrate-from-salesforce.mjs afterward to fill in real content, or
 * fill them in by hand from /admin.
 *
 * Usage:
 *   1. npx ampx sandbox   (in a separate terminal, keep it running)
 *   2. node scripts/seed-taxonomy.mjs
 *
 * Safe to re-run: it skips products/categories/articles that already
 * exist (matched by slug), so it won't create duplicates.
 */
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import fs from 'node:fs';
import outputs from '../amplify_outputs.json' with { type: 'json' };

Amplify.configure(outputs);
const client = generateClient({ authMode: 'apiKey' });

const taxonomy = JSON.parse(fs.readFileSync(new URL('./taxonomy-seed-data.json', import.meta.url)));

function slugify(v) {
  return v.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function findBySlug(model, slug) {
  const { data } = await client.models[model].list({ filter: { slug: { eq: slug } } });
  return data?.[0] ?? null;
}

async function main() {
  let productSort = 0;
  for (const product of taxonomy) {
    const slug = product.id; // original ids were already good slugs
    let productRecord = await findBySlug('Product', slug);
    if (!productRecord) {
      const { data, errors } = await client.models.Product.create({
        slug,
        title: product.title,
        description: product.description ?? '',
        iconKey: product.id,
        sortOrder: productSort,
      });
      if (errors) {
        console.error('Failed to create product', slug, errors);
        continue;
      }
      productRecord = data;
      console.log('Created product:', product.title);
    } else {
      console.log('Product already exists, skipping:', product.title);
    }
    productSort += 1;

    let catSort = 0;
    for (const category of product.categories) {
      const catSlug = `${slug}--${category.id}`;
      const { data: existingCats } = await client.models.Category.list({
        filter: { slug: { eq: catSlug } },
      });
      let categoryRecord = existingCats?.[0];
      if (!categoryRecord) {
        const { data, errors } = await client.models.Category.create({
          slug: catSlug,
          title: category.title,
          productId: productRecord.id,
          sortOrder: catSort,
        });
        if (errors) {
          console.error('Failed to create category', catSlug, errors);
          continue;
        }
        categoryRecord = data;
        console.log('  Created section:', category.title);
      }
      catSort += 1;

      for (const article of category.articles) {
        const articleSlug = slugify(article.title);
        const existing = await findBySlug('Article', articleSlug);
        if (existing) continue;
        const { errors } = await client.models.Article.create({
          slug: articleSlug,
          title: article.title,
          subheading: article.subheading ?? '',
          contentHtml: '<p><em>Content not yet migrated.</em></p>',
          readTime: '',
          status: 'DRAFT',
          categoryId: categoryRecord.id,
        });
        if (errors) {
          console.error('    Failed to create article', article.title, errors);
        } else {
          console.log('    Created article (draft):', article.title);
        }
      }
    }
  }
  console.log('\nDone. All articles were created as DRAFT with placeholder content.');
  console.log('Next: run `pnpm migrate:salesforce` to pull real content, then publish from /admin.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
