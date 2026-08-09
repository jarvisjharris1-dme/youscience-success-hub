import { client } from './amplifyClient';

/**
 * Thin data-access layer over Amplify Data. Keeping these calls in one
 * place means the public pages (ProductPage, ArticlePage, Home) and the
 * admin panel all read/write content the same way.
 */

export async function listProducts() {
  const { data, errors } = await client.models.Product.list();
  if (errors) console.error('listProducts errors', errors);
  return [...(data ?? [])].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export async function getProductBySlug(slug: string) {
  const { data } = await client.models.Product.list({ filter: { slug: { eq: slug } } });
  return data?.[0] ?? null;
}

export async function listCategoriesForProduct(productId: string) {
  const { data } = await client.models.Category.list({
    filter: { productId: { eq: productId } },
  });
  return [...(data ?? [])].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export async function listArticlesForCategory(categoryId: string, publishedOnly = true) {
  const { data } = await client.models.Article.list({
    filter: publishedOnly
      ? { categoryId: { eq: categoryId }, status: { eq: 'PUBLISHED' } }
      : { categoryId: { eq: categoryId } },
  });
  return data ?? [];
}

export async function getArticleBySlug(slug: string) {
  const { data } = await client.models.Article.list({ filter: { slug: { eq: slug } } });
  return data?.[0] ?? null;
}

export async function getArticleWithCategoryAndProduct(articleSlug: string) {
  const article = await getArticleBySlug(articleSlug);
  if (!article) return null;
  const { data: category } = await client.models.Category.get({ id: article.categoryId });
  const product = category ? await client.models.Product.get({ id: category.productId }) : null;
  return { article, category, product: product?.data ?? null };
}

// ---- Admin (write) operations — only succeed for ContentEditors group members ----

export const createProduct = (input: {
  slug: string;
  title: string;
  description?: string;
  iconKey?: string;
  sortOrder?: number;
}) => client.models.Product.create(input, { authMode: 'userPool' });

export const updateProduct = (input: { id: string } & Partial<{
  slug: string;
  title: string;
  description: string;
  iconKey: string;
  sortOrder: number;
}>) => client.models.Product.update(input, { authMode: 'userPool' });

export const deleteProduct = (id: string) => client.models.Product.delete({ id }, { authMode: 'userPool' });

export const createCategory = (input: {
  slug: string;
  title: string;
  productId: string;
  sortOrder?: number;
}) => client.models.Category.create(input, { authMode: 'userPool' });

export const updateCategory = (input: { id: string } & Partial<{
  slug: string;
  title: string;
  sortOrder: number;
}>) => client.models.Category.update(input, { authMode: 'userPool' });

export const deleteCategory = (id: string) => client.models.Category.delete({ id }, { authMode: 'userPool' });

export const createArticle = (input: {
  slug: string;
  title: string;
  subheading?: string;
  contentHtml?: string;
  readTime?: string;
  status: 'DRAFT' | 'PUBLISHED';
  categoryId: string;
  isQuickStartGuide?: boolean;
  legacyHelpCenterUrl?: string;
}) => client.models.Article.create(input, { authMode: 'userPool' });

export const updateArticle = (input: { id: string } & Partial<{
  slug: string;
  title: string;
  subheading: string;
  contentHtml: string;
  readTime: string;
  status: 'DRAFT' | 'PUBLISHED';
  categoryId: string;
  isQuickStartGuide: boolean;
  legacyHelpCenterUrl: string;
}>) => client.models.Article.update(input, { authMode: 'userPool' });

export const deleteArticle = (id: string) => client.models.Article.delete({ id }, { authMode: 'userPool' });

export async function listAllArticlesForAdmin() {
  const { data } = await client.models.Article.list();
  return data ?? [];
}

export async function listQuickStartGuides() {
  const { data } = await client.models.Article.list({
    filter: { isQuickStartGuide: { eq: true }, status: { eq: 'PUBLISHED' } },
  });
  return data ?? [];
}

// ---- Support TV ----

export async function listSupportTVCategories() {
  const { data } = await client.models.SupportTVCategory.list();
  return [...(data ?? [])].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export async function getSupportTVCategoryBySlug(slug: string) {
  const { data } = await client.models.SupportTVCategory.list({ filter: { slug: { eq: slug } } });
  return data?.[0] ?? null;
}

export async function listSupportTVItemsForCategory(categoryId: string, publishedOnly = true) {
  const { data } = await client.models.SupportTVItem.list({
    filter: publishedOnly
      ? { categoryId: { eq: categoryId }, status: { eq: 'PUBLISHED' } }
      : { categoryId: { eq: categoryId } },
  });
  return [...(data ?? [])].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export async function getSupportTVItemBySlug(categoryId: string, itemSlug: string) {
  const { data } = await client.models.SupportTVItem.list({
    filter: { categoryId: { eq: categoryId }, slug: { eq: itemSlug } },
  });
  return data?.[0] ?? null;
}

export async function listVideosForItem(itemId: string) {
  const { data } = await client.models.Video.list({ filter: { itemId: { eq: itemId } } });
  return [...(data ?? [])].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export async function listFeaturedSupportTVItems(limit = 4) {
  const { data } = await client.models.SupportTVItem.list({
    filter: { featuredOnHome: { eq: true }, status: { eq: 'PUBLISHED' } },
  });
  return [...(data ?? [])].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)).slice(0, limit);
}

export const createSupportTVCategory = (input: {
  slug: string;
  title: string;
  description?: string;
  sortOrder?: number;
}) => client.models.SupportTVCategory.create(input, { authMode: 'userPool' });
export const deleteSupportTVCategory = (id: string) => client.models.SupportTVCategory.delete({ id }, { authMode: 'userPool' });

export const createSupportTVItem = (input: {
  slug: string;
  title: string;
  description?: string;
  type: 'VIDEO' | 'PLAYLIST';
  thumbnailUrl?: string;
  duration?: string;
  videoUrl?: string;
  featuredOnHome?: boolean;
  status: 'DRAFT' | 'PUBLISHED';
  categoryId: string;
  sortOrder?: number;
}) => client.models.SupportTVItem.create(input, { authMode: 'userPool' });
export const updateSupportTVItem = (input: { id: string } & Partial<{
  slug: string;
  title: string;
  description: string;
  type: 'VIDEO' | 'PLAYLIST';
  thumbnailUrl: string;
  duration: string;
  videoUrl: string;
  featuredOnHome: boolean;
  status: 'DRAFT' | 'PUBLISHED';
  sortOrder: number;
}>) => client.models.SupportTVItem.update(input, { authMode: 'userPool' });
export const deleteSupportTVItem = (id: string) => client.models.SupportTVItem.delete({ id }, { authMode: 'userPool' });

export const createVideo = (input: {
  title: string;
  description?: string;
  duration?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  itemId: string;
  sortOrder?: number;
}) => client.models.Video.create(input, { authMode: 'userPool' });
export const updateVideo = (input: { id: string } & Partial<{
  title: string;
  description: string;
  duration: string;
  thumbnailUrl: string;
  videoUrl: string;
  sortOrder: number;
}>) => client.models.Video.update(input, { authMode: 'userPool' });
export const deleteVideo = (id: string) => client.models.Video.delete({ id }, { authMode: 'userPool' });

// ---- Training Webinars ----

export async function listWebinarSections() {
  const { data } = await client.models.WebinarSection.list();
  return [...(data ?? [])].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export async function listWebinarLinksForSection(sectionId: string) {
  const { data } = await client.models.WebinarLink.list({ filter: { sectionId: { eq: sectionId } } });
  return [...(data ?? [])].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export const createWebinarSection = (input: { slug: string; title: string; sortOrder?: number }) =>
  client.models.WebinarSection.create(input, { authMode: 'userPool' });
export const deleteWebinarSection = (id: string) => client.models.WebinarSection.delete({ id }, { authMode: 'userPool' });

export const createWebinarLink = (input: {
  title: string;
  sortOrder?: number;
  externalUrl?: string;
  linkedArticleId?: string;
  sectionId: string;
}) => client.models.WebinarLink.create(input, { authMode: 'userPool' });
export const updateWebinarLink = (input: { id: string } & Partial<{
  title: string;
  sortOrder: number;
  externalUrl: string;
  linkedArticleId: string;
}>) => client.models.WebinarLink.update(input, { authMode: 'userPool' });
export const deleteWebinarLink = (id: string) => client.models.WebinarLink.delete({ id }, { authMode: 'userPool' });
