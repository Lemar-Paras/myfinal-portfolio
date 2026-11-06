import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { profile, seo } from './src/data/portfolio.js'
import { metadataHtml } from './src/utils/metadata.js'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'portfolio-metadata',
      transformIndexHtml(html) {
        return html.replace(/<title>[\s\S]*?<\/title>/, '')
          .replace(/<meta name="description"[^>]*\/>/, '')
          .replace('</head>', `    ${metadataHtml(seo, profile.name)}\n  </head>`)
      },
    },
  ],
})
