// Configuration is editable, but links should never accept executable schemes.
export function webUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return null
  try {
    const url = new URL(value)
    return ['https:', 'http:'].includes(url.protocol) ? url.href : null
  } catch { return null }
}

export function assetUrl(value) {
  if (typeof value !== 'string') return null
  if (/^\/(?!\/)/.test(value) && !/[\\\s]/.test(value)) return value
  return webUrl(value)
}

export function emailUrl(value) {
  return typeof value === 'string' && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value)
    ? `mailto:${encodeURIComponent(value).replace('%40', '@')}` : null
}

export function profileLinks(profile) {
  return [
    { label: 'Email', href: emailUrl(profile.email), pending: 'Email address to be added' },
    { label: 'GitHub', href: webUrl(profile.github), pending: 'Profile link to be added', external: true },
    { label: 'LinkedIn', href: webUrl(profile.linkedin), pending: 'Profile link to be added', external: true },
    { label: 'Facebook', href: webUrl(profile.facebook), pending: 'Profile link to be added', external: true },
    { label: 'Instagram', href: webUrl(profile.instagram), pending: 'Profile link to be added', external: true },
    { label: 'Download Resume', href: assetUrl(profile.resume), pending: 'PDF to be added', download: true },
  ]
}
