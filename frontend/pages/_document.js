import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />

        {/* Proper Favicon (Logo in Tab) */}
        <link rel="icon" href="/logo.png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/logo.png" />

        {/* Meta Theme Color for Neon UI */}
        <meta name="theme-color" content="#0B0220" />
      </Head>

      <body className="bg-[#020010] text-white transition-colors duration-300">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}