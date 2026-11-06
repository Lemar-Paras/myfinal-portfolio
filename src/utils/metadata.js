import { assetUrl, webUrl } from './content.js'

function escape(value) {
  return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character])
}

// Build-time output is readable by sharing crawlers without running React.
export function metadataHtml(seo, name) {
  const canonical = webUrl(seo.siteUrl)
  const image = assetUrl(seo.socialImage)
  const absoluteImage = image?.startsWith('/') ? (canonical ? new URL(image, canonical).href : null) : image
  const tags = [
    `<title>${escape(seo.title)}</title>`,
    `<meta name="description" content="${escape(seo.description)}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:site_name" content="${escape(name)}" />`,
    `<meta property="og:title" content="${escape(seo.title)}" />`,
    `<meta property="og:description" content="${escape(seo.description)}" />`,
    `<meta name="twitter:card" content="${absoluteImage && seo.socialImageAlt ? 'summary_large_image' : 'summary'}" />`,
    `<meta name="twitter:title" content="${escape(seo.title)}" />`,
    `<meta name="twitter:description" content="${escape(seo.description)}" />`,
  ]
  if (canonical) tags.push(`<link rel="canonical" href="${escape(canonical)}" />`, `<meta property="og:url" content="${escape(canonical)}" />`)
  if (absoluteImage && seo.socialImageAlt) tags.push(
    `<meta property="og:image" content="${escape(absoluteImage)}" />`,
    `<meta property="og:image:alt" content="${escape(seo.socialImageAlt)}" />`,
    `<meta name="twitter:image" content="${escape(absoluteImage)}" />`,
    `<meta name="twitter:image:alt" content="${escape(seo.socialImageAlt)}" />`,
  )
  return tags.join('\n    ')
}
