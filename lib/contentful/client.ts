import { createClient, ContentfulClientApi, CreateClientParams } from 'contentful';

/**
 * Get Contentful configuration
 */
const getContentfulConfig = (): CreateClientParams => {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

  if (!spaceId || !accessToken) {
    throw new Error(
      'Missing required Contentful environment variables. ' +
        'Please ensure CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN are set in .env.local'
    );
  }

  return {
    space: spaceId,
    accessToken: accessToken,
    host: 'cdn.contentful.com',
  };
};

/**
 * Lazy-initialized Contentful client
 * Only initializes when actually used (server-side)
 */
let clientInstance: ContentfulClientApi<undefined> | null = null;

export function getContentfulClient(): ContentfulClientApi<undefined> {
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
