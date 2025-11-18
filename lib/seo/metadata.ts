import type { Metadata } from 'next';
import type { SeoPage } from '../contentful/api';

/**
 * SEO Configuration
 */
export const SEO_CONFIG = {
  SITE_NAME: 'ИП Пузин И.А.',
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://mygeodesy.by',
  DEFAULT_TITLE: 'Геодезические услуги в Бресте | ИП Пузин И.А.',
  DEFAULT_DESCRIPTION:
    'Профессиональные геодезические работы в Бресте и Брестской области: топографическая съемка, вынос границ участка, исполнительная съемка. Индивидуальный подход, современное оборудование.',
  DEFAULT_KEYWORDS: [
    'геодезия Брест',
    'геодезист Брест',
    'топосъемка Брест',
    'топографическая съемка',
    'вынос границ участка',
    'исполнительная съемка',
    'геодезические работы Брест',
    'кадастровые работы',
    'межевание участка',
    'геодезия Брестская область',
    'ИП Пузин',
  ],
  TWITTER_HANDLE: '@geodesy', // Replace with real handle if exists
  LOCALE: 'ru_BY',
  TYPE: 'website' as const,
} as const;

/**
 * Generate complete metadata for a page
 * Integrates with Contentful SEO data
 */
export function generatePageMetadata(
  seoData: SeoPage | null,
  options?: {
    path?: string;
    type?: 'website' | 'article';
    images?: string[];
  }
): Metadata {
  const title = seoData?.fields.title || SEO_CONFIG.DEFAULT_TITLE;
  const description = seoData?.fields.description || SEO_CONFIG.DEFAULT_DESCRIPTION;
  const url = `${SEO_CONFIG.SITE_URL}${options?.path || ''}`;
  const images = options?.images || [`${SEO_CONFIG.SITE_URL}/og-image.jpg`];

  return {
    title,
    description,
    keywords: SEO_CONFIG.DEFAULT_KEYWORDS.join(', '),

    // Basic metadata
    applicationName: SEO_CONFIG.SITE_NAME,
    authors: [{ name: SEO_CONFIG.SITE_NAME }],
    generator: 'Next.js',
    referrer: 'origin-when-cross-origin',

    // Geographic targeting for local SEO
    other: {
      'geo.region': 'BY-BR',
      'geo.placename': 'Брест',
      'geo.position': '52.134722;23.656944',
    },

    // Verification (add real codes in production)
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    },

    // Alternate languages
    alternates: {
      canonical: url,
      languages: {
        'ru-BY': url,
        ru: url,
        'be-BY': url,
      },
    },

    // OpenGraph metadata for social sharing
    openGraph: {
      type: options?.type || SEO_CONFIG.TYPE,
      url,
      title,
      description,
      siteName: SEO_CONFIG.SITE_NAME,
      locale: SEO_CONFIG.LOCALE,
      alternateLocale: ['ru_RU', 'be_BY'],
      images: images.map((image) => ({
        url: image,
        width: 1200,
        height: 630,
        alt: title,
      })),
    },

    // Twitter Card metadata
    twitter: {
      card: 'summary_large_image',
      site: SEO_CONFIG.TWITTER_HANDLE,
      creator: SEO_CONFIG.TWITTER_HANDLE,
      title,
      description,
      images,
    },

    // Robots directives - ENABLED FOR PRODUCTION
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Additional metadata
    category: 'business',
  };
}

/**
 * Generate metadata for homepage
 */
export function generateHomeMetadata(seoData: SeoPage | null): Metadata {
  return generatePageMetadata(seoData, {
    path: '/',
    type: 'website',
  });
}

/**
 * Generate metadata for services page
 */
export function generateServicesMetadata(seoData: SeoPage | null): Metadata {
  return generatePageMetadata(seoData, {
    path: '/services',
    type: 'website',
  });
}

/**
 * Generate metadata for about page
 */
export function generateAboutMetadata(seoData: SeoPage | null): Metadata {
  return generatePageMetadata(seoData, {
    path: '/about',
    type: 'website',
  });
}

/**
 * Generate metadata for contacts page
 */
export function generateContactsMetadata(seoData: SeoPage | null): Metadata {
  return generatePageMetadata(seoData, {
    path: '/contacts',
    type: 'website',
  });
}
