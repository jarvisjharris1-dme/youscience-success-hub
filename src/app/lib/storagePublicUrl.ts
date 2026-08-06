import { getUrl } from 'aws-amplify/storage';

/**
 * Resolves an S3 storage path (as returned by uploadData) to a fetchable
 * URL. Used right after an editor uploads an image so it can be inserted
 * into the article body immediately.
 */
export async function storagePublicUrl(path: string): Promise<string> {
  const { url } = await getUrl({ path });
  return url.toString();
}
