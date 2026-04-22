import { Link } from 'react-router-dom'
import './AboutPages.css'

const values = [
  { icon: '💛', title: 'Joy-Centred', desc: 'We believe learning is most powerful when children are happy and engaged.' },
  { icon: '🌱', title: 'Child-Led', desc: 'We follow each child\'s natural curiosity and let them guide their own exploration.' },
  { icon: '🤝', title: 'Community', desc: 'We create spaces where children and parents connect, grow, and thrive together.' },
  { icon: '🎨', title: 'Holistic Development', desc: 'We nurture the whole child — cognitive, physical, emotional, and social growth.' },
]

export default function OurStoryPage() {
  return (
    <div className="about-page">

      <section className="page-hero">
        <div className="container">
          <p className="section-label">Who We Are</p>
          <h1 className="section-title">Our Story</h1>
          <p className="section-subtitle">
            Little Joy Play was born from a simple belief: that childhood is a precious time
            of wonder, and every child deserves to have their curiosity celebrated.
          </p>
        </div>
      </section>

      <section className="about-story">
        <div className="container about-story__inner">
          <div className="about-story__text">
            <h2 className="section-title">Celebrating the Joy<br />of Learning</h2>
            <p>
              Little Joy Play celebrates the joy of learning and the natural wonder children possess.
              We are dedicated to establishing an engaging, happiness-centred educational space that
              nurtures children's inherent curiosity, encourages exploration, and supports personalised
              learning development.
            </p>
            <p>
              We operate from the belief that all children can flourish when provided with appropriate
              resources and supportive settings. Our classes integrate storytelling, music, movement,
              and sensory exploration to stimulate cognitive development, enhance motor skills, build
              vocabulary, and foster the kind of curiosity that lasts a lifetime.
            </p>
            <p>
              From our humble beginnings to 4 locations across Singapore, our mission has never changed:
              to combine education with joy, and to make every session an adventure your child will
              look forward to.
            </p>
          </div>
          <div className="about-story__visual">
            <div className="about-story__quote">
              <blockquote>
                "Education combined with joy — because the two were never meant to be separate."
              </blockquote>
              <cite>— Little Joy Play</cite>
            </div>
          </div>
        </div>
      </section>

      <section className="about-mission">
        <div className="container">
          <p className="section-label">What We Stand For</p>
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            {values.map((v) => (
              <div key={v.title} className="value-card">
                <span className="value-card__icon">{v.icon}</span>
                <h3 className="value-card__title">{v.title}</h3>
                <p className="value-card__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-approach">
        <div className="container about-approach__inner">
          <div>
            <p className="section-label">How We Teach</p>
            <h2 className="section-title">Ignite the Spark<br />of Learning</h2>
            <p className="section-subtitle">
              Our approach is rooted in child-led learning and exploration. We combine education
              with joy through five core pillars — language, music, movement, art, and writing —
              woven into every session.
            </p>
            <Link to="/programmes" className="btn btn-primary" style={{ marginTop: 28 }}>Explore our programmes</Link>
          </div>
          <div className="approach-pillars">
            {[
              { icon: '📚', label: 'Language' },
              { icon: '🎵', label: 'Music' },
              { icon: '🏃', label: 'Movement' },
              { icon: '🎨', label: 'Art' },
              { icon: '✏️', label: 'Writing' },
            ].map((p) => (
              <div key={p.label} className="approach-pillar">
                <span>{p.icon}</span>
                <span>{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
