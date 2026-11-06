import assert from 'node:assert/strict'
import { test } from 'node:test'
import { assetUrl, emailUrl, profileLinks, webUrl } from './content.js'
import { metadataHtml } from './metadata.js'
import { buildContactDraft, deliverContact, isDeliveryConfigured, validateContact } from '../services/contact.js'

const values = { name: ' Applicant ', email: ' person@example.com ', message: ' Hello ', website: '' }
const configured = { endpoint: '/api/contact', verified: true }

test('email drafts encode message content without introducing mail headers or extra recipients', () => {
  const draft = buildContactDraft({ ...values, message: 'Hello & thank you\nBcc: someone@example.com' }, 'paraslemar@gmail.com')
  const parsed = new URL(draft)
  assert.equal(parsed.protocol, 'mailto:')
  assert.equal(parsed.pathname, 'paraslemar@gmail.com')
  assert.equal(parsed.searchParams.get('subject'), 'Portfolio enquiry from Applicant')
  assert.equal(parsed.searchParams.get('bcc'), null)
  assert.match(parsed.searchParams.get('body'), /Hello & thank you\nBcc:/)
  assert.equal(buildContactDraft({ ...values, email: '' }, 'paraslemar@gmail.com'), null)
  assert.equal(buildContactDraft(values, null), null)
  assert.equal(buildContactDraft({ ...values, website: 'spam' }, 'paraslemar@gmail.com'), null)
})

test('empty or unsafe content never creates executable or placeholder links', () => {
  assert.equal(webUrl('javascript:alert(1)'), null)
  assert.equal(assetUrl('//untrusted.example/file.pdf'), null)
  assert.equal(assetUrl('/\\untrusted.example/file.pdf'), null)
  assert.equal(emailUrl('hello@example.com\nBcc:other@example.com'), null)
  assert.equal(webUrl('#'), null)
  assert.ok(profileLinks({}).every(link => link.href === null))
  assert.equal(assetUrl('/documents/resume.pdf'), '/documents/resume.pdf')
})

test('validation rejects whitespace-only required fields and malformed email', () => {
  assert.deepEqual(Object.keys(validateContact({ name: ' ', email: 'no-at-sign', message: '' })), ['name', 'email', 'message'])
  assert.deepEqual(validateContact(values), {})
  assert.ok(validateContact({ ...values, message: 'x'.repeat(5001) }).message)
})

test('delivery stays disabled until a same-origin endpoint is explicitly verified', () => {
  assert.equal(isDeliveryConfigured({ endpoint: '/api/contact', verified: false }), false)
  assert.equal(isDeliveryConfigured({ endpoint: 'https://example.com/send', verified: true }), false)
  assert.equal(isDeliveryConfigured({ endpoint: '//example.com/send', verified: true }), false)
  assert.equal(isDeliveryConfigured(configured), true)
})

test('preview validates but never sends a network request or claims delivery', async () => {
  let calls = 0
  const result = await deliverContact(values, {}, { fetcher: () => { calls++ } })
  assert.equal(result.kind, 'preview')
  assert.match(result.message, /has not been sent/)
  assert.equal(calls, 0)
})

test('invalid submissions and honeypot values cannot reach delivery', async () => {
  const fetcher = () => assert.fail('Unexpected delivery attempt')
  assert.equal((await deliverContact({ ...values, email: '' }, configured, { fetcher })).kind, 'invalid')
  assert.equal((await deliverContact({ ...values, website: 'spam' }, configured, { fetcher })).kind, 'error')
})

test('verified delivery sends only trimmed fields to the configured server route', async () => {
  const result = await deliverContact(values, configured, { fetcher: async (url, request) => {
    assert.equal(url, '/api/contact')
    assert.equal(request.method, 'POST')
    assert.equal(request.credentials, 'same-origin')
    assert.deepEqual(JSON.parse(request.body), { name: 'Applicant', email: 'person@example.com', message: 'Hello', website: '' })
    return { ok: true, json: async () => ({ delivered: true }) }
  } })
  assert.equal(result.kind, 'success')
})

test('HTTP success alone cannot produce a delivery-success state', async () => {
  const result = await deliverContact(values, configured, { fetcher: async () => ({ ok: true, json: async () => ({ accepted: true }) }) })
  assert.equal(result.kind, 'error')
})

test('rate limits, malformed responses, and aborted requests remain errors', async () => {
  const limited = await deliverContact(values, configured, { fetcher: async () => ({ ok: false, status: 429 }) })
  assert.match(limited.message, /Too many/)
  const malformed = await deliverContact(values, configured, { fetcher: async () => ({ ok: true, json: async () => { throw new Error('invalid JSON') } }) })
  assert.equal(malformed.kind, 'error')
  const aborted = await deliverContact(values, configured, { fetcher: async () => { throw Object.assign(new Error(), { name: 'AbortError' }) } })
  assert.equal(aborted.kind, 'error')
})

test('metadata omits unknown canonical URLs and social images', () => {
  const html = metadataHtml({ title: 'Name', description: 'Description', siteUrl: null, socialImage: null }, 'Name')
  assert.match(html, /og:title/)
  assert.doesNotMatch(html, /canonical|og:url|og:image|twitter:image/)
})

test('configured sharing image becomes absolute and metadata content is escaped', () => {
  const html = metadataHtml({ title: 'Name <&>', description: 'A "description"', siteUrl: 'https://portfolio.example/', socialImage: '/images/social.webp', socialImageAlt: 'Portfolio preview' }, 'Name')
  assert.match(html, /https:\/\/portfolio.example\/images\/social.webp/)
  assert.match(html, /Name &lt;&amp;&gt;/)
  assert.match(html, /A &quot;description&quot;/)
  assert.match(html, /summary_large_image/)
})
