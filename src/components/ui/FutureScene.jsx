import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'

const OrbitalCanvas = lazy(() => import('../three/OrbitalCanvas'))

class SceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onFailure() }
  render() { return this.state.failed ? null : this.props.children }
}

function OrbitalFallback() {
  return <svg className="orbital orbital--static" viewBox="0 0 500 500" fill="none">
      <title>Faceted geometric core with three elliptical orbital rings</title>
      <g className="orbital-rings" strokeWidth="1.1">
        <ellipse cx="250" cy="242" rx="154" ry="78" transform="rotate(30 250 242)" stroke="#849b6b" />
        <ellipse cx="250" cy="242" rx="170" ry="72" transform="rotate(100 250 242)" stroke="#9aaa81" />
        <ellipse cx="250" cy="242" rx="186" ry="76" transform="rotate(-30 250 242)" stroke="#c5ff55" />
      </g>
      <g stroke="#b3dc70" strokeWidth="1" strokeLinejoin="round">
        <path d="M250 112 320 234 250 372 180 234Z" fill="#171d1f" />
        <path d="m250 112 12 128 58-6Z" fill="#303a39" />
        <path d="m250 112-70 122 82 6Z" fill="#232c2b" />
        <path d="m180 234 70 138 12-132Z" fill="#141b1d" />
        <path d="m262 240-12 132 70-138Z" fill="#252e2b" />
      </g>
      <circle cx="411" cy="149" r="3.2" fill="#d4edaa" />
    </svg>
}

export default function FutureScene() {
  const container = useRef(null)
  const interaction = useRef({ x: 0, y: 0, hover: 0 })
  const [preferences, setPreferences] = useState({ reduced: true, finePointer: false, supported: false })
  const [visible, setVisible] = useState(() => typeof window !== 'undefined' && !('IntersectionObserver' in window))
  const [pageVisible, setPageVisible] = useState(true)
  const [failed, setFailed] = useState(false)
  const [ready, setReady] = useState(false)
  const onReady = useCallback(() => setReady(true), [])
  const onFailure = useCallback(() => { setFailed(true); setReady(false) }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => {
      setPreferences({ reduced: reduced.matches, finePointer: pointer.matches,
        supported: 'WebGL2RenderingContext' in window && 'ResizeObserver' in window })
      interaction.current = { x: 0, y: 0, hover: 0 }
      if (reduced.matches) setReady(false)
    }
    const visibility = () => setPageVisible(!document.hidden)
    update()
    visibility()
    reduced.addEventListener('change', update)
    pointer.addEventListener('change', update)
    document.addEventListener('visibilitychange', visibility)
    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 })
      : null
    if (observer) observer.observe(container.current)
    return () => {
      observer?.disconnect()
      reduced.removeEventListener('change', update)
      pointer.removeEventListener('change', update)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [])

  const eligible = preferences.supported && !preferences.reduced && !failed
  const running = eligible && visible && pageVisible

  function move(event) {
    if (!preferences.finePointer || event.pointerType !== 'mouse' || !running) return
    const bounds = event.currentTarget.getBoundingClientRect()
    interaction.current.x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1))
    interaction.current.y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1))
    interaction.current.hover = 1
  }
  function reset() { interaction.current.x = 0; interaction.current.y = 0; interaction.current.hover = 0 }

  return <div ref={container} className="future-scene" onPointerMove={move} onPointerLeave={reset} aria-hidden="true">
    <div className={`scene-stage${eligible && ready ? ' scene-stage--ready' : ''}`}>
      <div className="scene-fallback"><OrbitalFallback /></div>
      {eligible && (running || ready) && <SceneBoundary onFailure={onFailure}>
        <Suspense fallback={null}>
          <OrbitalCanvas running={running} interaction={interaction} onReady={onReady} onFailure={onFailure} />
        </Suspense>
      </SceneBoundary>}
    </div>
  </div>
}
