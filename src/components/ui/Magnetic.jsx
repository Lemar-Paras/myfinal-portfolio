import { usePointerSurface } from '../../hooks/usePointerSurface'

export default function Magnetic({ children }) {
  const ref = usePointerSurface(5)
  return <span ref={ref} className="magnetic">{children}</span>
}
