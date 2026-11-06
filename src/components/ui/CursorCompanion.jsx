import { useEffect, useRef } from 'react'
import { observeFineMotion } from '../../utils/fineMotion'

export default function CursorCompanion() {
  const ref = useRef(null)
  useEffect(() => observeFineMotion(() => {
    const element = ref.current
    let frame = 0
    let x = 0
    let y = 0
    function paint() {
      frame = 0
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }
    function hide() { element.dataset.visible = 'false' }
    function move(event) {
      if (event.pointerType !== 'mouse') { hide(); return }
      const target = event.target instanceof Element ? event.target : null
      // Native text/form controls and top-layer dialogs keep their normal cursor.
      if (!target || target.closest('input, textarea, select, [contenteditable], dialog, button:disabled')) {
        hide()
        return
      }
      x = event.clientX
      y = event.clientY
      element.dataset.visible = 'true'
      element.dataset.kind = target.closest('a.project-preview, button.project-preview') ? 'project'
        : target.closest('a, button') ? 'action' : 'default'
      if (!frame) frame = requestAnimationFrame(paint)
    }
    function out(event) { if (!event.relatedTarget) hide() }
    function keyboard(event) { if (!['Shift', 'Control', 'Alt', 'Meta'].includes(event.key)) hide() }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerout', out)
    window.addEventListener('keydown', keyboard)
    window.addEventListener('blur', hide)
    window.addEventListener('scroll', hide, { passive: true })
    document.addEventListener('visibilitychange', hide)
    return () => {
      cancelAnimationFrame(frame)
      hide()
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerout', out)
      window.removeEventListener('keydown', keyboard)
      window.removeEventListener('blur', hide)
      window.removeEventListener('scroll', hide)
      document.removeEventListener('visibilitychange', hide)
    }
  }), [])
  return <div ref={ref} className="cursor-companion" aria-hidden="true" data-visible="false"><span/><small>View</small></div>
}
