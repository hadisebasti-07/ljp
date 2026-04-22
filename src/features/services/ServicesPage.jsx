import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/common/SEO'
import { BOOKING_URL } from '../../constants'
import './ServicesPage.css'

const programmes = [
  {
    id: 'sensory-play',
    type: 'Signature Programme',
    name: 'Sensory Play',
    age: '8 months – 3 years',
    image: '/images/programmes/sensory-play.png',
    color: '#e8f6f7',
    accent: '#2c9da0',
    description: 'Our signature sensory play is an hour of parent-accompanied music, movement, storytelling, and sensory play. Our activities are designed to engage your child\'s senses and enhance fine motor skills. We encourage self-paced exploration, allowing their innate curiosity to guide their play.',
    highlights: [
      'All sensory materials meet food grade standards and are taste-safe',
      'Fresh and exciting new themes unveiled every month',
      'Parent-accompanied for bonding and confidence',
      'Music, movement, storytelling, and messy play',
    ],
  },
  {
    id: 'playgroup',
    type: 'Playgroup Programme',
    name: 'Playgroup Programme',
    age: '18 months – 4 years',
    image: '/images/programmes/playgroup.jpg',
    color: '#fef4f0',
    accent: '#f9a491',
    description: 'Our Playgroup runs 2–3 times a week, for 2.5 hours per session, offered as parent-accompanied or drop-off. It provides a warm, holistic environment that builds independence, confidence, and helps children transition smoothly into school.',
    highlights: [
      'Child-led, play-based learning',
      'Small group setting (4–6 children)',
      'Holistic learning environment',
      'Flexible parent-accompanied or drop-off',
    ],
    note: 'Parents or caregivers may accompany their child until they feel fully ready for independent drop-off. We\'ve seen many children transition smoothly, often with no tears on their first caregiver-free day — which is rarely seen in traditional school settings!',
  },
  {
    id: 'birthday',
    type: 'Private Event',
    name: 'Birthday Party or Private Event',
    age: 'All ages',
    image: '/images/programmes/birthday.jpg',
    color: '#f0f7ee',
    accent: '#5a7d5e',
    description: 'Whether it\'s a birthday celebration or an exclusive playdate, enjoy an unforgettable and enriching experience with us, right at your preferred location. Choose a theme your child loves, and we\'ll curate a personalised, engaging play experience for your precious little ones.',
    highlights: [
      'At your preferred location',
      'Fully customisable themes',
      'Personalised play experience',
      'Birthday parties & exclusive playdates',
    ],
  },
  {
    id: 'art-class',
    type: 'Drop-Off Class',
    name: 'Art Class',
    age: '3 – 6 years',
    image: '/images/programmes/art-class.jpg',
    color: '#fef3e2',
    accent: '#d4900a',
    description: 'A small-group art class where children explore the elements of art — colours, lines, shapes, texture, and more. They will discover different painting techniques and mediums through fun, hands-on, and engaging activities.',
    highlights: [
      'Drop-off class (3–6 years)',
      'Elements of art: colour, line, shape, texture',
      'Painting techniques and mixed mediums',
      'Small group, hands-on learning',
    ],
  },
  {
    id: 'little-readers',
    type: 'Language & Literacy',
    name: 'Little Readers & Writers',
    age: '3 – 6 years',
    image: '/images/programmes/little-readers.png',
    color: '#f2e8f5',
    accent: '#b57dc8',
    description: 'A small group holistic language programme covering letter recognition, blending for reading, segmenting for writing, vocabulary, sentence structure, and grammar — all incorporated into fun crafts, movement, sensory play, and games.',
    highlights: [
      'Phonics, letter recognition & early reading',
      'Writing segmenting & sentence building',
      'Vocabulary, grammar & language skills',
      'Fun crafts, movement & sensory games',
    ],
  },
]

const faqs = [
  {
    q: 'Are materials included in the fees?',
    a: 'Yes — all programme fees include materials and setup. You don\'t need to bring anything except your child and yourselves.',
  },
  {
    q: 'Can my child attend multiple times a week?',
    a: 'Absolutely. Multiple weekly attendance is permitted and many families find it beneficial for their child\'s development.',
  },
  {
    q: 'What if we miss a class?',
    a: 'Monthly subscribers receive one complimentary makeup class per month. Simply let us know in advance and we\'ll arrange an alternative slot.',
  },
  {
    q: 'What are Joy Packages?',
    a: 'Joy Packages are our ad hoc drop-in session option — perfect if you\'re not ready for a monthly commitment or want to try different locations.',
  },
  {
    q: 'Are the materials safe for my baby?',
    a: 'Yes, all sensory materials used in our classes meet food-grade safety standards, so even the youngest explorers can play safely.',
  },
  {
    q: 'What are the benefits of sensory play?',
    a: 'Sensory play stimulates brain development, supports sensory integration, develops fine motor skills, builds attention span, and fosters curiosity — all critical in the early years.',
  },
]

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="programmes-page">
      <SEO
        title="Our Programmes"
        description="Discover Little Joy Play's sensory play, playgroup, art, and literacy programmes for children aged 8 months to 6 years across Singapore."
        path="/services"
      />

      {/* Hero */}
      <section className="programmes-hero">
        <img src="/images/programmes/hero.jpg" alt="Little Joy Play programmes" className="programmes-hero__img" />
        <div className="programmes-hero__overlay">
          <div className="container">
            <p className="section-label" style={{ color: 'rgba(255,255,255,0.85)' }}>What We Offer</p>
            <h1 className="programmes-hero__title">Our Programmes</h1>
            <p className="programmes-hero__sub">
              Play-based, child-led learning experiences for children from 8 months to 6 years.
              Every class is designed to nurture curiosity and spark joy.
            </p>
          </div>
        </div>
      </section>

      {/* Programme Detail */}
      <section className="programmes-detail">
        <div className="container">
          {programmes.map((p, i) => (
            <div
              key={p.id}
              className={`prog-detail${i % 2 === 1 ? ' prog-detail--reverse' : ''}`}
              style={{ '--prog-color': p.color, '--prog-accent': p.accent }}
            >
              <div className="prog-detail__visual">
                <img
                  src={p.image}
                  alt={p.name}
                  className="prog-detail__photo"
                />
              </div>

              <div className="prog-detail__text">
                <span className="prog-detail__type">{p.type}</span>
                <h2 className="prog-detail__name">{p.name}</h2>
                <p className="prog-detail__age-badge">{p.age}</p>
                <p className="prog-detail__desc">{p.description}</p>

                <div className="prog-detail__highlights">
                  {p.highlights.map((h) => (
                    <div key={h} className="highlight-item">
                      <span className="highlight-check">✓</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {p.note && (
                  <div className="prog-detail__note">
                    <p>{p.note}</p>
                  </div>
                )}

                {p.id === 'birthday' ? (
                  <Link to="/contact" className="btn btn-primary" style={{ marginTop: 28 }}>
                    Get a quote
                  </Link>
                ) : (
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ marginTop: 28 }}
                  >
                    Book a trial
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="services-faq">
        <div className="container">
          <p className="section-label">Got Questions?</p>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div
                key={i}
                className={`faq-item${openFaq === i ? ' faq-item--open' : ''}`}
              >
                <button
                  className="faq-item__q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{f.q}</span>
                  <span className="faq-item__arrow">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <p className="faq-item__a">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
