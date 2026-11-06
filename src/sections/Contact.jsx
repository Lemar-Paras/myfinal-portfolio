import { profile } from '../data/portfolio'
import RevealText from '../components/ui/RevealText'
import ContactForm from '../components/ui/ContactForm'
import { emailUrl } from '../utils/content'
import SocialIcons from '../components/ui/SocialIcons'
import Arrow from '../components/ui/Arrow'

export default function Contact() {
  const email = emailUrl(profile.email)
  return <section id="contact" className="section contact-section wrap" aria-labelledby="contact-title">
    <div className="contact-layout">
      <div className="contact-copy" data-reveal>
        <p className="eyebrow"><span>05 /</span> Contact</p>
        <h2 id="contact-title"><RevealText>Let's connect.</RevealText></h2>
        <p>{profile.contactInvitation}</p>
        {email && <a className="contact-email" href={email}><span>{profile.email}</span><Arrow/></a>}
        <SocialIcons label="Contact social and email links"/>
      </div>
      <ContactForm/>
    </div>
  </section>
}
