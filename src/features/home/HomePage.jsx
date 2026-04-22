import { Link } from 'react-router-dom'
import { BOOKING_URL } from '../../constants'
import SEO from '../../components/common/SEO'
import './HomePage.css'

const programmes = [
  {
    name: 'Sensory Play',
    type: 'Signature Programme',
    desc: 'An hour of parent-accompanied music, movement, storytelling, and sensory play. Fresh themes every month, with all materials food grade and taste-safe.',
    age: '8 months – 3 years',
    color: '#e8f6f7',
    image: '/images/programmes/sensory-play.png',
  },
  {
    name: 'Playgroup Programme',
    type: 'Playgroup',
    desc: 'A warm, holistic environment running 2–3 times a week that builds independence, confidence, and helps children transition smoothly into school.',
    age: '18 months – 4 years',
    color: '#fef4f0',
    image: '/images/programmes/playgroup.jpg',
  },
  {
    name: 'Art Class',
    type: 'Drop-Off Class',
    desc: 'A small-group class where children explore colours, lines, shapes, and texture through different painting techniques and hands-on mediums.',
    age: '3 – 6 years',
    color: '#fef3e2',
    image: '/images/programmes/art-class.jpg',
  },
  {
    name: 'Little Readers & Writers',
    type: 'Language & Literacy',
    desc: 'Phonics, early reading, and writing brought to life through crafts, movement, sensory play, and games in a small group setting.',
    age: '3 – 6 years',
    color: '#f2e8f5',
    image: '/images/programmes/little-readers.png',
  },
]

const locations = [
  { name: 'Upper Bukit Timah', address: 'Jalan Layang Layang, Singapore 598486' },
  { name: 'Trehaus @ Funan Mall', address: 'North Bridge Road Lift Lobby A, Singapore 179097' },
  { name: 'East Coast Commune', address: '1000 ECP, #01-03, Singapore 449876' },
  { name: 'Pasir Ris', address: 'Blk 528B Street 51, Singapore 512528' },
]

export default function HomePage() {
  return (
    <div className="home">
      <SEO
        path="/"
        description="Little Joy Play offers play-based sensory classes and literacy programmes for children aged 8 months to 6 years across 4 locations in Singapore. Book a trial today."
      />

      {/* Hero */}
      <section className="hero">
        <div className="hero__content container">
          <p className="section-label">Welcome to Little Joy Play</p>
          <h1 className="hero__title">Spark your child's<br /><em>imagination</em> with us</h1>
          <p className="hero__sub">Are you up for the adventure?</p>
          <div className="hero__actions">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary hero__cta">
              Join a group
            </a>
            <Link to="/services" className="btn btn-outline hero__cta">
              Our programmes
            </Link>
          </div>
        </div>
        <div className="hero__decoration">
          <div className="hero__blob hero__blob--1" />
          <div className="hero__blob hero__blob--2" />
        </div>
      </section>

      {/* Book now strip */}
      <div className="booking-strip">
        <div className="container booking-strip__inner">
          <p>Book classes directly online — instant confirmation, no waiting</p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary booking-strip__btn">
            Book on list.sg →
          </a>
        </div>
      </div>

      {/* Programmes */}
      <section className="programmes-preview">
        <div className="container">
          <div className="programmes-preview__header">
            <p className="section-label">Our Programmes</p>
            <h2 className="section-title">Play-based learning<br />for every stage</h2>
          </div>
          <div className="programmes-preview__grid">
            {programmes.map((p) => (
              <div key={p.name} className="prog-card" style={{ '--card-bg': p.color }}>
                <div className="prog-card__img-wrap">
                  <img src={p.image} alt={p.name} className="prog-card__img" />
                </div>
                <div className="prog-card__body">
                  <div className="prog-card__type">{p.type}</div>
                  <h3 className="prog-card__name">{p.name}</h3>
                  <p className="prog-card__age">{p.age}</p>
                  <p className="prog-card__desc">{p.desc}</p>
                  <div className="prog-card__actions">
                    <Link to="/services" className="prog-card__link">Learn more →</Link>
                    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="prog-card__book">Book trial</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="programmes-preview__cta">
            <Link to="/services" className="btn btn-outline">View all programmes</Link>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="philosophy">
        <div className="container philosophy__inner">
          <div className="philosophy__text">
            <p className="section-label">Our Approach</p>
            <h2 className="section-title">Ignite the Spark<br />of Learning</h2>
            <p className="section-subtitle">
              We believe in child-led learning and exploration — combining education with joy
              through language, music, movement, art, and writing activities.
            </p>
            <p className="section-subtitle" style={{ marginTop: 16 }}>
              Every child is naturally curious. We celebrate that wonder, nurture it, and give
              each child the space to flourish at their own pace.
            </p>
            <Link to="/about" className="btn btn-primary" style={{ marginTop: 32 }}>Our Story</Link>
          </div>
          <div className="philosophy__pillars">
            {['Language', 'Music', 'Movement', 'Art', 'Writing'].map((p) => (
              <div key={p} className="pillar">{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Private Sessions */}
      <section className="private-sessions">
        <div className="container">
          <div className="private-sessions__card">
            <div className="private-sessions__text">
              <p className="section-label" style={{ color: 'var(--color-coral)' }}>Exclusive Events</p>
              <h2 className="section-title">Book a <em>Private</em> Session</h2>
              <p className="section-subtitle">
                Whether it is a birthday party or an exclusive play date, have an unforgettable
                and enriching time at your preferred location. Themes are fully customizable to
                make every celebration uniquely yours.
              </p>
              <Link to="/contact" className="btn btn-coral" style={{ marginTop: 28 }}>Get a quote</Link>
            </div>
            <div className="private-sessions__visual">
              <div className="private-sessions__blob" />
              <div className="private-sessions__tags">
                <span>Birthday Parties 🎂</span>
                <span>Exclusive Playdates 🎈</span>
                <span>Custom Themes ✨</span>
                <span>Any Location 📍</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="locations-section">
        <div className="container">
          <div className="locations-section__header">
            <p className="section-label">Find Us</p>
            <h2 className="section-title">Multiple Locations Across Singapore</h2>
          </div>
          <div className="locations-grid">
            {locations.map((loc) => (
              <div key={loc.name} className="location-card">
                <div className="location-card__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <h3 className="location-card__name">{loc.name}</h3>
                <p className="location-card__address">{loc.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <div>
            <h2 className="cta-banner__title">Ready to begin the adventure?</h2>
            <p className="cta-banner__sub">Book a trial class and see your child light up.</p>
          </div>
          <div className="cta-banner__actions">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Book a trial
            </a>
            <Link to="/contact" className="btn btn-outline cta-banner__enquire">
              Enquire instead
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
