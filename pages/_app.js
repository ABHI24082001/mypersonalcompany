import "@/styles/globals.css";
import Head from "next/head";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export default function App({ Component, pageProps }) {
  const siteUrl = "https://absolutation.space/";
  const siteName = "AbSolution - My Projects";
  const siteDescription =
    "Abhishek's personal and professional project portfolio built using Next.js and React.";

  return (
    <>
      <Head>
        <title>{siteName}</title>
        <meta name="google-site-verification" content="b0ca910e72435de8" />
        <meta name="description" content={siteDescription} />
        <meta
          name="keywords"
          content="AbSolution, Abhishek projects, Next.js developer, React developer, Full Stack Developer, Tech portfolio, Web Development, JavaScript, TypeScript"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={siteName} />
        <meta
          property="og:description"
          content="Explore my personal and professional development work."
        />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:site_name" content="AbSolution" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        <meta property="og:image:alt" content="AbSolution Portfolio Preview" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteName} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={`${siteUrl}/twitter-image.jpg`} />
        <meta name="twitter:image:alt" content="AbSolution Portfolio Preview" />
        <meta name="twitter:creator" content="@yourusername" />
        <meta name="twitter:site" content="@yourusername" />

        {/* Additional SEO Meta Tags */}
        <meta name="author" content="Abhishek Kumar" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta
          name="googlebot"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta
          name="bingbot"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta name="language" content="English" />
        <meta httpEquiv="content-language" content="en" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="rating" content="General" />
        <meta name="referrer" content="origin-when-cross-origin" />
        <meta name="format-detection" content="telephone=no" />

        {/* Viewport & Mobile */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="AbSolution" />
        <meta name="application-name" content="AbSolution" />

        {/* DNS Prefetch & Preconnect for Performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Canonical & Links */}
        <link rel="canonical" href={siteUrl} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="AbSolution RSS Feed"
          href="/rss.xml"
        />

        {/* Structured Data - Enhanced JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": `${siteUrl}/#person`,
              name: "Abhishek Kumar",
              alternateName: "AbSolution",
              url: siteUrl,
              image: `${siteUrl}/profile.jpg`,
              sameAs: [
                "https://github.com/ABHI24082001",
                "https://linkedin.com/in/abhishek-kumar-201b91195/",
              ],
              jobTitle: "Full Stack Developer",
              description: "Personal and professional project portfolio",
              worksFor: {
                "@type": "Organization",
                name: "AbSolution",
              },
              knowsAbout: [
                "Web Development",
                "Next.js",
                "React",
                "JavaScript",
                "TypeScript",
              ],
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${siteUrl}/#website`,
              url: siteUrl,
              name: "AbSolution",
              description: siteDescription,
              publisher: {
                "@id": `${siteUrl}/#person`,
              },
              inLanguage: "en-US",
            }),
          }}
        />
      </Head>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
