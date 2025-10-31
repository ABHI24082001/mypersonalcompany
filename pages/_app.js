import "@/styles/globals.css";
import Head from "next/head";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>AbSolution - My Projects</title>
        <meta name="google-site-verification" content="b0ca910e72435de8" />
        <meta name="description" content="Abhishk's personal and professional project portfolio built using Next.js and React." />
        <meta name="keywords" content="AbSolution, Abhishk projects, Next.js developer, React developer, Tech portfolio" />
        <meta property="og:title" content="AbSolution - My Projects" />
        <meta property="og:description" content="Explore my personal and professional development work." />
        <meta property="og:url" content="https://absolutation.vercel.app" />
        <meta property="og:site_name" content="AbSolution" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://absolutation.vercel.app" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AbSolution - My Projects" />
        <meta name="twitter:description" content="Abhishk's personal and professional project portfolio." />
      </Head>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
