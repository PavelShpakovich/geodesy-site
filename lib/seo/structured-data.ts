import type { CompanyInfo } from '../contentful/api';

/**
 * Generate LocalBusiness JSON-LD structured data for Google
 * This helps with local SEO and rich snippets in search results
 */
export function generateLocalBusinessSchema(companyInfo: CompanyInfo, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${siteUrl}/#organization`,
    name: companyInfo.fields.name,
    legalName: companyInfo.fields.legalName || companyInfo.fields.name,
    description:
      'Профессиональные геодезические услуги в Бресте и Брестской области: топографическая съёмка, топосъёмка для ландшафтного дизайна, топосъёмка для подключения инженерных сетей. Квалифицированный инженер-геодезист с современным GNSS-оборудованием.',
    alternateName: ['Геодезия Брест', 'Геодезист Брест', 'Пузин геодезия', 'Топосъёмка Брест'],
    url: siteUrl,
    telephone: companyInfo.fields.phone,
    email: companyInfo.fields.email,
    image: `${siteUrl}/og-image.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyInfo.fields.address,
      addressLocality: 'Брест',
      addressRegion: 'Брестская область',
      postalCode: '224000',
      addressCountry: {
        '@type': 'Country',
        name: 'Беларусь',
        '@id': 'https://www.wikidata.org/wiki/Q184',
      },
    },
    openingHours: companyInfo.fields.workHours || 'Mo-Fr 09:00-19:00, Sa-Su 08:00-18:00',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.0975,
      longitude: 23.734,
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
      {
        '@type': 'AdministrativeArea',
        name: 'Брестский район',
      },
    ],
    keywords:
      'геодезия брест, геодезист брест, топосъемка брест, топографическая съемка брест, топосъемка для ландшафтного дизайна, топосъемка для инженерных сетей, инженер-геодезист брест',
    slogan: 'Профессиональная геодезия в Бресте',
    knowsAbout: [
      'Геодезия',
      'Топографическая съёмка',
      'Топосъёмка для ландшафтного дизайна',
      'Топосъёмка для подключения инженерных сетей',
      'GNSS-приёмники',
      'Геодезические измерения',
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
            name: 'Топографическая съёмка',
            description:
              'Высокоточная топографическая съёмка земельных участков с применением современного геодезического оборудования. Результаты в форматах DWG, PDF.',
            serviceType: 'Геодезические работы',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Топографическая съёмка для ландшафтного дизайна',
            description:
              'Выполняю детальную топографическую съёмку участка для последующего ландшафтного проектирования. Готовлю точный топоплан, по заданию дизайнера, который позволяет грамотно спроектировать благоустройство и избежать ошибок при реализации проекта.',
            serviceType: 'Геодезические работы',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Топографическая съёмка для подключения инженерных сетей',
            description:
              'Провожу комплексное обследование участка, чтобы обеспечить корректное проектирование и дальнейшее подключение инженерных сетей. Точно определяю положение коммуникаций, особенности рельефа и любые объекты, способные влиять на технические решения. На основе полученных данных формирую актуальный топографический план, который принимают профильные организации для согласования и разработки проектной документации.',
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
    name: serviceName,
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
