#!/usr/bin/env node
/**
 * Seeds WebinarSection / WebinarLink records from the existing
 * wireframe's hardcoded Training Webinars content. Links are matched
 * against already-migrated Articles by title (run seed-taxonomy.mjs and
 * migrate-from-salesforce.mjs first for the best match rate) — anything
 * that can't be matched is still created, just without a working link
 * yet, so you can wire it up from /admin > Training Webinars.
 *
 * Usage: node scripts/seed-webinars.mjs   (after `npx ampx sandbox`)
 * Safe to re-run — skips sections that already exist by slug.
 */
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import fs from 'node:fs';
import outputs from '../amplify_outputs.json' with { type: 'json' };

Amplify.configure(outputs);
const client = generateClient({ authMode: 'apiKey' });

const sectionsData = JSON.parse(fs.readFileSync(new URL('./webinars-seed.json', import.meta.url)));

function slugify(v) {
  return v.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function findArticleByTitle(title) {
  const { data } = await client.models.Article.list({ filter: { title: { eq: title } } });
  return data?.[0] ?? null;
}

async function main() {
  let sectionSort = 0;
  for (const section of sectionsData) {
    const slug = section.id ?? slugify(section.title);
    const { data: existingSections } = await client.models.WebinarSection.list({
      filter: { slug: { eq: slug } },
    });
    let sectionRecord = existingSections?.[0];
    if (!sectionRecord) {
      const { data, errors } = await client.models.WebinarSection.create({
        slug,
        title: section.title,
        sortOrder: sectionSort,
      });
      if (errors) {
        console.error('Failed to create section', section.title, errors);
        continue;
      }
      sectionRecord = data;
      console.log('Created section:', section.title);
    }
    sectionSort += 1;

    let linkSort = 0;
    for (const article of section.articles ?? []) {
      const match = await findArticleByTitle(article.title);
      const { errors } = await client.models.WebinarLink.create({
        title: article.title,
        sectionId: sectionRecord.id,
        sortOrder: linkSort,
        linkedArticleId: match?.id,
      });
      if (errors) {
        console.error('  Failed to create link', article.title, errors);
      } else {
        console.log('  Created link:', article.title, match ? '(matched to article)' : '(no match yet)');
      }
      linkSort += 1;
    }
  }
  console.log('\nDone. Links without a match can be pointed at an article or external URL from /admin.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
