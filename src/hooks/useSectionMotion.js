import { useEffect } from 'react'

export function useSectionMotion() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const elements = [...document.querySelectorAll('[data-reveal]')]
    // Stagger only peer groups, capped to avoid delaying access to content.
    document.querySelectorAll('.skills-grid, .projects-list, .timeline').forEach(group => {
      group.querySelectorAll(':scope > [data-reveal]').forEach((element, index) => {
        element.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 40}ms`)
      })
    })
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08 })
    if (!reducedMotion.matches) {
      elements.forEach(element => {
        // Already visible anchor destinations should not replay hidden entrances.
        if (element.getBoundingClientRect().bottom < 0) return
        element.classList.add('will-reveal')
        observer.observe(element)
      })
    }
    const showContent = () => {
      if (reducedMotion.matches) document.querySelectorAll('.will-reveal').forEach(element => element.classList.add('is-visible'))
    }
    reducedMotion.addEventListener('change', showContent)
    return () => {
      observer.disconnect()
      reducedMotion.removeEventListener('change', showContent)
      elements.forEach(element => {
        element.classList.remove('will-reveal', 'is-visible')
        element.style.removeProperty('--reveal-delay')
      })
    }
  }, [])
}
