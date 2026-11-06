import { useEffect, useRef } from 'react'

export default function AnimatedDialog({ id, open, onDismiss, titleId, descriptionId, children }) {
  const ref = useRef(null)
  const backdropPress = useRef(false)
  useEffect(() => {
    const dialog = ref.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const previousOverflow = document.body.style.overflow
    let animation
    function restoreScroll() { document.body.style.overflow = previousOverflow }
    function finishClose() { dialog.close(); restoreScroll() }
    if (open || dialog.open) document.body.style.overflow = 'hidden'
    if (open) {
      dialog.dataset.closing = 'false'
      if (!dialog.open) dialog.showModal()
      dialog.scrollTop = 0
      if (!reduced.matches && dialog.animate) animation = dialog.animate([
        { opacity: 0, transform: 'translateY(18px) scale(.985)' },
        { opacity: 1, transform: 'translateY(0) scale(1)' },
      ], { duration: 280, easing: 'cubic-bezier(.22,1,.36,1)' })
    } else if (dialog.open) {
      dialog.dataset.closing = 'true'
      if (reduced.matches || !dialog.animate) finishClose()
      else {
        animation = dialog.animate([
          { opacity: 1, transform: 'translateY(0) scale(1)' },
          { opacity: 0, transform: 'translateY(10px) scale(.99)' },
        ], { duration: 170, easing: 'ease-in', fill: 'forwards' })
        animation.finished.then(finishClose).catch(() => {})
      }
    }
    function motionChanged() { if (reduced.matches) animation?.finish() }
    reduced.addEventListener('change', motionChanged)
    return () => {
      animation?.cancel()
      restoreScroll()
      reduced.removeEventListener('change', motionChanged)
    }
  }, [open])

  useEffect(() => {
    const dialog = ref.current
    return () => { if (dialog.open) dialog.close() }
  }, [])

  return <dialog ref={ref} id={id} className="project-dialog" aria-labelledby={titleId} aria-describedby={descriptionId}
    onCancel={event => { event.preventDefault(); onDismiss() }}
    onPointerDown={event => { backdropPress.current = event.target === event.currentTarget }}
    onClick={event => {
      if (backdropPress.current && event.target === event.currentTarget) onDismiss()
      backdropPress.current = false
    }}>
    {children}
  </dialog>
}
