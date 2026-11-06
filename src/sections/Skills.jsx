import SectionHeading from '../components/ui/SectionHeading'
import { skills } from '../data/portfolio'
import TechnologyIcon from '../components/ui/TechnologyIcon'

const showcaseGroups = skills.filter(group => group.items.length > 0)

export default function Skills() {
  return <section id="skills" className="section skills-section" aria-label="Technical skills">
    <div className="wrap">
      <SectionHeading number="02" label="Skills" title="Technical toolkit.">Tools and technologies I've used to build software.</SectionHeading>
      <div className="skills-grid">{showcaseGroups.map(group => <article className={`skill-category skill-category--${group.id}`} key={group.id} aria-labelledby={`skill-group-${group.id}`} data-reveal>
        <h3 id={`skill-group-${group.id}`}>{group.title}</h3>
        <ul className="skill-cards">{group.items.map((item, index) => <li className="skill-card-shell" key={item.name} style={{ '--card-delay': `${Math.min(index, 3) * 35}ms` }}>
          <div className="technology-card">
            <TechnologyIcon technology={item} />
            <span className="technology-name">{item.name}</span>
          </div>
        </li>)}</ul>
      </article>)}</div>
    </div>
  </section>
}
