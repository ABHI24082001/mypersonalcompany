/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://absolutation.space/",
  generateRobotsTxt: true,
  priority: 0.7,
  changefreq: "daily",
  exclude: ["/404"],
  robotsTxtOptions: {
    additionalSitemaps: ["https://absolutation.space/sitemap.xml"],
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};