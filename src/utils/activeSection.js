// Select from all ordered section positions, not the last observer callback.
// Anchor targets use scroll-padding; the reading line sits just beneath it.
export function selectActiveSection(sections, readingLine, atBottom) {
  if (!sections.length) return 'home'
  if (atBottom) return sections[sections.length - 1].id
  let active = sections[0].id
  for (const section of sections) {
    if (section.top > readingLine) break
    active = section.id
  }
  return active
}
