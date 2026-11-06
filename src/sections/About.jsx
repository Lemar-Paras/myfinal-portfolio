import SectionHeading from '../components/ui/SectionHeading'
import PortraitCard from '../components/ui/PortraitCard'
import { profile } from '../data/portfolio'

export default function About() {
  const education = profile.education
  const firstName = profile.name.split(' ')[0]
  return <section id="about" className="section wrap" aria-label="About me">
    <SectionHeading number="01" label="About" title="About me."/>
    <div className="about-layout">
      <PortraitCard image={profile.portrait} name={profile.name}/>
      <div className="about-copy" data-reveal>
        <h3>Building useful software.</h3>
        <p>I’m {firstName}, a {education.yearLevel} {education.shortDegree} student at {education.school} in the {profile.location}.</p>
        {profile.biography.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        <div className="about-note"><i className="status-dot" aria-hidden="true"/><span>{profile.internshipNote}</span></div>
      </div>
    </div>
  </section>
}
