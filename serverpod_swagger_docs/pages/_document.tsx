import { Html, Head, Main, NextScript } from 'next/document';

const SITE_URL = 'https://arsheriff2k3.github.io/serverpod_swagger';
const SITE_TITLE = 'Serverpod Swagger - OpenAPI Documentation Generator';
const SITE_DESCRIPTION =
  'Generate OpenAPI 3.0 specs from your Serverpod endpoints and serve interactive Swagger UI documentation. Smart HTTP method detection, auth support, and live reload.';

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />

        {/* Primary Meta */}
        <meta name="theme-color" content="#0a0a1a" />
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta name="author" content="arsheriff2k3" />
        <meta
          name="keywords"
          content="serverpod, swagger, openapi, dart, api documentation, swagger ui, openapi generator, serverpod swagger, rest api, api spec"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:image" content={`${SITE_URL}/og-image.svg`} />
        <meta property="og:site_name" content="Serverpod Swagger" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.svg`} />

        {/* Canonical */}
        <link rel="canonical" href={SITE_URL} />

        {/* Robots */}
        <meta name="robots" content="index, follow" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
