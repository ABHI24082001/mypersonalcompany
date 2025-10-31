/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://absolutation.vercel.app',
  generateRobotsTxt: true,
  priority: 0.7,
  changefreq: 'daily',
  exclude: ['/404'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://absolutation.vercel.app/sitemap.xml',
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}