import { getContentfulClient } from './client';
import type { Entry } from 'contentful';
import type {
  TypeCompanyInfoSkeleton,
  TypeServiceSkeleton,
  TypeAdvantageSkeleton,
  TypeSeoPageSkeleton,
} from './types-generated.ts';

/**
 * Caching Strategy:
 * - No data cache (unstable_cache) - relies on Next.js ISR at page level
 * - Pages set `revalidate` export to control static regeneration
 * - Simpler, more predictable caching with automatic cache purge on redeploy
 */

// Export Entry types for components
export type CompanyInfo = Entry<TypeCompanyInfoSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>;
export type Service = Entry<TypeServiceSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>;
export type Advantage = Entry<TypeAdvantageSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>;
export type SeoPage = Entry<TypeSeoPageSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>;

/**
 * Fetch company information (Single Type)
 */
export const getCompanyInfo = async (): Promise<CompanyInfo | null> => {
  try {
    const client = getContentfulClient();

    const response = await client.getEntries<TypeCompanyInfoSkeleton>({
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

/**
 * Fetch all services
 */
export const getServices = async (): Promise<Service[]> => {
  try {
    const client = getContentfulClient();

    const response = await client.getEntries<TypeServiceSkeleton>({
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

/**
 * Fetch a single service by slug
 * @param slug - Service slug
 */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const client = getContentfulClient();

    // Fetch all services and filter by slug (Contentful's typed API limitation)
    const response = await client.getEntries<TypeServiceSkeleton>({
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
 */
export const getAdvantages = async (): Promise<Advantage[]> => {
  try {
    const client = getContentfulClient();

    const response = await client.getEntries<TypeAdvantageSkeleton>({
      content_type: 'advantage',
      order: ['sys.createdAt'],
    });

    return response.items;
  } catch (error) {
    console.error('Error fetching advantages:', error);
    return [];
  }
};

/**
 * Fetch SEO data for a specific page
 * @param slug - Page slug
 */
export const getSeoData = async (slug: string): Promise<SeoPage | null> => {
  try {
    const client = getContentfulClient();

    // Fetch all SEO pages and filter by slug
    const response = await client.getEntries<TypeSeoPageSkeleton>({
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

/**
 * Get all service slugs (for static generation)
 */
export async function getAllServiceSlugs(): Promise<string[]> {
  try {
    const client = getContentfulClient();

    const response = await client.getEntries<TypeServiceSkeleton>({
      content_type: 'service',
      select: ['fields.slug'],
    });

    return response.items.map((entry) => entry.fields.slug);
  } catch (error) {
    console.error('Error fetching service slugs:', error);
    return [];
  }
}
