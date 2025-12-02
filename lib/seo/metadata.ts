import type { Metadata } from 'next';
import type { SeoPage } from '../contentful/api';
import { getAssetUrl } from '../contentful/client';

export const SEO_CONFIG = {
  SITE_NAME: 'ИП Пузин И.А.',
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://mygeodesy.by',
  DEFAULT_TITLE: 'Геодезические услуги в Бресте | ИП Пузин И.А.',
  DEFAULT_DESCRIPTION:
    'Профессиональные геодезические услуги в Бресте и Брестской области. Топографическая съемка, топосъемка для ландшафтного дизайна, топосъемка для подключения инженерных сетей. Современное GNSS-оборудование. Опыт работы более 10 лет.',
  DEFAULT_KEYWORDS: [
    'геодезия брест',
    'геодезия в бресте',
    'геодезист брест',
    'геодезист в бресте',
    'топосъемка брест',
    'топосъемка в бресте',

    'геодезические услуги брест',
    'геодезические работы брест',
    'геодезия брестская область',
    'геодезист брестская область',

    'топографическая съемка брест',
    'топографическая съемка в бресте',
    'вынос границ участка брест',
    'вынос в натуру брест',
    'межевание участка брест',
    'межевание земельного участка брест',
    'исполнительная съемка брест',
    'кадастровые работы брест',
    'землеустроительные работы брест',

    'геодезия цена брест',
    'геодезист недорого брест',
    'заказать геодезиста брест',
    'вызвать геодезиста брест',
    'геодезия под ключ брест',

    'ИП Пузин',
    'Пузин геодезия',
    'геодезия пузин брест',
  ],
  TWITTER_HANDLE: '@geodesy',
  LOCALE: 'ru_BY',
  TYPE: 'website' as const,
} as const;

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

    applicationName: SEO_CONFIG.SITE_NAME,
    authors: [{ name: SEO_CONFIG.SITE_NAME }],
    generator: 'Next.js',
    referrer: 'origin-when-cross-origin',

    other: {
      'geo.region': 'BY-BR',
      'geo.placename': 'Брест',
      'geo.position': '52.134722;23.656944',
      ICBM: '52.134722, 23.656944',
      'DC.title': title,
      'DC.subject': 'Геодезия, Геодезические услуги, Топосъемка',
      'DC.description': description,
      rating: 'general',
      distribution: 'global',
      'revisit-after': '7 days',
      language: 'Russian',
      target: 'Брест, Брестская область, Беларусь',
    },

    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    },

    alternates: {
      canonical: url,
      languages: {
        'ru-BY': url,
        ru: url,
        'be-BY': url,
      },
    },

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

    twitter: {
      card: 'summary_large_image',
      site: SEO_CONFIG.TWITTER_HANDLE,
      creator: SEO_CONFIG.TWITTER_HANDLE,
      title,
      description,
      images,
    },

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

    category: 'business',
  };
}

export function generateHomeMetadata(seoData: SeoPage | null): Metadata {
  return generatePageMetadata(seoData, {
    path: '/',
    type: 'website',
  });
}

export function generateServicesMetadata(seoData: SeoPage | null): Metadata {
  return generatePageMetadata(seoData, {
    path: '/services',
    type: 'website',
  });
}

export function generateAboutMetadata(seoData: SeoPage | null): Metadata {
  return generatePageMetadata(seoData, {
    path: '/about',
    type: 'website',
  });
}

export function generateContactsMetadata(seoData: SeoPage | null): Metadata {
  return generatePageMetadata(seoData, {
    path: '/contacts',
    type: 'website',
  });
}

export function generateBlogMetadata(seoData: SeoPage | null): Metadata {
  const defaultTitle = 'Блог | Полезные статьи о геодезии';
  const defaultDescription =
    'Полезные статьи о геодезии и землеустройстве. Советы по топографической съёмке, межеванию участков, подготовке к геодезическим работам.';

  return generatePageMetadata(
    seoData ||
      ({
        fields: {
          title: defaultTitle,
          description: defaultDescription,
        },
      } as SeoPage),
    {
      path: '/blog',
      type: 'website',
    }
  );
}

export function generateBlogPostMetadata(
  post: {
    title: string;
    excerpt: string;
    metaDescription?: string;
    coverImage?: { fields?: { file?: { url?: string } } };
    slug: string;
    publishedAt: string;
    author?: string;
  },
  seoData: SeoPage | null
): Metadata {
  const title = seoData?.fields.title || post.title;
  const description = seoData?.fields.description || post.metaDescription || post.excerpt;
  const url = `${SEO_CONFIG.SITE_URL}/blog/${post.slug}`;
  const imageUrl = getAssetUrl(post.coverImage) || `${SEO_CONFIG.SITE_URL}/og-image.jpg`;

  return {
    title,
    description,
    keywords: SEO_CONFIG.DEFAULT_KEYWORDS.join(', '),
    authors: [{ name: post.author || SEO_CONFIG.SITE_NAME }],

    alternates: {
      canonical: url,
    },

    openGraph: {
      type: 'article',
      url,
      title,
      description,
      siteName: SEO_CONFIG.SITE_NAME,
      locale: SEO_CONFIG.LOCALE,
      publishedTime: post.publishedAt,
      authors: [post.author || SEO_CONFIG.SITE_NAME],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      site: SEO_CONFIG.TWITTER_HANDLE,
      title,
      description,
      images: [imageUrl],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
