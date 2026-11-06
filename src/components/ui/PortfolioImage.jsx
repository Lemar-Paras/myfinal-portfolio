import { useState } from 'react'
import { assetUrl } from '../../utils/content'

export default function PortfolioImage({ image, className = '' }) {
  const [failed, setFailed] = useState(false)
  const src = assetUrl(image?.src)
  if (!src || !image?.alt || !image?.width || !image?.height || failed) {
    return <div className={`image-unavailable ${className}`} role="img" aria-label="Image unavailable">Image unavailable · please check the supplied file and description.</div>
  }
  return <img className={className} src={src} alt={image.alt} width={image.width} height={image.height}
    loading="lazy" decoding="async" onError={() => setFailed(true)} />
}
