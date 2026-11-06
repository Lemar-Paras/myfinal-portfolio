import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import { transformWithOxc } from 'vite'
import { profile, contactDelivery } from '../data/portfolio.js'
import { buildContactDraft, deliverContact, isDeliveryConfigured, validateContact } from '../services/contact.js'

// Exercise React element handlers without a DOM dependency. This does not test
// browser layout, native focus behavior, mail handlers, or Clipboard permissions.
async function componentHarness(file, bindings) {
  const source = await readFile(new URL(file, import.meta.url), 'utf8')
  const { code } = await transformWithOxc(source, file, { jsx: { runtime: 'classic' } })
  const slots = []
  const effects = []
  let index = 0
  const hooks = {
    useState(initial) {
      const slot = index++
      if (!(slot in slots)) slots[slot] = typeof initial === 'function' ? initial() : initial
      return [slots[slot], next => { slots[slot] = typeof next === 'function' ? next(slots[slot]) : next }]
    },
    useRef(initial) {
      const slot = index++
      return slots[slot] ??= { current: initial }
    },
    useEffect(setup) {
      const slot = index++
      if (!(slot in slots)) { slots[slot] = {}; effects.push(() => { slots[slot].cleanup = setup() }) }
    },
  }
  const scope = { ...hooks, React: { createElement: (type, props, ...children) => ({ type, props: { ...props, children } }) }, Arrow: () => null, ...bindings }
  const factory = new Function(...Object.keys(scope), code.replace(/^import .*$/gm, '').replace('export default function', 'return function'))
  const Component = factory(...Object.values(scope))
  return {
    render() { index = 0; return Component() },
    mount() { effects.splice(0).forEach(effect => effect()) },
    dispose() { slots.forEach(slot => slot?.cleanup?.()) },
  }
}

function find(node, predicate) {
  if (!node || typeof node !== 'object') return null
  if (Array.isArray(node)) return node.map(child => find(child, predicate)).find(Boolean) || null
  return predicate(node) ? node : find(node.props?.children, predicate)
}

async function contactHarness(clipboard = {}) {
  const handoffs = []
  const focused = []
  const harness = await componentHarness('../components/ui/ContactForm.jsx', {
    profile, contactDelivery, buildContactDraft, deliverContact, isDeliveryConfigured, validateContact,
    window: { location: { assign: url => handoffs.push(url) } }, navigator: { clipboard },
    FormData: function (element) { return Object.entries(element.values) },
  })
  const tree = harness.render()
  tree.props.ref.current = { elements: { namedItem: name => ({ focus: () => focused.push(name) }) } }
  harness.mount()
  return { ...harness, handoffs, focused }
}

const values = { name: 'Visitor', email: 'visitor@example.com', message: 'First draft', website: '' }
const submit = (tree, fields) => tree.props.onSubmit({ preventDefault() {}, currentTarget: { values: fields } })

test('invalid contact fields focus the first error and never request a mail app', async () => {
  const harness = await contactHarness()
  await submit(harness.render(), { name: '', email: 'invalid', message: '', website: '' })
  assert.deepEqual(harness.handoffs, [])
  assert.deepEqual(harness.focused, ['name'])
  assert.ok(find(harness.render(), node => node.props.role === 'alert'))
  harness.dispose()
})

test('editing a prepared email invalidates the stale copy draft and handoff feedback', async () => {
  const harness = await contactHarness()
  await submit(harness.render(), values)
  assert.equal(new URL(harness.handoffs[0]).searchParams.get('subject'), 'Portfolio enquiry from Visitor')
  const prepared = harness.render()
  assert.match(find(prepared, node => node.props.id === 'fallback-draft').props.value, /First draft/)
  find(prepared, node => node.type === 'fieldset').props.onChange()
  const edited = harness.render()
  assert.equal(find(edited, node => node.props.id === 'fallback-draft'), null)
  assert.ok(!find(edited, node => node.props.role === 'status').props.children.some(Boolean))
  harness.dispose()
})

test('blocked clipboard access selects the draft for manual copying without losing it', async () => {
  const harness = await contactHarness({ writeText: async () => { throw new Error('Permission denied') } })
  await submit(harness.render(), values)
  const tree = harness.render()
  const draft = find(tree, node => node.props.id === 'fallback-draft')
  const actions = []
  draft.props.ref.current = { focus: () => actions.push('focus'), select: () => actions.push('select') }
  await find(tree, node => node.type === 'button' && node.props.children.includes('Copy draft')).props.onClick()
  assert.deepEqual(actions, ['focus', 'select'])
  assert.equal(find(harness.render(), node => node.props.id === 'fallback-draft').props.value, draft.props.value)
  assert.match(find(harness.render(), node => node.props.className === 'copy-status').props.children[0], /copy it manually/)
  harness.dispose()
})

test('crossing the phone CTA breakpoint recovers focus in both directions and removes listeners', async () => {
  const queries = new Map()
  const focus = []
  const document = { activeElement: null }
  const harness = await componentHarness('../components/layout/Navigation.jsx', {
    profile, navigation: ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'], useActiveSection: () => 'home',
    document, window: { matchMedia: query => {
      const media = { matches: query.includes('1200'), handlers: new Set(), addEventListener(_, fn) { this.handlers.add(fn) }, removeEventListener(_, fn) { this.handlers.delete(fn) } }
      queries.set(query, media)
      return media
    } },
  })
  const tree = harness.render()
  find(tree, node => node.props.className === 'nav-inner wrap').props.ref.current = { querySelector: () => ({ focus: () => focus.push('header CTA') }) }
  find(tree, node => node.props.className === 'navbar-menu-toggle').props.ref.current = { focus: () => focus.push('toggle') }
  harness.mount()
  const phone = queries.get('(max-width: 480px)')
  document.activeElement = { classList: { contains: name => name === 'nav-header-cta' } }
  phone.matches = true
  phone.handlers.forEach(handler => handler())
  document.activeElement = { classList: { contains: name => name === 'nav-panel-cta' } }
  phone.matches = false
  phone.handlers.forEach(handler => handler())
  assert.deepEqual(focus, ['toggle', 'header CTA'])
  harness.dispose()
  assert.ok([...queries.values()].every(media => media.handlers.size === 0))
})
