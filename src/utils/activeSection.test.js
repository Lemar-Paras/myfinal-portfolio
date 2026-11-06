import assert from 'node:assert/strict'
import { test } from 'node:test'
import { selectActiveSection } from './activeSection.js'

const positions = (offset = 0) => [
  { id: 'home', top: -1600 + offset },
  { id: 'about', top: -1000 + offset },
  { id: 'skills', top: -400 + offset },
  { id: 'projects', top: 100 + offset },
  { id: 'experience', top: 1200 + offset },
  { id: 'contact', top: 1800 + offset },
]

test('desktop project anchor selects Projects at the scroll-padding offset', () => {
  assert.equal(selectActiveSection(positions(), 102, false), 'projects')
})

test('mobile project anchor selects Projects below its shorter header', () => {
  const mobile = positions(-12)
  assert.equal(selectActiveSection(mobile, 90, false), 'projects')
})

test('scrolling back above Projects restores Skills regardless of a retained hash', () => {
  assert.equal(selectActiveSection(positions(20), 102, false), 'skills')
  assert.equal(selectActiveSection(positions(-20), 102, false), 'projects')
})

test('a tall section stays active until the next section reaches the reading line', () => {
  assert.equal(selectActiveSection(positions(-800), 102, false), 'projects')
})

test('the bottom of the page selects a short final contact section', () => {
  assert.equal(selectActiveSection(positions(-1100), 102, true), 'contact')
})

test('the page top selects Home before any section passes the reading line', () => {
  assert.equal(selectActiveSection(positions(2000), 102, false), 'home')
  assert.equal(selectActiveSection([], 102, false), 'home')
})
