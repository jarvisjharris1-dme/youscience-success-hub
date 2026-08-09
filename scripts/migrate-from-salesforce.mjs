#!/usr/bin/env node
/**
 * Pulls article content from the Salesforce Help Center (Lightning
 * Knowledge) and writes it into the new Success Hub database, replacing
 * the placeholder "Content not yet migrated" text created by
 * seed-taxonomy.mjs. Also re-hosts:
 *   - Images embedded in the article body (so they don't silently break
 *     once the old Help Center is retired)
 *   - File attachments on the article (PDFs, docs, etc.) — these appear
 *     as a "Downloads" list on the article page
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
 * 3. Make sure your backend is deployed (amplify_outputs.json has real
 *    values, not the placeholder).
 * 4. Run `node scripts/migrate-from-salesforce.mjs --dry-run` first to
 *    see the match rate before writing anything.
 * 5. Run `pnpm migrate:salesforce` for real.
 *
 * FIELD DISCOVERY
 * ----------------
 * If you don't know your org's Knowledge object/field API names, run:
 *   node scripts/migrate-from-salesforce.mjs --describe
 * This prints the describe() for common candidate objects so you can
 * confirm the right one before running the real migration.
 *
 * FLAGS
 * -----
 *   --describe          print field info for candidate objects, then exit
 *   --dry-run           show what would be matched/migrated, write nothing
 *   --skip-images       don't re-host embedded images (leaves original
 *                       Salesforce image URLs in place — will break once
 *                       the old Help Center is retired)
 *   --skip-attachments  don't migrate file attachments (Downloads list)
 */
import 'dotenv/config';
import jsforce from 'jsforce';
import fs from 'node:fs';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import { uploadData } from 'aws-amplify/storage';
import { signInSeedUser } from './lib/seedAuth.mjs';
import outputs from '../amplify_outputs.json' with { type: 'json' };

const {
  SF_LOGIN_URL = 'https://login.salesforce.com',
  SF_USERNAME,
  SF_PASSWORD,
  SF_SECURITY_TOKEN = '',
  SF_KNOWLEDGE_OBJECT = 'Knowledge__kav',
  SF_BODY_FIELD = 'Article_Body__c',
  SF_URLNAME_FIELD = 'UrlName',
  SF_API_VERSION = 'v59.0',
} = process.env;

const DESCRIBE_MODE = process.argv.includes('--describe');
const DRY_RUN = process.argv.includes('--dry-run');
const SKIP_IMAGES = process.argv.includes('--skip-images');
const SKIP_ATTACHMENTS = process.argv.includes('--skip-attachments');

Amplify.configure(outputs);
const client = generateClient({ authMode: 'userPool' });

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

function slugifyFilename(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/(^-|-$)/g, '');
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

/**
 * Downloads a binary resource from Salesforce using the authenticated
 * session (works for both ContentVersion file downloads and inline
 * rich-text images), and uploads it to S3 under the given key prefix.
 * Returns the new public URL, or null if anything failed (caller should
 * leave the original content/reference untouched on failure).
 */
async function downloadAndRehost(conn, sfPath, keyPrefix, filenameHint) {
  try {
    const url = sfPath.startsWith('http') ? sfPath : `${conn.instanceUrl}${sfPath}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${conn.accessToken}` },
    });
    if (!res.ok) {
      console.warn(`    Download failed (${res.status}) for ${url}`);
      return null;
    }
    const contentType = res.headers.get('content-type') || 'application/octet-stream';
    const buffer = Buffer.from(await res.arrayBuffer());
    const filename = slugifyFilename(filenameHint || url.split('/').pop() || 'file');
    const key = `public/${keyPrefix}/${Date.now()}-${filename}`;
    const result = await uploadData({
      path: key,
      data: buffer,
      options: { contentType },
    }).result;
    // Build the public URL from the storage bucket config directly
    // (avoids an extra getUrl round-trip per file).
    const bucket = outputs.storage?.bucket_name;
    const region = outputs.storage?.aws_region;
    return `https://${bucket}.s3.${region}.amazonaws.com/${result.path}`;
  } catch (err) {
    console.warn(`    Re-host failed for ${sfPath}:`, err.message);
    return null;
  }
}

/**
 * Finds <img src="..."> tags pointing at Salesforce-hosted images
 * (relative paths, or full URLs on the org's own instance domain),
 * downloads each one, re-hosts it in S3, and rewrites the src in place.
 */
async function migrateEmbeddedImages(conn, html, articleTitle) {
  if (!html) return { html, count: 0 };
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  const matches = [...html.matchAll(imgRegex)];
  if (matches.length === 0) return { html, count: 0 };

  let updatedHtml = html;
  let count = 0;
  for (const match of matches) {
    const src = match[1];
    const isSalesforceHosted =
      src.startsWith('/') || src.includes(conn.instanceUrl.replace(/^https?:\/\//, ''));
    if (!isSalesforceHosted) continue; // already an external/public URL, leave it

    const newUrl = await downloadAndRehost(conn, src, 'article-images', `${articleTitle}-image`);
    if (newUrl) {
      updatedHtml = updatedHtml.split(src).join(newUrl);
      count += 1;
      console.log(`    Re-hosted image: ${src.slice(0, 60)}... → S3`);
    }
  }
  return { html: updatedHtml, count };
}

/**
 * Finds file attachments (ContentDocumentLink → ContentVersion) linked
 * to a Knowledge article record and re-hosts each one in S3. Returns an
 * array of {name, url} for storage in Article.attachmentsJson.
 */
async function migrateAttachments(conn, sfRecordId) {
  let links;
  try {
    links = await conn.query(
      `SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId = '${sfRecordId}'`
    );
  } catch (err) {
    // Content objects may not be enabled/accessible for this integration
    // user — don't fail the whole migration over it.
    console.warn('    Could not query attachments:', err.message);
    return [];
  }
  if (!links.records?.length) return [];

  const attachments = [];
  for (const link of links.records) {
    let versions;
    try {
      versions = await conn.query(
        `SELECT Id, Title, FileExtension FROM ContentVersion ` +
          `WHERE ContentDocumentId = '${link.ContentDocumentId}' AND IsLatest = true LIMIT 1`
      );
    } catch (err) {
      console.warn('    Could not load file version:', err.message);
      continue;
    }
    const version = versions.records?.[0];
    if (!version) continue;

    const filename = `${version.Title}.${version.FileExtension}`;
    const newUrl = await downloadAndRehost(
      conn,
      `/services/data/${SF_API_VERSION}/sobjects/ContentVersion/${version.Id}/VersionData`,
      'article-attachments',
      filename
    );
    if (newUrl) {
      attachments.push({ name: filename, url: newUrl });
      console.log(`    Re-hosted attachment: ${filename}`);
    }
  }
  return attachments;
}

async function main() {
  if (!DESCRIBE_MODE) {
    await signInSeedUser();
  }
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
  let imagesRehosted = 0;
  let attachmentsRehosted = 0;

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

    if (DRY_RUN) continue; // no network-heavy work or writes in dry-run

    let contentHtml = record[SF_BODY_FIELD];

    if (!SKIP_IMAGES) {
      const result = await migrateEmbeddedImages(conn, contentHtml, article.title);
      contentHtml = result.html;
      imagesRehosted += result.count;
    }

    let attachmentsJson;
    if (!SKIP_ATTACHMENTS) {
      const attachments = await migrateAttachments(conn, record.Id);
      if (attachments.length > 0) {
        attachmentsJson = JSON.stringify(attachments);
        attachmentsRehosted += attachments.length;
      }
    }

    const { errors } = await client.models.Article.update({
      id: article.id,
      contentHtml,
      legacyHelpCenterUrl: legacyUrl,
      status: 'PUBLISHED',
      ...(attachmentsJson ? { attachmentsJson } : {}),
    });
    if (errors) {
      console.error('  Failed to save:', errors);
    } else {
      updated += 1;
    }
  }

  console.log('\n--- Summary ---');
  console.log('Matched in Salesforce:', matched);
  console.log('Updated in database:', DRY_RUN ? '(dry run — none written)' : updated);
  console.log('Images re-hosted:', DRY_RUN ? '(dry run — skipped)' : imagesRehosted);
  console.log('Attachments re-hosted:', DRY_RUN ? '(dry run — skipped)' : attachmentsRehosted);
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
