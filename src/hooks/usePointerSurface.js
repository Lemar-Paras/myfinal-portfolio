import { useEffect, useRef } from 'react'
import { observeFineMotion } from '../utils/fineMotion'

export function usePointerSurface(distance = 5) {
  const ref = useRef(null)
  useEffect(() => observeFineMotion(() => {
    const element = ref.current
    if (!element) return
    let frame = 0
    let bounds
    let x = 0
    let y = 0
    function paint() {
      frame = 0
      element.style.setProperty('--surface-x', `${x * distance}px`)
      element.style.setProperty('--surface-y', `${y * distance}px`)
      element.style.setProperty('--surface-rx', `${-y * 1.2}deg`)
      element.style.setProperty('--surface-ry', `${x * 1.2}deg`)
    }
    function reset() {
      cancelAnimationFrame(frame)
      frame = 0
      bounds = undefined
      x = 0
      y = 0
      paint()
    }
    function move(event) {
      if (event.pointerType !== 'mouse' || element.matches(':focus-within')) return
      bounds ??= element.getBoundingClientRect()
      x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1))
      y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1))
      if (!frame) frame = requestAnimationFrame(paint)
    }
    element.addEventListener('pointermove', move)
    element.addEventListener('pointerleave', reset)
    element.addEventListener('focusin', reset)
    window.addEventListener('scroll', reset, { passive: true })
    window.addEventListener('resize', reset)
    return () => {
      reset()
      element.removeEventListener('pointermove', move)
      element.removeEventListener('pointerleave', reset)
      element.removeEventListener('focusin', reset)
      window.removeEventListener('scroll', reset)
      window.removeEventListener('resize', reset)
    }
  }), [distance])
  return ref
}
