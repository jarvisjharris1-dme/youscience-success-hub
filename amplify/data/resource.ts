import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/**
 * Data model for the Success Hub content system.
 *
 * Product   -> top-level product area (e.g. "Brightpath", "Industry Certifications")
 * Category  -> a section within a product (e.g. "Setup & preparation")
 * Article   -> the actual help content, belongs to one Category
 *
 * Everyone (including logged-out visitors) can READ articles/products/categories.
 * Only members of the "ContentEditors" Cognito group can create/update/delete —
 * that's the group Sarah's account gets added to.
 */
const schema = a.schema({
  Product: a
    .model({
      slug: a.string().required(), // used in URLs: /product/:slug
      title: a.string().required(),
      description: a.string(),
      iconKey: a.string(), // key into the frontend's icon map (see iconMap.ts)
      sortOrder: a.integer().default(0),
      categories: a.hasMany('Category', 'productId'),
    })
    .authorization((allow) => [
      allow.group('ContentEditors').to(['create', 'update', 'delete']),
      allow.publicApiKey().to(['read']),
      allow.authenticated().to(['read']),
    ]),

  Category: a
    .model({
      slug: a.string().required(),
      title: a.string().required(),
      sortOrder: a.integer().default(0),
      productId: a.id().required(),
      product: a.belongsTo('Product', 'productId'),
      articles: a.hasMany('Article', 'categoryId'),
    })
    .authorization((allow) => [
      allow.group('ContentEditors').to(['create', 'update', 'delete']),
      allow.publicApiKey().to(['read']),
      allow.authenticated().to(['read']),
    ]),

  Article: a
    .model({
      slug: a.string().required(), // used in URLs: /product/:productId/article/:slug
      title: a.string().required(),
      subheading: a.string(),
      // Rich text content stored as HTML, edited via the admin rich-text editor.
      contentHtml: a.string(),
      readTime: a.string(), // e.g. "5 min read"
      status: a.enum(['DRAFT', 'PUBLISHED']),
      isQuickStartGuide: a.boolean().default(false), // shows on the Quick Start Guides page
      legacyHelpCenterUrl: a.string(), // original Salesforce URL, kept for reference/audit only
      // JSON array of {name, url} for files that were attached to the
      // original Salesforce Knowledge article (PDFs, docs, etc.),
      // migrated to S3 by migrate-from-salesforce.mjs. Rendered as a
      // "Downloads" list on the article page.
      attachmentsJson: a.string(),
      categoryId: a.id().required(),
      category: a.belongsTo('Category', 'categoryId'),
    })
    .authorization((allow) => [
      allow.group('ContentEditors').to(['create', 'update', 'delete']),
      allow.publicApiKey().to(['read']),
      allow.authenticated().to(['read']),
    ]),

  // ---- Support TV ----
  SupportTVCategory: a
    .model({
      slug: a.string().required(),
      title: a.string().required(),
      description: a.string(),
      sortOrder: a.integer().default(0),
      items: a.hasMany('SupportTVItem', 'categoryId'),
    })
    .authorization((allow) => [
      allow.group('ContentEditors').to(['create', 'update', 'delete']),
      allow.publicApiKey().to(['read']),
      allow.authenticated().to(['read']),
    ]),

  // An item is either a single VIDEO (plays directly) or a PLAYLIST
  // (has child Video records reached via SupportTVPlaylist page).
  SupportTVItem: a
    .model({
      slug: a.string().required(),
      title: a.string().required(),
      description: a.string(),
      type: a.enum(['VIDEO', 'PLAYLIST']),
      thumbnailUrl: a.string(),
      duration: a.string(), // display text, e.g. "12 min" or "4:32"
      videoUrl: a.string(), // used only when type = VIDEO
      featuredOnHome: a.boolean().default(false),
      sortOrder: a.integer().default(0),
      status: a.enum(['DRAFT', 'PUBLISHED']),
      categoryId: a.id().required(),
      category: a.belongsTo('SupportTVCategory', 'categoryId'),
      videos: a.hasMany('Video', 'itemId'),
    })
    .authorization((allow) => [
      allow.group('ContentEditors').to(['create', 'update', 'delete']),
      allow.publicApiKey().to(['read']),
      allow.authenticated().to(['read']),
    ]),

  // Individual videos within a PLAYLIST-type SupportTVItem.
  Video: a
    .model({
      title: a.string().required(),
      description: a.string(),
      duration: a.string(),
      thumbnailUrl: a.string(),
      videoUrl: a.string(),
      sortOrder: a.integer().default(0),
      itemId: a.id().required(),
      item: a.belongsTo('SupportTVItem', 'itemId'),
    })
    .authorization((allow) => [
      allow.group('ContentEditors').to(['create', 'update', 'delete']),
      allow.publicApiKey().to(['read']),
      allow.authenticated().to(['read']),
    ]),

  // ---- Training Webinars ----
  WebinarSection: a
    .model({
      slug: a.string().required(),
      title: a.string().required(),
      sortOrder: a.integer().default(0),
      links: a.hasMany('WebinarLink', 'sectionId'),
    })
    .authorization((allow) => [
      allow.group('ContentEditors').to(['create', 'update', 'delete']),
      allow.publicApiKey().to(['read']),
      allow.authenticated().to(['read']),
    ]),

  // Each row links to either an internal Article (by id) or an external
  // URL (e.g. a live webinar registration page) — set one, not both.
  WebinarLink: a
    .model({
      title: a.string().required(),
      sortOrder: a.integer().default(0),
      externalUrl: a.string(),
      linkedArticleId: a.id(),
      sectionId: a.id().required(),
      section: a.belongsTo('WebinarSection', 'sectionId'),
    })
    .authorization((allow) => [
      allow.group('ContentEditors').to(['create', 'update', 'delete']),
      allow.publicApiKey().to(['read']),
      allow.authenticated().to(['read']),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    // Public site visitors read via API key (no login required).
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 365 },
  },
});
