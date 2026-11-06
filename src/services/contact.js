import { emailUrl } from '../utils/content.js'

export function validateContact(values) {
  const errors = {}
  if (!values.name?.trim()) errors.name = 'Enter your name.'
  else if (values.name.trim().length > 120) errors.name = 'Use 120 characters or fewer.'
  if (!values.email?.trim()) errors.email = 'Enter your email address.'
  else if (values.email.trim().length > 254 || !emailUrl(values.email.trim())) errors.email = 'Enter a valid email address.'
  if (!values.message?.trim()) errors.message = 'Enter a message.'
  else if (values.message.trim().length > 5000) errors.message = 'Use 5,000 characters or fewer.'
  return errors
}

export function isDeliveryConfigured(config) {
  // Only same-origin server routes. No provider keys or arbitrary posting URLs.
  return config?.verified === true && typeof config.endpoint === 'string' && /^\/(?!\/)[\w/-]+$/.test(config.endpoint)
}

export function buildContactDraft(values, recipient) {
  const address = emailUrl(recipient)
  if (!address || Object.keys(validateContact(values)).length || values.website) return null
  const subject = `Portfolio enquiry from ${values.name.trim()}`
  const body = `Name: ${values.name.trim()}\nReply email: ${values.email.trim()}\n\n${values.message.trim()}`
  return `${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export async function deliverContact(values, config, { signal, fetcher = globalThis.fetch } = {}) {
  if (Object.keys(validateContact(values)).length) return { kind: 'invalid', message: 'Check the highlighted fields.' }
  if (values.website) return { kind: 'error', message: 'The request could not be accepted. Please try again.' }
  if (!isDeliveryConfigured(config)) return { kind: 'preview', message: 'Your fields are valid. Delivery is not connected, so your message has not been sent.' }
  try {
    const response = await fetcher(config.endpoint, {
      method: 'POST', credentials: 'same-origin', signal,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name: values.name.trim(), email: values.email.trim(), message: values.message.trim(), website: '' }),
    })
    if (!response.ok) return { kind: 'error', message: response.status === 429 ? 'Too many attempts. Please wait before trying again.' : 'Delivery failed. Please try again later. Your message is still here.' }
    const result = await response.json()
    if (result?.delivered !== true) return { kind: 'error', message: 'Delivery was not confirmed. Your message is still here; please try again later.' }
    return { kind: 'success', message: 'Your message was sent successfully. Thank you for reaching out.' }
  } catch (error) {
    return { kind: 'error', message: error.name === 'AbortError' ? 'The request was interrupted or timed out. Delivery could not be confirmed.' : 'Delivery could not be confirmed. Please try again later. Your message is still here.' }
  }
}
