import { getContentfulClient } from './client';
import type { Entry } from 'contentful';
import type {
  TypeCompanyInfoSkeleton,
  TypeServiceSkeleton,
  TypeAdvantageSkeleton,
  TypeSeoPageSkeleton,
  TypeBlogPostSkeleton,
  TypeReviewSkeleton,
  TypePersonalInfoSkeleton,
} from './types-generated.ts';

export type CompanyInfo = Entry<TypeCompanyInfoSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>;
export type Service = Entry<TypeServiceSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>;
export type Advantage = Entry<TypeAdvantageSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>;
export type SeoPage = Entry<TypeSeoPageSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>;
export type BlogPost = Entry<TypeBlogPostSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>;
export type Review = Entry<TypeReviewSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>;
export type PersonalInfo = Entry<TypePersonalInfoSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>;

export const getCompanyInfo = async (): Promise<CompanyInfo | null> => {
  try {
    const client = getContentfulClient();

    const response = await client.getEntries<TypeCompanyInfoSkeleton>({
      content_type: 'companyInfo',
      limit: 1,
      include: 2,
    });

    if (!response.items.length) {
      return null;
    }

    return response.items[0] as CompanyInfo;
  } catch (error) {
    console.error('Error fetching company info:', error);
    return null;
  }
};

export const getServices = async (): Promise<Service[]> => {
  try {
    const client = getContentfulClient();

    const response = await client.getEntries<TypeServiceSkeleton>({
      content_type: 'service',
      order: ['sys.createdAt'],
      include: 2,
    });

    return response.items as Service[];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
};

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const client = getContentfulClient();

    const response = await client.getEntries<TypeServiceSkeleton>({
      content_type: 'service',
      include: 2,
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

export const getSeoData = async (slug: string): Promise<SeoPage | null> => {
  try {
    const client = getContentfulClient();

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

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const client = getContentfulClient();

    const response = await client.getEntries<TypeBlogPostSkeleton>({
      content_type: 'blogPost',
      order: ['-fields.publishedAt'],
      include: 2,
    });

    return response.items as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const client = getContentfulClient();

    const response = await client.getEntries<TypeBlogPostSkeleton>({
      content_type: 'blogPost',
      include: 2,
    });

    const entry = response.items.find((item) => item.fields.slug === slug);

    if (!entry) {
      return null;
    }

    return entry as BlogPost;
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return null;
  }
}

export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    const client = getContentfulClient();

    const response = await client.getEntries<TypeBlogPostSkeleton>({
      content_type: 'blogPost',
      select: ['fields.slug'],
    });

    return response.items.map((entry) => entry.fields.slug);
  } catch (error) {
    console.error('Error fetching blog slugs:', error);
    return [];
  }
}

export const getReviews = async (): Promise<Review[]> => {
  try {
    const client = getContentfulClient();

    const response = await client.getEntries<TypeReviewSkeleton>({
      content_type: 'review',
      order: ['-fields.publishedAt'],
    });

    const activeReviews = response.items.filter((item) => item.fields.isActive === true);

    return activeReviews as Review[];
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};

export const getPersonalInfo = async (): Promise<PersonalInfo | null> => {
  try {
    const client = getContentfulClient();

    const response = await client.getEntries<TypePersonalInfoSkeleton>({
      content_type: 'personalInfo',
      limit: 1,
      include: 2,
    });

    if (!response.items.length) {
      return null;
    }

    return response.items[0] as PersonalInfo;
  } catch (error) {
    console.error('Error fetching personal info:', error);
    return null;
  }
};
