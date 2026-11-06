import { useEffect, useRef } from 'react'
import PortfolioImage from './PortfolioImage'

export default function PortraitCard({ image, name }) {
  const root = useRef(null)

  useEffect(() => {
    const element = root.current
    let visible = false
    function update() { element.dataset.animate = String(visible && !document.hidden) }
    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update() }, { threshold: 0 })
      : null
    observer?.observe(element)
    document.addEventListener('visibilitychange', update)
    return () => {
      observer?.disconnect()
      document.removeEventListener('visibilitychange', update)
      element.dataset.animate = 'false'
    }
  }, [])

  return <div ref={root} className="about-portrait" data-animate="false" data-reveal>
    <div className="portrait-halo" aria-hidden="true"/>
    <div className="portrait-card">
      <div className="portrait-window">
        {image ? <PortfolioImage key={image.src} image={image} className="profile-portrait"/> : <div className="portrait-empty">
          <span aria-hidden="true">{name.split(' ').map(part => part[0]).join('')}</span>
          <p>Portrait to be added</p>
        </div>}
      </div>
    </div>
  </div>
}
