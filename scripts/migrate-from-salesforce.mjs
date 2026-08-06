#!/usr/bin/env node
/**
 * Pulls article content from the Salesforce Help Center (Lightning
 * Knowledge) and writes it into the new Success Hub database, replacing
 * the placeholder "Content not yet migrated" text created by
 * seed-taxonomy.mjs.
 *
 * WHAT THIS MATCHES ON
 * ---------------------
 * scripts/article-url-crosswalk.json maps each article's title (as it
 * appears in Success Hub) to its OLD help-center URL, e.g.
 *   ".../helpcenter/s/article/all-about-aptitudes"
 * The last path segment ("all-about-aptitudes") is the Knowledge
 * article's UrlName in Salesforce. This script uses that to look up the
 * exact matching article via the Knowledge Support API.
 *
 * SETUP
 * -----
 * 1. Copy .env.example to .env and fill in your Salesforce credentials
 *    (a dedicated integration user is recommended over a personal login).
 * 2. Confirm SF_KNOWLEDGE_OBJECT and SF_BODY_FIELD match your org — see
 *    the "Field discovery" note below if you're not sure of the exact
 *    API names.
 * 3. Run `npx ampx sandbox` in one terminal (keep it running).
 * 4. Run `pnpm migrate:salesforce` in another terminal.
 *
 * FIELD DISCOVERY
 * ----------------
 * If you don't know your org's Knowledge object/field API names, run:
 *   node scripts/migrate-from-salesforce.mjs --describe
 * This prints the describe() for common candidate objects so you can
 * confirm the right one before running the real migration.
 */
import 'dotenv/config';
import jsforce from 'jsforce';
import fs from 'node:fs';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import outputs from '../amplify_outputs.json' with { type: 'json' };

const {
  SF_LOGIN_URL = 'https://login.salesforce.com',
  SF_USERNAME,
  SF_PASSWORD,
  SF_SECURITY_TOKEN = '',
  SF_KNOWLEDGE_OBJECT = 'Knowledge__kav',
  SF_BODY_FIELD = 'Article_Body__c',
  SF_URLNAME_FIELD = 'UrlName',
} = process.env;

const DESCRIBE_MODE = process.argv.includes('--describe');
const DRY_RUN = process.argv.includes('--dry-run');

Amplify.configure(outputs);
const client = generateClient({ authMode: 'apiKey' });

const crosswalk = JSON.parse(
  fs.readFileSync(new URL('./article-url-crosswalk.json', import.meta.url))
);

function urlNameFromLegacyUrl(url) {
  try {
    const path = new URL(url).pathname;
    return decodeURIComponent(path.split('/').filter(Boolean).pop());
  } catch {
    return null;
  }
}

async function connect() {
  if (!SF_USERNAME || !SF_PASSWORD) {
    console.error('Missing SF_USERNAME / SF_PASSWORD. Copy .env.example to .env and fill it in.');
    process.exit(1);
  }
  const conn = new jsforce.Connection({ loginUrl: SF_LOGIN_URL });
  await conn.login(SF_USERNAME, SF_PASSWORD + SF_SECURITY_TOKEN);
  console.log('Connected to Salesforce as', SF_USERNAME);
  return conn;
}

async function describeCandidates(conn) {
  const candidates = [SF_KNOWLEDGE_OBJECT, 'Knowledge__kav', 'FAQ__kav', 'HelpArticle__kav'];
  for (const obj of [...new Set(candidates)]) {
    try {
      const meta = await conn.sobject(obj).describe();
      console.log(`\n=== ${obj} ===`);
      console.log(
        meta.fields
          .filter((f) => /body|content|urlname|title|richtext/i.test(f.name) || f.type === 'textarea')
          .map((f) => `  ${f.name} (${f.type})`)
          .join('\n')
      );
    } catch (err) {
      console.log(`\n=== ${obj} === not accessible (${err.message})`);
    }
  }
}

async function main() {
  const conn = await connect();

  if (DESCRIBE_MODE) {
    await describeCandidates(conn);
    return;
  }

  const { data: articles } = await client.models.Article.list({ limit: 2000 });
  console.log(`Loaded ${articles.length} articles from the new database.`);

  let matched = 0;
  let updated = 0;
  let notFoundInSalesforce = 0;
  let noCrosswalkEntry = 0;

  for (const article of articles) {
    const legacyUrl = crosswalk[article.title];
    if (!legacyUrl) {
      noCrosswalkEntry += 1;
      continue;
    }
    const urlName = urlNameFromLegacyUrl(legacyUrl);
    if (!urlName) continue;

    let record;
    try {
      const result = await conn.query(
        `SELECT Id, Title, ${SF_BODY_FIELD} FROM ${SF_KNOWLEDGE_OBJECT} ` +
          `WHERE ${SF_URLNAME_FIELD} = '${urlName.replace(/'/g, "\\'")}' ` +
          `AND PublishStatus = 'Online' LIMIT 1`
      );
      record = result.records?.[0];
    } catch (err) {
      console.error(`Query failed for "${article.title}" (${urlName}):`, err.message);
      continue;
    }

    if (!record || !record[SF_BODY_FIELD]) {
      notFoundInSalesforce += 1;
      continue;
    }

    matched += 1;
    console.log(`Matched: ${article.title}  ←  ${urlName}`);

    if (!DRY_RUN) {
      const { errors } = await client.models.Article.update({
        id: article.id,
        contentHtml: record[SF_BODY_FIELD],
        legacyHelpCenterUrl: legacyUrl,
        status: 'PUBLISHED',
      });
      if (errors) {
        console.error('  Failed to save:', errors);
      } else {
        updated += 1;
      }
    }
  }

  console.log('\n--- Summary ---');
  console.log('Matched in Salesforce:', matched);
  console.log('Updated in database:', DRY_RUN ? '(dry run — none written)' : updated);
  console.log('No crosswalk entry (never had a legacy URL):', noCrosswalkEntry);
  console.log('Had a legacy URL but not found/published in Salesforce:', notFoundInSalesforce);
  console.log(
    '\nAnything not matched still shows the placeholder "Content not yet migrated" text —' +
      ' fill those in manually from /admin, or re-run --describe to check field names if the' +
      ' match rate looks too low.'
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
