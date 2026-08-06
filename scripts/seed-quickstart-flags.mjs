#!/usr/bin/env node
/**
 * Flags the articles that should appear on the Quick Start Guides page,
 * matching the wireframe's original curated list. Matches by product
 * slug + article title (several products reuse the plain title "Quick
 * start guide", so title alone isn't enough to disambiguate).
 *
 * Usage: node scripts/seed-quickstart-flags.mjs
 * Run after seed-taxonomy.mjs. Safe to re-run.
 */
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import fs from 'node:fs';
import outputs from '../amplify_outputs.json' with { type: 'json' };

Amplify.configure(outputs);
const client = generateClient({ authMode: 'apiKey' });

const guides = JSON.parse(fs.readFileSync(new URL('./quickstart-seed.json', import.meta.url)));

async function main() {
  for (const guide of guides) {
    const { data: products } = await client.models.Product.list({
      filter: { slug: { eq: guide.productId } },
    });
    const product = products?.[0];
    if (!product) {
      console.warn('No product found for', guide.productId);
      continue;
    }
    const { data: categories } = await client.models.Category.list({
      filter: { productId: { eq: product.id } },
    });
    let matched = null;
    for (const cat of categories ?? []) {
      const { data: articles } = await client.models.Article.list({
        filter: { categoryId: { eq: cat.id }, title: { eq: guide.articleTitle } },
      });
      if (articles?.[0]) {
        matched = articles[0];
        break;
      }
    }
    if (!matched) {
      console.warn('No article match for', guide.displayName, `(looked for "${guide.articleTitle}" in ${product.title})`);
      continue;
    }
    const { errors } = await client.models.Article.update({ id: matched.id, isQuickStartGuide: true });
    if (errors) console.error('Failed to flag', guide.displayName, errors);
    else console.log('Flagged as quick start guide:', guide.displayName);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
