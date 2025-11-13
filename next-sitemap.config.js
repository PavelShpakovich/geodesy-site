/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://mygeodesy.by',
  generateRobotsTxt: true,
  generateIndexSitemap: false, // Small site, don't need sitemap index
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,

  // Exclude admin/api routes
  exclude: ['/api/*', '/admin/*', '/_next/*'],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api', '/admin'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Yandexbot',
        allow: '/',
      },
    ],
    additionalSitemaps: [],
  },

  // Transform function to customize sitemap entries
  transform: async (config, path) => {
    // Set higher priority for important pages
    const priorities = {
      '/': 1.0,
      '/services': 0.9,
      '/contacts': 0.9,
      '/about': 0.8,
    };

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] || config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
