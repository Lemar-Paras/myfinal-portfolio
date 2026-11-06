import { Children, isValidElement, cloneElement } from 'react'

// Preserve real text, whitespace, nested accents, and explicit line breaks.
// No duplicate screen-reader text, innerHTML, or post-mount DOM mutation.
export default function RevealText({ children }) {
  let index = 0
  function words(nodes) {
    return Children.map(nodes, node => {
      if (typeof node === 'string' || typeof node === 'number') {
        return String(node).split(/(\s+)/).map((word, part) => /^\s*$/.test(word) ? word :
          <span className="word-mask" key={`${part}-${word}`}><span className="word-reveal" style={{ '--word-delay': `${Math.min(index++, 5) * 30}ms` }}>{word}</span></span>)
      }
      if (isValidElement(node) && node.props.children !== undefined) {
        return cloneElement(node, {}, words(node.props.children))
      }
      return node
    })
  }
  return words(children)
}
