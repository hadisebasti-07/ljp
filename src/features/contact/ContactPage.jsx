import { useState } from 'react'
import { addDocument } from '../../firebase/firestore'
import { BOOKING_URL, WHATSAPP_EAST, WHATSAPP_WEST } from '../../constants'
import SEO from '../../components/common/SEO'
import LocationMap from '../../components/common/LocationMap'
import './ContactPage.css'

const locations = [
  { name: 'Upper Bukit Timah', address: 'Jalan Layang Layang, Singapore 598486' },
  { name: 'Trehaus @ Funan Mall', address: 'North Bridge Road Lift Lobby A, Singapore 179097' },
  { name: 'East Coast Commune', address: '1000 ECP, #01-03, Singapore 449876' },
  { name: 'Pasir Ris', address: 'Blk 528B Street 51, Singapore 512528' },
]

const INITIAL = { name: '', phone: '', email: '', location: '', message: '' }

export default function ContactPage() {
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await addDocument('contact_submissions', form)
      setStatus('success')
      setForm(INITIAL)
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="contact-page">
      <SEO
        title="Contact Us"
        description="Get in touch with Little Joy Play. Book a trial class, enquire about private sessions, or find your nearest location across Singapore."
        path="/contact"
      />

      <section className="page-hero">
        <div className="container">
          <p className="section-label">Say Hello</p>
          <h1 className="section-title">Contact Us</h1>
          <p className="section-subtitle">
            We'd love to hear from you. Book a trial, ask a question, or enquire about
            private sessions — we'll get back to you promptly.
          </p>
        </div>
      </section>

      {/* Quick action cards */}
      <section className="contact-quick">
        <div className="container contact-quick__grid">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="quick-card quick-card--primary">
            <div className="quick-card__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <div>
              <p className="quick-card__title">Book a trial class</p>
              <p className="quick-card__desc">Instant confirmation on list.sg →</p>
            </div>
          </a>

          <a href={WHATSAPP_EAST} target="_blank" rel="noopener noreferrer" className="quick-card quick-card--whatsapp">
            <div className="quick-card__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.847L.057 23.716a.5.5 0 0 0 .63.63l5.87-1.47A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.848 0-3.577-.504-5.065-1.382l-.363-.215-3.761.941.96-3.761-.233-.375A9.953 9.953 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
            </div>
            <div>
              <p className="quick-card__title">WhatsApp — East</p>
              <p className="quick-card__desc">+65 9646 4295 →</p>
            </div>
          </a>

          <a href={WHATSAPP_WEST} target="_blank" rel="noopener noreferrer" className="quick-card quick-card--whatsapp">
            <div className="quick-card__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.847L.057 23.716a.5.5 0 0 0 .63.63l5.87-1.47A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.848 0-3.577-.504-5.065-1.382l-.363-.215-3.761.941.96-3.761-.233-.375A9.953 9.953 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
            </div>
            <div>
              <p className="quick-card__title">WhatsApp — West</p>
              <p className="quick-card__desc">+65 9820 4155 →</p>
            </div>
          </a>
        </div>
      </section>

      <section className="contact-body">
        <div className="container contact-body__inner">

          {/* Form */}
          <div className="contact-form-wrap">
            <h2 className="contact-form-wrap__title">Send us a message</h2>

            {status === 'success' ? (
              <div className="contact-success">
                <span>✓</span>
                <h3>Message sent!</h3>
                <p>Thank you for reaching out. We'll be in touch within 1 business day.</p>
                <button className="btn btn-outline" onClick={() => setStatus('idle')}>Send another</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name <span className="required">*</span></label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+65 XXXX XXXX"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email <span className="required">*</span></label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="location">Preferred Location</label>
                  <select
                    id="location"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                  >
                    <option value="">Select a location (optional)</option>
                    {locations.map((l) => (
                      <option key={l.name} value={l.name}>{l.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us about your child's age, what you're looking for, or any questions..."
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                {status === 'error' && (
                  <p className="form-error">Something went wrong. Please try again or email us directly.</p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary form-submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="contact-info">
            <div className="contact-info__block">
              <h3 className="contact-info__heading">Get in touch</h3>
              <a href="mailto:hello@littlejoyplay.sg" className="contact-info__link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                hello@littlejoyplay.sg
              </a>
              <a href="tel:+6596464295" className="contact-info__link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.4 2 2 0 0 1 3.59 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.1 6.1l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.72 16.9z"/>
                </svg>
                East: (+65) 9646 4295
              </a>
              <a href="tel:+6598204155" className="contact-info__link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.4 2 2 0 0 1 3.59 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.1 6.1l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.72 16.9z"/>
                </svg>
                West: (+65) 9820 4155
              </a>
              <a
                href="https://www.instagram.com/littlejoyplay"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info__link"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                @littlejoyplay
              </a>
            </div>

            <div className="contact-info__block">
              <h3 className="contact-info__heading">Business Hours</h3>
              <div className="contact-hours">
                <div><span>Weekdays</span><span>9am – 5pm</span></div>
                <div><span>Saturday</span><span>10am – 3pm</span></div>
                <div><span>Sunday</span><span>Closed</span></div>
              </div>
            </div>

            <div className="contact-info__block">
              <h3 className="contact-info__heading">Our Locations</h3>
              <div className="contact-locations">
                {locations.map((l) => (
                  <div key={l.name} className="contact-location">
                    <p className="contact-location__name">{l.name}</p>
                    <p className="contact-location__address">{l.address}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Maps */}
      <section className="contact-maps">
        <div className="container">
          <h2 className="contact-maps__title">Find Us</h2>
          <LocationMap />
        </div>
      </section>

    </div>
  )
}
