import { useState } from 'react'
import { assetUrl } from '../../utils/content'

export default function ProjectPreview({ project }) {
  const [failed, setFailed] = useState(false)
  const image = project.previewImage
  const src = assetUrl(image?.src)
  const showImage = src && !failed
  return <>
    {showImage ? <div className="project-art screenshot-art">
      <img src={src} alt={image.alt} width={image.width} height={image.height}
        loading="lazy" decoding="async" onError={() => setFailed(true)}/>
    </div> : project.previewStyle === 'arms' ? <div className="project-art arms-art" aria-hidden="true">
      <div className="preview-grid"/>
      <div className="arms-wordmark">arms<span>®</span></div>
      <div className="arms-caption">RESEARCH. REFINED.</div>
      <div className="workflow"><span>Submit</span><i/><span>Revise</span><i/><span>Schedule</span></div>
      <span className="art-corner">A BETTER PROCESS, BY DESIGN ↗</span>
    </div> : <div className={`project-art concept-art concept-${project.previewStyle}`} aria-hidden="true">
      <div className="concept-lines"/>
      <div className="abstract-symbol">{project.previewStyle === 'attendance' ? <><b/><b/><b/></>
        : project.previewStyle === 'shop' ? <><em/><em/></> : <><i/><i/></>}</div>
      <span className="placeholder-art-name">{project.previewStyle === 'attendance' ? 'Presence.'
        : project.previewStyle === 'shop' ? 'Commerce.' : project.previewStyle === 'school' ? 'CSAP' : 'Lost & Found'}</span>
    </div>}
    <span className="preview-disclaimer">{showImage ? project.preview : 'Conceptual preview · not a screenshot'}</span>
  </>
}
