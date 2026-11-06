# Lemar Paras — Developer Portfolio

Personal developer portfolio built with React, Vite, and Tailwind CSS. Includes a lazy-loaded Three.js sculpture, seventeen confirmed technologies, five project showcases with supplied screenshots, education and leadership highlights, and an email-app contact form.

## Development

Use Node.js 22.12 or newer and npm.

```sh
npm ci
npm run dev
```

## Checks

```sh
npm run lint
npm test
npm run build
```

Run `npm run preview` to inspect the production build locally. Generated `dist/`, installed `node_modules/`, and local environment files are excluded from Git.

## Content and behavior

- Centralized content: `src/data/portfolio.js`.
- Images and downloadable resume: `public/`.
- Contact prepares a draft in the visitor's email app; the website does not send messages. A copy fallback is available.
- The sculpture supports reduced motion, static fallbacks, and rendering pauses.
- Icon source manifests and licenses are retained beside the local SVGs.
- Implementation notes, validation history, and remaining browser checks: [PORTFOLIO.md](PORTFOLIO.md).

## Repository

[myfinal-portfolio](https://github.com/Lemar-Paras/myfinal-portfolio)
