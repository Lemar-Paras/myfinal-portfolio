// Subscribe only while both precise input and motion are appropriate.
// Each setup returns its own event/frame cleanup; preference changes tear it down.
export function observeFineMotion(setup) {
  const pointer = window.matchMedia('(hover: hover) and (pointer: fine)')
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let dispose
  function update() {
    dispose?.()
    dispose = undefined
    if (pointer.matches && !motion.matches) dispose = setup()
  }
  update()
  pointer.addEventListener('change', update)
  motion.addEventListener('change', update)
  return () => {
    dispose?.()
    pointer.removeEventListener('change', update)
    motion.removeEventListener('change', update)
  }
}
