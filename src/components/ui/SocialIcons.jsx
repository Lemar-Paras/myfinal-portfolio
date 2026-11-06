import { profile } from '../../data/portfolio'
import { profileLinks } from '../../utils/content'

function SocialIcon({ name }) {
  const shared = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: false }
  switch (name) {
    case 'Email': return <svg {...shared}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></svg>
    case 'GitHub': return <svg {...shared}><path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7M15.5 22v-3.9c.1-1-.3-1.8-.8-2.3 2.7-.3 5.5-1.3 5.5-6A4.7 4.7 0 0 0 19 6.5a4.3 4.3 0 0 0-.1-3.3s-1-.3-3.5 1.3a12 12 0 0 0-6.3 0C6.7 2.9 5.6 3.2 5.6 3.2a4.3 4.3 0 0 0-.1 3.3 4.7 4.7 0 0 0-1.2 3.3c0 4.7 2.8 5.7 5.5 6-.5.5-.9 1.2-.8 2.3V22"/></svg>
    case 'LinkedIn': return <svg {...shared}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7.5 10v7M11 17v-7h3v1.2c1-1.9 4-1.5 4 1.3V17M7.5 6.8v.1"/></svg>
    case 'Facebook': return <svg {...shared}><path d="M14.5 21v-8h3l.5-3h-3.5V8c0-1 .4-1.5 1.5-1.5h2V3.3c-.6-.2-1.7-.3-2.8-.3C12.3 3 10 4.8 10 8v2H7v3h3v8"/></svg>
    case 'Instagram': return <svg {...shared}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg>
    default: return null
  }
}

export default function SocialIcons({ label = 'Connect with Lemar Paras' }) {
  return <nav className="social-icons" aria-label={label}>
    {profileLinks(profile).filter(link => !link.download && link.href).map(link => <a key={link.label}
      className="social-icon" href={link.href} target={link.external ? '_blank' : undefined}
      rel={link.external ? 'noopener noreferrer' : undefined}
      aria-label={link.external ? `${link.label} profile (opens in a new tab)` : `Email ${profile.email}`}>
      <SocialIcon name={link.label}/><span className="social-tooltip" aria-hidden="true">{link.label}</span>
    </a>)}
  </nav>
}
