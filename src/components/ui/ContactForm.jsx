import { useEffect, useRef, useState } from 'react'
import { contactDelivery, profile } from '../../data/portfolio'
import { buildContactDraft, deliverContact, isDeliveryConfigured, validateContact } from '../../services/contact'
import Arrow from './Arrow'

export default function ContactForm() {
  const [errors, setErrors] = useState({})
  const [result, setResult] = useState(null)
  const [sending, setSending] = useState(false)
  const [preparedDraft, setPreparedDraft] = useState(null)
  const [copyStatus, setCopyStatus] = useState('')
  const draftText = useRef(null)
  const addressText = useRef(null)
  const form = useRef(null)
  const request = useRef(null)
  const mounted = useRef(false)
  const configured = isDeliveryConfigured(contactDelivery)
  useEffect(() => {
    mounted.current = true
    return () => { mounted.current = false; request.current?.abort() }
  }, [])

  async function submit(event) {
    event.preventDefault()
    if (request.current) return
    const values = Object.fromEntries(new FormData(event.currentTarget))
    const nextErrors = validateContact(values)
    setErrors(nextErrors)
    setResult(null)
    setPreparedDraft(null)
    setCopyStatus('')
    if (Object.keys(nextErrors).length) {
      form.current.elements.namedItem(Object.keys(nextErrors)[0])?.focus()
      return
    }
    if (!configured) {
      const draft = buildContactDraft(values, profile.email)
      if (!draft) { setResult({ kind: 'error', message: 'The email draft could not be prepared. Please use the email link.' }); return }
      const parsed = new URL(draft)
      setPreparedDraft(`Subject: ${parsed.searchParams.get('subject')}\n\n${parsed.searchParams.get('body')}`)
      try {
        window.location.assign(draft)
        setResult({ kind: 'preview', message: 'Email app requested. Review and send the draft there; this website has not sent a message.' })
      } catch {
        setResult({ kind: 'error', message: 'Your email app could not be opened. Copy the draft below and send it from your email service.' })
      }
      return
    }
    const controller = new AbortController()
    request.current = controller
    if (configured) setSending(true)
    const timeout = setTimeout(() => controller.abort(), 12000)
    try {
      const feedback = await deliverContact(values, contactDelivery, { signal: controller.signal })
      if (mounted.current) setResult(feedback)
    } finally {
      clearTimeout(timeout)
      request.current = null
      if (mounted.current) setSending(false)
    }
  }

  async function copyText(value, label, target) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(value)
      if (mounted.current) setCopyStatus(`${label} copied.`)
    } catch {
      if (!mounted.current) return
      target.current?.focus()
      target.current?.select()
      setCopyStatus('Clipboard unavailable. The text is selected; copy it manually.')
    }
  }

  function field(name, label, { type = 'text', placeholder, maxLength, autoComplete, multiline = false }) {
    const id = `contact-${name}`
    const attributes = { id, name, required: true, placeholder, maxLength, autoComplete,
      'aria-invalid': errors[name] ? true : undefined, 'aria-describedby': errors[name] ? `${id}-error` : undefined }
    return <div className="contact-field"><label htmlFor={id}>{label}</label>
      {multiline ? <textarea {...attributes} rows="3"/> : <input {...attributes} type={type}/>}
      {errors[name] && <p id={`${id}-error`} className="field-error">{errors[name]}</p>}
    </div>
  }

  return <form ref={form} className="contact-form" onSubmit={submit} noValidate data-reveal aria-labelledby="contact-form-title" aria-describedby="contact-notice" aria-busy={sending}>
    <h3 className="form-heading" id="contact-form-title">Write a message.</h3>
    <p id="contact-notice" className="form-notice">{configured ? 'Send a message using the contact form.' : 'Your message will open in your email app.'}</p>
    {Object.keys(errors).length > 0 && <p role="alert" className="field-error form-error-summary">Please check the highlighted fields. Nothing has been sent.</p>}
    <fieldset disabled={sending} onChange={() => {
      // A prepared draft is a snapshot; editing must invalidate its copy fallback.
      setPreparedDraft(null)
      setCopyStatus('')
      setResult(null)
    }}>
      <legend className="visually-hidden">Contact details and message</legend>
      <div className="form-row">
        {field('name', 'Name', { placeholder: 'Your name', maxLength: 120, autoComplete: 'name' })}
        {field('email', 'Email address', { type: 'email', placeholder: 'you@example.com', maxLength: 254, autoComplete: 'email' })}
      </div>
      {field('message', 'Message', { placeholder: 'How can I help?', maxLength: 5000, multiline: true })}
      <div className="contact-trap" aria-hidden="true"><label htmlFor="contact-website">Leave this field blank<input id="contact-website" name="website" tabIndex={-1} autoComplete="off"/></label></div>
      <div className="form-bottom">
        <button className="button button-primary" type="submit">{sending ? 'Sending…' : configured ? 'Send message' : 'Continue to Email'}<Arrow/></button>
      </div>
    </fieldset>
    <p role="status" aria-live="polite" aria-atomic="true" className={`form-status${result?.kind === 'error' ? ' field-error' : ''}`}>{sending ? 'Sending your message…' : result?.message || ''}</p>
    {preparedDraft && <details className="email-fallback" open={result?.kind === 'error' || undefined}>
      <summary>No email app? Copy your draft</summary>
      <p>Copy these details into your email service. Your form entries are still here.</p>
      <label htmlFor="fallback-address">Send to</label>
      <input ref={addressText} id="fallback-address" readOnly value={profile.email} />
      <label htmlFor="fallback-draft">Prepared email draft</label>
      <textarea ref={draftText} id="fallback-draft" readOnly value={preparedDraft} rows="5" />
      <div className="fallback-actions">
        <button type="button" className="copy-button" onClick={() => copyText(profile.email, 'Email address', addressText)}>Copy email address</button>
        <button type="button" className="copy-button" onClick={() => copyText(preparedDraft, 'Draft', draftText)}>Copy draft</button>
      </div>
      <p role="status" aria-live="polite" aria-atomic="true" className="copy-status">{copyStatus}</p>
    </details>}
  </form>
}
