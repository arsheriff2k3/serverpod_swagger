# Serverpod Swagger - Documentation Site

This is the documentation website for the [serverpod_swagger](https://pub.dev/packages/serverpod_swagger) package, built with Next.js 14 + Tailwind CSS.

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm build
pnpm start
```

## Structure

```
components/     # Reusable React components (Navbar, Sidebar, CodeBlock, etc.)
pages/          # Next.js pages
  docs/         # Main documentation
  api-reference/# API reference
  examples/     # Usage examples
styles/         # Global CSS (glassmorphism theme)
```

## Deployment

The site is deployed to Vercel at [serverpodswagger.vercel.app](https://serverpodswagger.vercel.app).
