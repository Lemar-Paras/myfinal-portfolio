import PortfolioImage from './PortfolioImage'
import { assetUrl } from '../../utils/content'

export default function ScreenshotGallery({ images = [], projectName }) {
  if (!images.length) return null
  return <div className="screenshot-gallery" aria-label={`${projectName} application screenshots`}>
    {images.map((image, index) => <figure key={`${image.src}-${index}`}>
      <PortfolioImage image={image} />
      <figcaption>{image.caption || image.alt}{assetUrl(image.src) && <a href={assetUrl(image.src)} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size screenshot ${index + 1} for ${projectName} in a new tab`}>Open full size ↗</a>}</figcaption>
    </figure>)}
  </div>
}
