import Navigation from './components/layout/Navigation'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import { useSectionMotion } from './hooks/useSectionMotion'
import CursorCompanion from './components/ui/CursorCompanion'
import Footer from './components/layout/Footer'

export default function App() {
  useSectionMotion()
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navigation />
    <CursorCompanion />
    <main id="main"><Hero/><About/><Skills/><Projects/><Experience/><Contact/></main>
    <Footer/>
  </>
}
