import { profile } from '../data/portfolio'
import Arrow from '../components/ui/Arrow'
import FutureScene from '../components/ui/FutureScene'
import Magnetic from '../components/ui/Magnetic'
import { profileLinks } from '../utils/content'
import SocialIcons from '../components/ui/SocialIcons'

export default function Hero() {
  const [firstName, ...surname] = profile.name.split(' ')
  const resume = profileLinks(profile).find(link => link.download)
  return <section id="home" className="hero wrap" aria-labelledby="hero-title">
    <div className="hero-top entrance">
      <span className="availability">{profile.availability.open && <i className="status-dot"/>}{profile.availability.label}</span>
      <span className="hero-location">{profile.location}</span>
    </div>
    <div className="hero-composition">
      <div className="hero-content">
        <div className="hero-name">
          <h1 id="hero-title" aria-label={profile.name}><span className="name-line">{firstName.toUpperCase()}</span><span className="name-line name-outline">{surname.join(' ').toUpperCase()}<span className="name-period">.</span><sup>®</sup></span></h1>
          <p className="hero-role entrance">{profile.title}</p>
        </div>
        <p className="hero-introduction entrance">{profile.introduction}</p>
        <div className="hero-actions entrance"><Magnetic><a className="button button-primary" href="#projects">Explore projects <Arrow/></a></Magnetic><Magnetic><a className="button button-secondary" href="#contact">Contact me <Arrow/></a></Magnetic></div>
        <div className="hero-connect entrance">
          <SocialIcons label="Hero social and email links"/>
          {resume.href ? <a className="button button-secondary resume-download" href={resume.href} download>Download Resume <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/></svg></a> : <span>Resume PDF pending</span>}
        </div>
      </div>
      <FutureScene/>
    </div>
    <div className="hero-foot entrance"><a href="#about" className="scroll-link"><span className="scroll-track" aria-hidden="true">↓</span> Discover the portfolio</a></div>
  </section>
}
