import { useEffect, useRef, useState } from 'react'
import { navigation, profile } from '../../data/portfolio'
import { useActiveSection } from '../../hooks/useActiveSection'
import Arrow from '../ui/Arrow'

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection()
  const shell = useRef(null)
  const menu = useRef(null)
  const toggle = useRef(null)

  function closeMenu(returnFocus = false) {
    setOpen(false)
    if (returnFocus) toggle.current?.focus({ preventScroll: true })
  }

  useEffect(() => {
    const compact = window.matchMedia('(max-width: 1200px)')
    const phone = window.matchMedia('(max-width: 480px)')
    function resize() {
      const focused = document.activeElement
      setOpen(false)
      if (compact.matches && menu.current?.contains(focused)) {
        toggle.current?.focus({ preventScroll: true })
      } else if (!compact.matches && (focused === toggle.current || focused?.classList.contains('nav-panel-cta'))) {
        // The compact toggle/CTA becomes hidden when the inline menu returns.
        menu.current?.querySelector('.navbar-links a')?.focus({ preventScroll: true })
      }
    }
    compact.addEventListener('change', resize)
    function resizeCta() {
      const focused = document.activeElement
      if (phone.matches && focused?.classList.contains('nav-header-cta')) {
        toggle.current?.focus({ preventScroll: true })
      } else if (!phone.matches && focused?.classList.contains('nav-panel-cta')) {
        shell.current?.querySelector('.nav-header-cta')?.focus({ preventScroll: true })
      }
    }
    phone.addEventListener('change', resizeCta)
    return () => {
      compact.removeEventListener('change', resize)
      phone.removeEventListener('change', resizeCta)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    menu.current?.querySelector('a')?.focus({ preventScroll: true })
    function keydown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        toggle.current?.focus({ preventScroll: true })
      }
    }
    function outside(event) {
      if (!shell.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('keydown', keydown)
    document.addEventListener('pointerdown', outside)
    document.addEventListener('focusin', outside)
    return () => {
      document.removeEventListener('keydown', keydown)
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('focusin', outside)
    }
  }, [open])

  return <header className="site-header">
    <div ref={shell} className="nav-inner wrap" data-menu-open={open}>
      <a className="brand navbar-brand" href="#home" onClick={() => closeMenu(open)} aria-label={`${profile.name} portfolio home`}>
        PORTFOLIO.
      </a>
      <nav ref={menu} id="primary-navigation" aria-label="Main navigation" className={`navbar-navigation${open ? ' is-open' : ''}`}>
        <div className="nav-panel-heading"><span>Navigation</span><small>PORTFOLIO.</small></div>
        <div className="navbar-links">{navigation.map((item, index) => <a key={item} href={`#${item.toLowerCase()}`}
          aria-current={active === item.toLowerCase() ? 'location' : undefined} onClick={() => closeMenu(open)}>
          <span className="nav-item-index" aria-hidden="true">0{index + 1}</span>
          <span>{item}</span><Arrow diagonal={false}/>
        </a>)}</div>
        <a className="navbar-cta nav-panel-cta" href="#contact" onClick={() => closeMenu(true)}>Let's Talk <Arrow diagonal={false}/></a>
      </nav>
      <div className="navbar-actions">
        <a className="navbar-cta nav-header-cta" href="#contact" onClick={() => closeMenu(open)}>Let's Talk <Arrow diagonal={false}/></a>
        <button ref={toggle} className="navbar-menu-toggle" type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(previous => !previous)}>
          <span className="navbar-menu-lines" aria-hidden="true"><i/><i/><i/></span>
        </button>
      </div>
    </div>
  </header>
}
