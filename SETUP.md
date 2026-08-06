# Success Hub — backend, migration & admin setup

This adds three things to the existing wireframe:

1. A real database (Products → Sections → Articles) instead of hardcoded
   content, via **Amplify Data**.
2. A password-gated **`/admin`** area where content editors (e.g. Sarah)
   can add/edit/publish articles and manage products & sections — no
   code or redeploy required.
3. A **migration script** that pulls real article content from the old
   Salesforce Help Center (youscience.my.site.com) into the new database,
   so articles live natively in Success Hub instead of linking out.

Nothing here has been deployed yet — it needs an AWS account connected
to Amplify. Below is the order to run things in.

---

## 1. Install dependencies

```bash
pnpm install   # or npm install — package.json has everything already added
```

## 2. Deploy the backend (sandbox / dev)

This provisions the DynamoDB tables, Cognito user pool, and S3 bucket in
your AWS account, and writes real values into `amplify_outputs.json`
(currently a placeholder file).

```bash
npx ampx sandbox
```

Leave this running in its own terminal — it watches `amplify/` and
redeploys on changes. It will prompt you to confirm your AWS profile/
credentials if you haven't used Amplify Gen2 before.

For production, replace this step with connecting the repo in the
**AWS Amplify Console** and using `npx ampx pipeline-deploy` in CI
instead of the sandbox — see
https://docs.amplify.aws/react/deploy-and-host/fullstack-branching/branch-deployments/

## 3. Seed the existing structure

This creates all 9 products, 40 sections, and 226 articles (as drafts
with placeholder text), plus the existing Support TV categories/
playlists/videos and Training Webinar sections, and flags the articles
that were previously featured on the Quick Start Guides page — all from
the current site's structure, so nothing gets lost:

```bash
pnpm seed:all
```

(Runs, in order: `seed:taxonomy`, `seed:supporttv`, `seed:webinars`,
`seed:quickstart-flags`. Each is also runnable individually and is safe
to re-run — they skip anything that already exists.)

Note: the wireframe only had full per-video detail (title, description,
video URL) written out for two Support TV categories ("What's New" and
"User Administration"). Every other playlist is seeded with the right
title/thumbnail/duration but no videos yet — add those from
`/admin` → Support TV → *Manage videos* once you have real video URLs.

## 4. Migrate real content from Salesforce

```bash
cp .env.example .env
# fill in SF_USERNAME / SF_PASSWORD (a dedicated integration user is
# recommended over a personal login) in .env
```

First, confirm your org's field names (these vary by org customization):

```bash
node scripts/migrate-from-salesforce.mjs --describe
```

This prints the real object/field API names for your Knowledge base.
Update `SF_KNOWLEDGE_OBJECT` / `SF_BODY_FIELD` in `.env` if they differ
from the defaults.

Then do a dry run to see the match rate before writing anything:

```bash
node scripts/migrate-from-salesforce.mjs --dry-run
```

If the match rate looks right, run it for real:

```bash
pnpm migrate:salesforce
```

This matches articles by the URL slug already recorded in
`src/app/data/articleUrls.ts` (used to build
`scripts/article-url-crosswalk.json`), so it only touches articles that
had a known legacy URL. Anything it can't find gets left as the
"Content not yet migrated" placeholder — Sarah can fill those in by
hand from `/admin`, or you can re-run the script later once they're
published in Salesforce.

**Once migration is confirmed to be working well, articles that were
matched are set to `PUBLISHED` automatically.** Anything not migrated
stays `DRAFT` and won't show on the public site.

## 5. Add Sarah (or anyone else) as a content editor

Editors need two things: a Cognito login, and membership in the
**ContentEditors** group (that's what Amplify Data checks before
allowing writes — see `amplify/data/resource.ts`).

**Easiest path — self-serve signup, then promote:**
1. Sarah visits `/admin` and creates an account (the `Authenticator`
   component handles email/password + verification).
2. You add her to the group via AWS CLI:
   ```bash
   aws cognito-idp admin-add-user-to-group \
     --user-pool-id <YOUR_USER_POOL_ID> \
     --username sarah@youscience.com \
     --group-name ContentEditors
   ```
   (Find `YOUR_USER_POOL_ID` in `amplify_outputs.json` under
   `auth.user_pool_id`, or in the Cognito console.)

Until she's added to the group, she'll see a "your account is signed
in but not yet approved" message at `/admin` — that's expected.

## 6. Using `/admin` day to day

- **Products & Sections** — add/rename/delete top-level products and the
  sections within them.
- **Articles** — create, edit (rich text with images/links), set
  Draft/Published status, and check "Show on the Quick Start Guides
  page" for anything that should appear there. Only `PUBLISHED`
  articles are visible on the public site.
- **Support TV** — add/edit categories and items (single videos or
  playlists), set thumbnails/durations/embed URLs, mark items to feature
  on the homepage, and manage the individual videos inside a playlist.
- **Training Webinars** — add/edit sections and links; each link either
  points at an existing article or an external URL (e.g. a live webinar
  registration page).
- Changes are live immediately — no deploy needed.

## 7. Retiring the redirect / old Help Center

Once you've confirmed content looks right in `/admin` and spot-checked
the migrated articles, the old `youscience.my.site.com/helpcenter`
links can be fully retired — nothing in this app links out to it
anymore. The `legacyHelpCenterUrl` field is kept on each article purely
as an internal reference/audit trail.

---

### Notes on what changed in the code

- Every page — `ArticlePage`, `ProductPage`, `SupportTVCategories`,
  `SupportTVCategoryPlaylists`, `SupportTVPlaylist`, `QuickStartGuides`,
  `TrainingWebinars`, and the homepage's `ContentClusters` /
  `VideoTutorials` sections — now fetches from the database
  (`src/app/lib/content.ts` / `amplifyClient.ts`) instead of using
  hardcoded objects.
- `src/app/data/articleUrls.ts` is no longer used by the app at runtime
  — it's kept only as the source for the migration crosswalk. Safe to
  delete once migration is complete and verified.
- `QuickLinks.tsx` (the 4 fixed buttons at the top of the homepage) and
  the page frame (`Header`/`Footer`) are still static — they're
  structural navigation, not editorial content, so there was nothing to
  wire up there.
- `PopularArticles.tsx` and `LatestUpdates.tsx` exist in
  `src/app/components/` but aren't imported by `Home.tsx` or anywhere
  else — they were already unused/orphaned in the original wireframe,
  not something this pass removed. Safe to delete, or wire up later if
  you want a "most popular" / "what's new" section on the homepage.
