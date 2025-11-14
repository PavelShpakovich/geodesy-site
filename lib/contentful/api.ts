import { unstable_cache } from 'next/cache';
import { getContentfulClient } from './client';
import type { EntrySkeletonType, Entry, EntryFieldTypes } from 'contentful';

/**
 * Type Strategy (Official Contentful v10+ Pattern):
 * - Define Entry Skeletons using contentful.EntryFieldTypes
 * - This is the official approach from Contentful TypeScript documentation
 * - Auto-generated types from cf-content-types-generator are outdated for SDK v11
 * - We only use the I*Fields interfaces from generated types as a reference
 */

// Company Info Skeleton (Single Type)
interface CompanyInfoSkeleton extends EntrySkeletonType {
  contentTypeId: 'companyInfo';
  fields: {
    name: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    address: EntryFieldTypes.Text;
    phone: EntryFieldTypes.Text;
    email: EntryFieldTypes.Text;
    workHours: EntryFieldTypes.Text;
    telegram?: EntryFieldTypes.Text;
    viber?: EntryFieldTypes.Text;
    whatsapp?: EntryFieldTypes.Text;
    instagram?: EntryFieldTypes.Text;
    latitude?: EntryFieldTypes.Number;
    longitude?: EntryFieldTypes.Number;
  };
}

// Service Skeleton
interface ServiceSkeleton extends EntrySkeletonType {
  contentTypeId: 'service';
  fields: {
    title: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    price: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    image?: EntryFieldTypes.AssetLink;
  };
}

// Advantage Skeleton
interface AdvantageSkeleton extends EntrySkeletonType {
  contentTypeId: 'advantage';
  fields: {
    title: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
  };
}

// SEO Page Skeleton
interface SeoPageSkeleton extends EntrySkeletonType {
  contentTypeId: 'seoPage';
  fields: {
    slug: EntryFieldTypes.Text;
    title: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    keywords?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  };
}

// Export Entry types for components (using Contentful's Entry type)
export type CompanyInfo = Entry<CompanyInfoSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>;
export type Service = Entry<ServiceSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>;
export type Advantage = Entry<AdvantageSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>;
export type SeoPage = Entry<SeoPageSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>;

/**
 * Fetch company information (Single Type)
 * Uses Next.js cache with 1 week revalidation
 */
const getCompanyInfoUncached = async (): Promise<CompanyInfo | null> => {
  try {
    const client = getContentfulClient();

    const response = await client.getEntries<CompanyInfoSkeleton>({
      content_type: 'companyInfo',
      limit: 1,
    });

    if (!response.items.length) {
      return null;
    }

    return response.items[0];
  } catch (error) {
    console.error('Error fetching company info:', error);
    return null;
  }
};

export const getCompanyInfo = async (): Promise<CompanyInfo | null> => {
  return unstable_cache(async () => getCompanyInfoUncached(), ['company-info'], {
    revalidate: 604800,
    tags: ['contentful', 'company-info'],
  })();
};

/**
 * Fetch all services
 * Uses Next.js cache with 1 week revalidation
 */
const getServicesUncached = async (): Promise<Service[]> => {
  try {
    const client = getContentfulClient();

    const response = await client.getEntries<ServiceSkeleton>({
      content_type: 'service',
      order: ['sys.createdAt'],
      include: 2, // Include linked assets
    });

    return response.items as Service[];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
};

export const getServices = async (): Promise<Service[]> => {
  return unstable_cache(async () => getServicesUncached(), ['services'], {
    revalidate: 604800,
    tags: ['contentful', 'services'],
  })();
};

/**
 * Fetch a single service by slug
 * @param slug - Service slug
 */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const client = getContentfulClient();

    // Fetch all services and filter by slug (Contentful's typed API limitation)
    const response = await client.getEntries<ServiceSkeleton>({
      content_type: 'service',
      include: 2, // Include linked assets
    });

    const entry = response.items.find((item) => item.fields.slug === slug);

    if (!entry) {
      return null;
    }

    return entry as Service;
  } catch (error) {
    console.error(`Error fetching service with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch all advantages
 * Uses Next.js cache with 1 week revalidation
 */
const getAdvantagesUncached = async (): Promise<Advantage[]> => {
  try {
    const client = getContentfulClient();

    const response = await client.getEntries<AdvantageSkeleton>({
      content_type: 'advantage',
      order: ['sys.createdAt'],
    });

    return response.items;
  } catch (error) {
    console.error('Error fetching advantages:', error);
    return [];
  }
};

export const getAdvantages = async (): Promise<Advantage[]> => {
  return unstable_cache(async () => getAdvantagesUncached(), ['advantages'], {
    revalidate: 604800,
    tags: ['contentful', 'advantages'],
  })();
};

/**
 * Fetch SEO data for a specific page
 * Uses Next.js cache with 1 week revalidation
 * @param slug - Page slug
 */
const getSeoDataUncached = async (slug: string): Promise<SeoPage | null> => {
  try {
    const client = getContentfulClient();

    // Fetch all SEO pages and filter by slug
    const response = await client.getEntries<SeoPageSkeleton>({
      content_type: 'seoPage',
    });

    const entry = response.items.find((item) => item.fields.slug === slug);

    if (!entry) {
      return null;
    }

    return entry;
  } catch (error) {
    console.error(`Error fetching SEO data for slug ${slug}:`, error);
    return null;
  }
};

export const getSeoData = async (slug: string): Promise<SeoPage | null> => {
  return unstable_cache(async () => getSeoDataUncached(slug), ['seo-data', slug], {
    revalidate: 604800,
    tags: ['contentful', 'seo', `seo-${slug}`],
  })();
};

/**
 * Get all service slugs (for static generation)
 */
export async function getAllServiceSlugs(): Promise<string[]> {
  try {
    const client = getContentfulClient();

    const response = await client.getEntries<ServiceSkeleton>({
      content_type: 'service',
      select: ['fields.slug'],
    });

    return response.items.map((entry) => entry.fields.slug);
  } catch (error) {
    console.error('Error fetching service slugs:', error);
    return [];
  }
}
