import { createClient, ContentfulClientApi, CreateClientParams } from 'contentful';

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

let clientInstance: ContentfulClientApi<undefined> | null = null;

export function getContentfulClient(): ContentfulClientApi<undefined> {
  if (!clientInstance) {
    clientInstance = createClient(getContentfulConfig());
  }
  return clientInstance;
}

export const contentfulClient = new Proxy({} as ContentfulClientApi<undefined>, {
  get: (target, prop) => {
    const client = getContentfulClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (client as any)[prop];
  },
});

export const formatContentfulUrl = (url: string | undefined | null): string => {
  if (!url) return '';
  return url.startsWith('//') ? `https:${url}` : url;
};

export const getAssetUrl = (asset: { fields?: { file?: { url?: string } } } | undefined | null): string => {
  return formatContentfulUrl(asset?.fields?.file?.url);
};

export const getAssetUrls = (assets: { fields?: { file?: { url?: string } } }[]): string[] => {
  return assets?.map(getAssetUrl).filter(Boolean) || [];
};
