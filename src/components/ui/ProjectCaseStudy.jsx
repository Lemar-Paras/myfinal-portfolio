import Arrow from './Arrow'
import ScreenshotGallery from './ScreenshotGallery'
import ProjectPreview from './ProjectPreview'
import { webUrl } from '../../utils/content'

export default function ProjectCaseStudy({ project }) {
  const repository = webUrl(project.repository)
  const demo = webUrl(project.demo)
  return <div className="case-study">
    {(project.description || project.details) && <section><h3>Overview</h3>
      {project.description && <p>{project.description}</p>}
      {project.details && <p>{project.details}</p>}
    </section>}
    {(project.problem || project.purpose) && <div className="case-study-grid">
      {project.problem && <section><h3>Problem</h3><p>{project.problem}</p></section>}
      {project.purpose && <section><h3>Purpose</h3><p>{project.purpose}</p></section>}
    </div>}
    {project.features?.length > 0 && <section><h3>Main features</h3>
      <ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
    </section>}
    {project.technologies.length > 0 && <section><h3>Technologies</h3>
      <div className="project-tags">{project.technologies.map(tag => <span key={tag}>{tag}</span>)}</div>
    </section>}
    {project.contributions && <section><h3>My contributions</h3><p>{project.contributions}</p></section>}
    {project.developmentStatus && <section><h3>Development status</h3><p>{project.developmentStatus}</p></section>}
    {project.screenshots?.length > 0
      ? <section><h3>Screenshots</h3><ScreenshotGallery images={project.screenshots} projectName={project.name}/></section>
      : <section><h3>Conceptual preview</h3><div className="case-study-preview"><ProjectPreview project={project}/></div></section>}
    {(repository || demo) && <div className="case-study-links">
      {repository && <a className="button button-secondary" href={repository} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} repository (opens in a new tab)`}>View Repository <Arrow/></a>}
      {demo && <a className="button button-secondary" href={demo} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} Live Website (opens in a new tab)`}>Live Website <Arrow/></a>}
    </div>}
  </div>
}
