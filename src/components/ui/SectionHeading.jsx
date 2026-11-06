import RevealText from './RevealText'

export default function SectionHeading({ number, label, title, children }) {
  return <div className="section-heading" data-reveal><p className="eyebrow"><span>{number} /</span> {label}</p><div className="heading-row"><h2><RevealText>{title}</RevealText></h2>{children && <p>{children}</p>}</div></div>
}

