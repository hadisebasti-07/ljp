import { Link } from 'react-router-dom'
import SEO from '../../components/common/SEO'
import { BOOKING_URL } from '../../constants'
import './SassyMama.css'

const programmes = [
  {
    icon: '🎵',
    title: 'Music and Movement',
    desc: 'Enhance your child\'s coordination and rhythm in a fun and interactive environment.',
  },
  {
    icon: '📖',
    title: 'Storytelling',
    desc: 'Foster your child\'s imagination and language skills through captivating stories.',
  },
  {
    icon: '🎨',
    title: 'Sensory Messy Play',
    desc: 'Encourage exploration and creativity with hands-on, sensory-rich activities.',
  },
]

export default function SassyMama() {
  return (
    <div className="sm-page">
      <SEO
        title="Featured in Sassy Mama Singapore | Little Joy Play"
        description="Little Joy Play was featured in Sassy Mama's Guide to Baby Classes & Playgroups in Singapore, recognised for enriching sensory play experiences for children."
        path="/press/sassy-mama"
      />

      <div className="sm-page__hero">
        <div className="sm-page__hero-inner">
          <Link to="/news" className="sm-page__back">← Back to News</Link>
          <div className="sm-page__badges">
            <div className="sm-page__badge">Press Feature</div>
          </div>
          <h1 className="sm-page__title">
            Top Baby Classes In Singapore<br />Featured By <span>Sassy Mama</span>
          </h1>
          <p className="sm-page__subtitle">
            Exciting News: Little Joy Play Shines in Sassy Mama's Guide to Baby Classes &amp; Playgroups in Singapore!
          </p>
          <a
            href="https://www.sassymamasg.com/learn-best-baby-classes-singapore-updated/"
            target="_blank"
            rel="noopener noreferrer"
            className="sm-page__read-btn"
          >
            Read the full article →
          </a>
        </div>
      </div>

      <div className="sm-page__body">

        <section className="sm-page__intro">
          <div className="sm-page__image-wrap">
            <img src="/images/press/sassy_ljp.png" alt="Little Joy Play featured in Sassy Mama Singapore" className="sm-page__image" />
            <div className="sm-page__logo-wrap">
              <span className="sm-page__featured-by">As featured in</span>
              <img src="/images/press/sassy-logo-sg.webp" alt="Sassy Mama Singapore" className="sm-page__sassy-logo" />
            </div>
          </div>

          <div className="sm-page__intro-text">
            <p>
              We are thrilled to announce that Little Joy Play has been proudly featured in Sassy Mama's
              highly coveted article, <em>"Guide to Baby Classes &amp; Playgroups in Singapore."</em> This
              recognition underscores our relentless commitment to providing the most engaging and enriching
              sensory play experiences for your little ones.
            </p>
          </div>
        </section>

        <section className="sm-page__programmes">
          <p className="sm-page__section-label">Why Little Joy Play</p>
          <h2 className="sm-page__section-title">Why Little Joy Play is the Best Choice!</h2>
          <p className="sm-page__section-sub">
            At Little Joy Play, we offer a variety of programmes designed to cater to your child's developmental needs:
          </p>
          <div className="sm-page__prog-grid">
            {programmes.map((p) => (
              <div key={p.title} className="sm-page__prog-card">
                <span className="sm-page__prog-icon">{p.icon}</span>
                <h3 className="sm-page__prog-title">{p.title}</h3>
                <p className="sm-page__prog-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="sm-page__community">
          <div className="sm-page__community-inner">
            <div className="sm-page__community-text">
              <p className="sm-page__section-label">Join Us</p>
              <h2 className="sm-page__section-title">Join the Little Joy Play Community</h2>
              <p>
                Bringing your baby to one of our organised playgroups is a fantastic way for them to learn
                and explore while you connect with other parents. Our playgroups are thoughtfully designed
                to ensure every child has a joyful and educational experience.
              </p>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary sm-page__cta">
                Book a trial class
              </a>
            </div>
          </div>
        </section>

        <section className="sm-page__thanks">
          <div className="sm-page__thanks-inner">
            <span className="sm-page__thanks-icon">🙏</span>
            <h2 className="sm-page__section-title">A Huge Thanks to Sassy Mama!</h2>
            <p>
              We extend our heartfelt thanks to Sassy Mama for highlighting Little Joy Play and recognising
              the incredible value we bring to the community. Don't miss out — check out the full article
              to discover why we are among the best baby classes and playgroups in Singapore.
            </p>
            <a
              href="https://www.sassymamasg.com/learn-best-baby-classes-singapore-updated/"
              target="_blank"
              rel="noopener noreferrer"
              className="sm-page__article-link"
            >
              Read the Sassy Mama article →
            </a>
          </div>
        </section>

      </div>
    </div>
  )
}
