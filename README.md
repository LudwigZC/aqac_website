# Queensland Chinese Affair Committee Website

Static bilingual website built with Next.js App Router, React, TypeScript, Tailwind CSS, Framer Motion, and GSAP.

## Requirements

- Node.js 20 recommended
- npm

## Local Development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Quality Checks

```bash
npm run lint
npm run typecheck
npm run build
```

The production build exports static files to `out/`.

## Environment Variables

Copy `.env.example` to `.env.local` if needed.

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_BASE_PATH` | No | Leave empty for Vercel/Netlify/root domains. Set to a subpath such as `/aqac_website` for GitHub Pages project deployments. |

## Deployment

### Recommended quick launch: Vercel

- Framework preset: Next.js
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `out`
- Environment variables: none required for root-domain deploys

### Existing GitHub Pages workflow

This repository includes `.github/workflows/nextjs.yml`. It builds with:

```bash
npx --no-install next build
```

The workflow sets `NEXT_PUBLIC_BASE_PATH` from GitHub Pages automatically and uploads `./out`.

## Content And Assets

- Locale copy lives in `content/locales/`.
- Event images live in `public/images/events/`.
- News poster images live in `public/images/news/`.
- Team images live in `public/images/team/`.

This site currently has no backend service, database, server API, or upload storage. Any future form submissions or file uploads will need an external service or backend before production use.
