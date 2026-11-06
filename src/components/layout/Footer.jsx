import { useState } from 'react'
import { navigation, profile } from '../../data/portfolio'

const footerLinks = navigation.filter(label => ['Home', 'About', 'Projects', 'Contact'].includes(label))

export default function Footer() {
  const [year] = useState(() => new Date().getFullYear())
  return <footer className="portfolio-footer" aria-label="Portfolio footer">
    <div className="wrap" data-reveal>
      <div className="footer-main">
        <div className="footer-identity">
          <a className="footer-brand" href="#home" aria-label="Portfolio, back to Home">PORTFOLIO<span>.</span></a>
          <p className="footer-name">{profile.name}</p>
          <p className="footer-role">{profile.title}</p>
        </div>
        <nav className="footer-navigation" aria-label="Footer navigation">
          {footerLinks.map(label => <a key={label} href={`#${label.toLowerCase()}`}>{label}</a>)}
        </nav>
      </div>
      <div className="footer-bottom">
        <p>© {year} {profile.name}. All rights reserved.</p>
        <div className="footer-meta"><span>{profile.location}</span><a className="footer-top-link" href="#home">Back to top <span aria-hidden="true">↑</span></a></div>
      </div>
    </div>
  </footer>
}
