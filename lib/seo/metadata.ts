import type { Metadata } from 'next';
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

export const PAGE_SEO = {
  home: {
    title: 'Геодезические услуги в Бресте | ИП Пузин И.А.',
    description:
      'Профессиональные геодезические услуги в Бресте и Брестской области. Качественное выполнение работ, индивидуальный подход. Звоните для консультации!',
  },
  services: {
    title: 'Услуги геодезиста в Бресте | ИП Пузин И.А.',
    description: 'Полный спектр топосъемок в Бресте. Профессиональное оборудование, точные результаты.',
  },
  about: {
    title: 'Геодезист в Бресте | ИП Пузин И.А.',
    description:
      'Индивидуальный предприниматель Пузин И.А. предоставляет профессиональные геодезические услуги в Бресте и области. Опыт, качество, современное оборудование.',
  },
  contacts: {
    title: 'Контакты геодезиста в Бресте | ИП Пузин',
    description: 'Заказать геодезические услуги в Бресте: +375 33 360 41 61, i@puzinmail.ru. Работаю Пн-Вс.',
  },
  blog: {
    title: 'Блог о геодезии | Полезные статьи',
    description:
      'Полезные статьи о геодезии и землеустройстве. Советы по топографической съёмке, межеванию участков, подготовке к геодезическим работам.',
  },
  privacy: {
    title: 'Политика конфиденциальности | ИП Пузин И.А.',
    description: 'Политика конфиденциальности и обработки персональных данных сайта mygeodesy.by',
  },
} as const;

interface PageSeoData {
  title: string;
  description: string;
}

function generatePageMetadata(
  seoData: PageSeoData,
  options: {
    path: string;
    type?: 'website' | 'article';
    images?: string[];
  }
): Metadata {
  const { title, description } = seoData;
  const url = `${SEO_CONFIG.SITE_URL}${options.path}`;
  const images = options.images || [`${SEO_CONFIG.SITE_URL}/og-image.jpg`];

  return {
    title,
    description,
    applicationName: SEO_CONFIG.SITE_NAME,
    authors: [{ name: SEO_CONFIG.SITE_NAME }],
    generator: 'Next.js',
    referrer: 'origin-when-cross-origin',
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
      type: options.type || SEO_CONFIG.TYPE,
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

export function generateHomeMetadata(): Metadata {
  return generatePageMetadata(PAGE_SEO.home, { path: '/' });
}

export function generateServicesMetadata(): Metadata {
  return generatePageMetadata(PAGE_SEO.services, { path: '/services' });
}

export function generateAboutMetadata(): Metadata {
  return generatePageMetadata(PAGE_SEO.about, { path: '/about' });
}

export function generateContactsMetadata(): Metadata {
  return generatePageMetadata(PAGE_SEO.contacts, { path: '/contacts' });
}

export function generateBlogMetadata(): Metadata {
  return generatePageMetadata(PAGE_SEO.blog, { path: '/blog' });
}

export function generatePrivacyMetadata(): Metadata {
  return generatePageMetadata(PAGE_SEO.privacy, { path: '/privacy' });
}

export function generateBlogPostMetadata(post: {
  title: string;
  excerpt: string;
  metaDescription?: string;
  coverImage?: { fields?: { file?: { url?: string } } };
  slug: string;
  publishedAt: string;
  author?: string;
}): Metadata {
  const title = post.title;
  const description = post.metaDescription || post.excerpt;
  const url = `${SEO_CONFIG.SITE_URL}/blog/${post.slug}`;
  const imageUrl = getAssetUrl(post.coverImage) || `${SEO_CONFIG.SITE_URL}/og-image.jpg`;

  return {
    title,
    description,
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

export function generateServicePageMetadata(service: {
  title: string;
  description: string;
  metaDescription?: string;
  slug: string;
  image?: { fields?: { file?: { url?: string } } };
}): Metadata {
  const title = `${service.title} | Геодезия Брест`;
  const description = service.metaDescription || service.description.slice(0, 160);
  const url = `${SEO_CONFIG.SITE_URL}/services/${service.slug}`;
  const imageUrl = getAssetUrl(service.image) || `${SEO_CONFIG.SITE_URL}/og-image.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: SEO_CONFIG.SITE_NAME,
      locale: SEO_CONFIG.LOCALE,
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
