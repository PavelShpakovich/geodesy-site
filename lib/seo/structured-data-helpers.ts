import type { CompanyInfo, BlogPost } from '../contentful/api';
import { getAssetUrl } from '../contentful/client';
import { SEO_CONFIG } from './metadata';
import {
  generateLocalBusinessSchema,
  generateWebSiteSchema,
  generateBreadcrumbSchema,
  generateOrganizationSchema,
  generateServiceSchema,
} from './structured-data';

type StructuredDataSchema = Record<string, unknown>;

interface StructuredDataHelpers {
  forHomePage: (companyInfo: CompanyInfo | null) => StructuredDataSchema[];
  forServicesPage: (
    companyInfo: CompanyInfo | null,
    services: Array<{ fields: { title: string; description: string } }>
  ) => StructuredDataSchema[];
  forAboutPage: (companyInfo: CompanyInfo | null) => StructuredDataSchema[];
  forContactsPage: (companyInfo: CompanyInfo | null) => StructuredDataSchema[];
  forBlogPage: (posts: BlogPost[]) => StructuredDataSchema[];
  forBlogPost: (post: BlogPost, companyInfo: CompanyInfo | null) => StructuredDataSchema[];
}

export const structuredDataHelpers: StructuredDataHelpers = {
  forHomePage: (companyInfo) => {
    if (!companyInfo) return [];

    return [
      generateLocalBusinessSchema(companyInfo, SEO_CONFIG.SITE_URL),
      generateWebSiteSchema(SEO_CONFIG.SITE_URL, SEO_CONFIG.SITE_NAME),
      generateBreadcrumbSchema([{ name: 'Главная', url: '/' }], SEO_CONFIG.SITE_URL),
    ];
  },

  forServicesPage: (companyInfo, services) => {
    const breadcrumbs = generateBreadcrumbSchema(
      [
        { name: 'Главная', url: '/' },
        { name: 'Услуги', url: '/services' },
      ],
      SEO_CONFIG.SITE_URL
    );

    if (!companyInfo) return [breadcrumbs];

    const serviceSchemas = services
      .map((service) =>
        generateServiceSchema(service.fields.title, service.fields.description, companyInfo, SEO_CONFIG.SITE_URL)
      )
      .filter(Boolean);

    return [breadcrumbs, ...serviceSchemas];
  },

  forAboutPage: (companyInfo) => {
    const breadcrumbs = generateBreadcrumbSchema(
      [
        { name: 'Главная', url: '/' },
        { name: 'Обо мне', url: '/about' },
      ],
      SEO_CONFIG.SITE_URL
    );

    if (!companyInfo) return [breadcrumbs];

    return [generateOrganizationSchema(companyInfo, SEO_CONFIG.SITE_URL), breadcrumbs];
  },

  forContactsPage: (companyInfo) => {
    const breadcrumbs = generateBreadcrumbSchema(
      [
        { name: 'Главная', url: '/' },
        { name: 'Контакты', url: '/contacts' },
      ],
      SEO_CONFIG.SITE_URL
    );

    if (!companyInfo) return [breadcrumbs];

    return [generateLocalBusinessSchema(companyInfo, SEO_CONFIG.SITE_URL), breadcrumbs];
  },

  forBlogPage: (posts) => {
    const breadcrumbs = generateBreadcrumbSchema(
      [
        { name: 'Главная', url: '/' },
        { name: 'Блог', url: '/blog' },
      ],
      SEO_CONFIG.SITE_URL
    );

    const blogListSchema = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Блог о геодезии',
      description: 'Полезные статьи о геодезии и землеустройстве',
      url: `${SEO_CONFIG.SITE_URL}/blog`,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: posts.map((post, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${SEO_CONFIG.SITE_URL}/blog/${post.fields.slug}`,
          name: post.fields.title,
        })),
      },
    };

    return [breadcrumbs, blogListSchema];
  },

  forBlogPost: (post, companyInfo) => {
    const breadcrumbs = generateBreadcrumbSchema(
      [
        { name: 'Главная', url: '/' },
        { name: 'Блог', url: '/blog' },
        { name: post.fields.title, url: `/blog/${post.fields.slug}` },
      ],
      SEO_CONFIG.SITE_URL
    );

    const imageUrl = getAssetUrl(post.fields.coverImage) || undefined;

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.fields.title,
      description: post.fields.metaDescription || post.fields.excerpt,
      ...(imageUrl && { image: imageUrl }),
      datePublished: post.fields.publishedAt,
      dateModified: post.sys.updatedAt,
      author: {
        '@type': 'Person',
        name: post.fields.author || companyInfo?.fields.name || SEO_CONFIG.SITE_NAME,
      },
      publisher: {
        '@type': 'Organization',
        name: companyInfo?.fields.name || SEO_CONFIG.SITE_NAME,
        ...(companyInfo && {
          logo: {
            '@type': 'ImageObject',
            url: `${SEO_CONFIG.SITE_URL}/logo.png`,
          },
        }),
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SEO_CONFIG.SITE_URL}/blog/${post.fields.slug}`,
      },
      ...(post.fields.readingTime && {
        timeRequired: `PT${post.fields.readingTime}M`,
      }),
    };

    return [breadcrumbs, articleSchema];
  },
};
