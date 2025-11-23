import type { CompanyInfo } from '../contentful/api';
import { SEO_CONFIG } from './metadata';
import {
  generateLocalBusinessSchema,
  generateWebSiteSchema,
  generateBreadcrumbSchema,
  generateOrganizationSchema,
  generateServiceSchema,
} from './structured-data';

/**
 * Helper utilities for generating structured data across pages
 * Reduces code duplication and centralizes schema generation logic
 */

type StructuredDataSchema = Record<string, unknown>;

interface StructuredDataHelpers {
  forHomePage: (companyInfo: CompanyInfo | null) => StructuredDataSchema[];
  forServicesPage: (
    companyInfo: CompanyInfo | null,
    services: Array<{ fields: { title: string; description: string } }>
  ) => StructuredDataSchema[];
  forAboutPage: (companyInfo: CompanyInfo | null) => StructuredDataSchema[];
  forContactsPage: (companyInfo: CompanyInfo | null) => StructuredDataSchema[];
}

/**
 * Centralized structured data generators for all pages
 */
export const structuredDataHelpers: StructuredDataHelpers = {
  /**
   * Homepage structured data
   */
  forHomePage: (companyInfo) => {
    if (!companyInfo) return [];

    return [
      generateLocalBusinessSchema(companyInfo, SEO_CONFIG.SITE_URL),
      generateWebSiteSchema(SEO_CONFIG.SITE_URL, SEO_CONFIG.SITE_NAME),
      generateBreadcrumbSchema([{ name: 'Главная', url: '/' }], SEO_CONFIG.SITE_URL),
    ];
  },

  /**
   * Services page structured data
   */
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

  /**
   * About page structured data
   */
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

  /**
   * Contacts page structured data
   */
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
};
