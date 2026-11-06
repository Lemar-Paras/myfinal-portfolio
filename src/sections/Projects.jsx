import { useState } from 'react'
import { projects } from '../data/portfolio'
import SectionHeading from '../components/ui/SectionHeading'
import Arrow from '../components/ui/Arrow'
import AnimatedDialog from '../components/ui/AnimatedDialog'
import ProjectCaseStudy from '../components/ui/ProjectCaseStudy'
import ProjectPreview from '../components/ui/ProjectPreview'
import { webUrl } from '../utils/content'

function ProjectCard({ project, onOpen }) {
  const demo = webUrl(project.demo)
  return <article className={`project project-${project.id}${project.featured ? ' project--featured' : ' project--provisional'}`} data-reveal>
    <div className="project-preview">
      <ProjectPreview project={project}/>
    </div>
    <div className="project-info">
      <div className="project-meta"><p className="eyebrow">{project.category}</p><span className="project-number">{project.id}</span></div>
      <h3>{project.name}</h3>
      {project.description && <p className="project-description">{project.description}</p>}
      {project.technologies.length > 0 && <div className="project-tags">{project.technologies.map(tag => <span key={tag}>{tag}</span>)}</div>}
      <div className="project-actions">
        <button className="button button-secondary" onClick={() => onOpen(project)} aria-label={`Project Details for ${project.name}`} aria-haspopup="dialog" aria-controls="project-details">Project Details <Arrow/></button>
        {demo && <a className="button button-secondary" href={demo} target="_blank" rel="noopener noreferrer"
          aria-label={`${project.name} Live Website (opens in a new tab)`}>Live Website <Arrow/></a>}
      </div>
    </div>
  </article>
}

export default function Projects() {
  const [selected, setSelected] = useState(projects[0])
  const [open, setOpen] = useState(false)
  function openProject(project) { setSelected(project); setOpen(true) }
  return <section id="projects" className="section wrap" aria-label="Featured projects">
    <SectionHeading number="03" label="Projects" title="Selected projects.">
      Academic systems and websites I've worked on.
    </SectionHeading>
    <div className="projects-list">{projects.map(project =>
      <ProjectCard key={project.id} project={project} onOpen={openProject}/>)}</div>
    <AnimatedDialog id="project-details" open={open} onDismiss={() => setOpen(false)} titleId="dialog-title" descriptionId="dialog-description">
      <div className="dialog-content">
        <button className="dialog-close" onClick={() => setOpen(false)} aria-label="Close project details">Close <span aria-hidden="true">×</span></button>
        <p className="eyebrow">PROJECT / {selected.id}{selected.status && ` · ${selected.status}`}</p>
        <h2 id="dialog-title">{selected.name}</h2>
        <p id="dialog-description">{selected.fullTitle !== selected.name ? selected.fullTitle : selected.category}</p>
        <ProjectCaseStudy key={selected.id} project={selected}/>
      </div>
    </AnimatedDialog>
  </section>
}
