import type { CompanyInfo } from '../contentful/api';

/**
 * Generate LocalBusiness JSON-LD structured data for Google
 * This helps with local SEO and rich snippets in search results
 */
export function generateLocalBusinessSchema(companyInfo: CompanyInfo, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#organization`,
    name: companyInfo.fields.name,
    description: companyInfo.fields.description,
    url: siteUrl,
    telephone: companyInfo.fields.phone,
    email: companyInfo.fields.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyInfo.fields.address,
      addressLocality: 'Брест',
      addressRegion: 'Брестская область',
      addressCountry: 'BY',
    },
    openingHours: companyInfo.fields.workHours,
    priceRange: '$$',
    geo: {
      '@type': 'GeoCoordinates',
      // These should be replaced with real coordinates from Contentful or env
      latitude: 52.0975, // Брест latitude
      longitude: 23.734, // Брест longitude
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Брест',
        '@id': 'https://www.wikidata.org/wiki/Q2074',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Брестская область',
      },
    ],
    // Service types for better categorization
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Геодезические услуги',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Топографическая съемка',
            serviceType: 'Геодезические работы',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Вынос границ участка',
            serviceType: 'Геодезические работы',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Исполнительная съемка',
            serviceType: 'Геодезические работы',
          },
        },
      ],
    },
    // Social media links (if available)
    ...(companyInfo.fields.telegram && {
      sameAs: [
        `https://t.me/${companyInfo.fields.telegram}`,
        ...(companyInfo.fields.whatsapp ? [`https://wa.me/${companyInfo.fields.whatsapp}`] : []),
      ],
    }),
  };
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(companyInfo: CompanyInfo, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: companyInfo.fields.name,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`, // Add logo to public folder
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: companyInfo.fields.phone,
      contactType: 'customer service',
      email: companyInfo.fields.email,
      availableLanguage: ['Russian', 'Belarusian'],
      areaServed: 'BY',
    },
  };
}

/**
 * Generate WebSite schema for site-wide search
 */
export function generateWebSiteSchema(siteUrl: string, siteName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: siteName,
    description: 'Профессиональные геодезические услуги в Бресте и Брестской области',
    inLanguage: 'ru',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/services?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate BreadcrumbList schema for navigation
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}

/**
 * Generate Service schema for individual services
 */
export function generateServiceSchema(
  serviceName: string,
  serviceDescription: string,
  companyInfo: CompanyInfo,
  siteUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    description: serviceDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: companyInfo.fields.name,
      telephone: companyInfo.fields.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: companyInfo.fields.address,
        addressLocality: 'Брест',
        addressRegion: 'Брестская область',
        addressCountry: 'BY',
      },
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Брест',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Брестская область',
      },
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: siteUrl,
      servicePhone: {
        '@type': 'ContactPoint',
        telephone: companyInfo.fields.phone,
        contactType: 'customer service',
      },
    },
  };
}
