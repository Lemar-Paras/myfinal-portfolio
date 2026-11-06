import { experience } from '../data/portfolio'
import SectionHeading from '../components/ui/SectionHeading'
import Arrow from '../components/ui/Arrow'

function RecognitionIcon({ type }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {type === 'certificate'
      ? <><path d="M13 19H4V3h16v10M8 7h8M8 11h5"/><circle cx="17" cy="16" r="3"/><path d="m15 18.3-1 3.7 3-1.5 3 1.5-1-3.7"/></>
      : <><circle cx="12" cy="9" r="5"/><path d="m8.5 12.5-2 8 5.5-3 5.5 3-2-8M12 6.5l.8 1.6 1.7.2-1.2 1.2.3 1.7-1.6-.8-1.6.8.3-1.7L9.5 8.3l1.7-.2Z"/></>}
  </svg>
}

export default function Experience() {
  return <section id="experience" className="section experience-section" aria-label="Experience and education">
    <div className="wrap">
      <SectionHeading number="04" label="Experience" title="My journey so far.">Learning. Building. Leading.</SectionHeading>
      <div className="experience-columns">
        <section className="experience-development" aria-labelledby="development-heading">
          <h3 className="experience-group-title" id="development-heading">Education &amp; Development</h3>
          <ol className="experience-timeline timeline">
            {experience.development.map(item => <li className="journey-entry" key={item.id} data-reveal>
              <div className="journey-meta"><span>{item.type}</span>{item.date && <span className="experience-date">{item.date}</span>}</div>
              <h4>{item.title}</h4>
              {item.organization && <p className="experience-organization">{item.organization}</p>}
              {item.description && <p className="experience-description">{item.description}</p>}
              {item.link && <a className="journey-link" href={item.link.href} aria-label={item.link.accessibleLabel}>{item.link.label}<Arrow/></a>}
            </li>)}
          </ol>
        </section>
        <section className="experience-leadership" aria-labelledby="leadership-heading">
          <h3 className="experience-group-title" id="leadership-heading">Leadership</h3>
          <ul className="leadership-grid">
            {experience.leadership.map(item => <li className="leadership-item" key={item.id} data-reveal>
              <article className="leadership-card">
                {item.date && <p className="experience-date">{item.date}</p>}
                <h4>{item.title}</h4>
                {item.organization && <p className="experience-organization">{item.organization}</p>}
                {item.institution && <p className="experience-institution">{item.institution}</p>}
                {item.description && <p className="experience-description">{item.description}</p>}
              </article>
            </li>)}
          </ul>
        </section>
      </div>
      <section className="experience-recognition" aria-labelledby="recognition-heading">
        <h3 className="experience-group-title" id="recognition-heading">Achievements &amp; Certifications</h3>
        <ul className="recognition-grid">
          {experience.achievements.map(item => <li className="recognition-item" key={item.id} data-reveal>
            <div className="recognition-card">
              <span className="recognition-icon"><RecognitionIcon type={item.icon}/></span>
              <div><h4>{item.title}</h4>{item.detail && <p>{item.detail}</p>}</div>
            </div>
          </li>)}
        </ul>
      </section>
    </div>
  </section>
}

