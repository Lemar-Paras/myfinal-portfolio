import { useEffect, useState } from 'react'
import { selectActiveSection } from '../utils/activeSection'

export function useActiveSection() {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const sections = [...document.querySelectorAll('main > section[id]')]
    const header = document.querySelector('.site-header')
    let frame = 0
    function update() {
      frame = 0
      const headerBottom = header?.getBoundingClientRect().bottom ?? 0
      const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
      const readingLine = Math.max(headerBottom, padding) + 2
      const atBottom = window.scrollY > 0 &&
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      const positions = sections.map(section => ({ id: section.id, top: section.getBoundingClientRect().top }))
      setActive(selectActiveSection(positions, readingLine, atBottom))
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update) }
    const resize = 'ResizeObserver' in window ? new ResizeObserver(schedule) : null
    sections.forEach(section => resize?.observe(section))
    if (header) resize?.observe(header)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    window.addEventListener('hashchange', schedule)
    window.addEventListener('pageshow', schedule)
    schedule()
    return () => {
      cancelAnimationFrame(frame)
      resize?.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('hashchange', schedule)
      window.removeEventListener('pageshow', schedule)
    }
  }, [])
  return active
}
