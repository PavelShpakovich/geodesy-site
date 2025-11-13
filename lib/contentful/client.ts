import { createClient, ContentfulClientApi, CreateClientParams } from 'contentful';

/**
 * Get Contentful configuration
 */
const getContentfulConfig = (): CreateClientParams => {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  const previewToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
  const isPreview = process.env.CONTENTFUL_PREVIEW_MODE === 'true';

  if (!spaceId || !accessToken) {
    throw new Error(
      'Missing required Contentful environment variables. ' +
        'Please ensure CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN are set in .env.local'
    );
  }

  return {
    space: spaceId,
    accessToken: isPreview && previewToken ? previewToken : accessToken,
    host: isPreview ? 'preview.contentful.com' : 'cdn.contentful.com',
  };
};

/**
 * Lazy-initialized Contentful client
 * Only initializes when actually used (server-side)
 */
let clientInstance: ContentfulClientApi<undefined> | null = null;

export function getContentfulClient(preview?: boolean): ContentfulClientApi<undefined> {
  // If preview is explicitly specified, create a new client
  if (preview !== undefined) {
    if (preview) {
      return createClient({
        space: process.env.CONTENTFUL_SPACE_ID!,
        accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
        host: 'preview.contentful.com',
      });
    }

    return createClient({
      space: process.env.CONTENTFUL_SPACE_ID!,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
      host: 'cdn.contentful.com',
    });
  }

  // Return cached instance
  if (!clientInstance) {
    clientInstance = createClient(getContentfulConfig());
  }
  return clientInstance;
}

/**
 * Default Contentful client (lazy-initialized)
 * Uses Proxy to defer initialization until first access
 */
export const contentfulClient = new Proxy({} as ContentfulClientApi<undefined>, {
  get: (target, prop) => {
    const client = getContentfulClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (client as any)[prop];
  },
});

/**
 * Check if preview mode is enabled
 */
export const isPreviewMode = (): boolean => {
  return process.env.CONTENTFUL_PREVIEW_MODE === 'true';
};

/**
 * Helper to extract asset URL from Contentful asset
 */
export const getAssetUrl = (asset: { fields?: { file?: { url?: string } } }): string => {
  return asset?.fields?.file?.url ? `https:${asset.fields.file.url}` : '';
};

/**
 * Helper to extract multiple asset URLs from Contentful assets array
 */
export const getAssetUrls = (assets: { fields?: { file?: { url?: string } } }[]): string[] => {
  return assets?.map(getAssetUrl).filter(Boolean) || [];
};
