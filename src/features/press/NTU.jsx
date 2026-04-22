import { Link } from 'react-router-dom'
import SEO from '../../components/common/SEO'
import './NTU.css'

export default function NTU() {
  return (
    <div className="ntu-page">
      <SEO
        title="Featured by NTU NIE | Little Joy Play"
        description="Little Joy Play was featured by NTU's National Institute of Education, highlighting the rise in demand for sensory play and child-led activities in Singapore."
        path="/press/ntu-nie"
      />

      <div className="ntu-page__hero">
        <div className="ntu-page__hero-inner">
          <Link to="/news" className="ntu-page__back">← Back to News</Link>
          <div className="ntu-page__badge">Press Feature</div>
          <h1 className="ntu-page__title">
            Featured by <span>NTU National Institute of Education</span>
          </h1>
          <p className="ntu-page__subtitle">
            Little Joy Play was cited by NTU's National Institute of Education — Singapore's
            leading teacher education institution — in an article spotlighting the growing
            importance of sensory play in early childhood development.
          </p>
          <a
            href="https://www.ntu.edu.sg/nie/news-events/news/detail/sensory-play--rise-in-demand-for-fun--messy-child-led-activities"
            target="_blank"
            rel="noopener noreferrer"
            className="ntu-page__read-btn"
          >
            Read the full article on ntu.edu.sg →
          </a>
        </div>
      </div>

      <div className="ntu-page__body">

        <div className="ntu-page__image-wrap">
          <img
            src="/images/press/ntu_ljp.png"
            alt="Little Joy Play featured by NTU NIE"
            className="ntu-page__image"
          />
          <div className="ntu-page__source">
            <span className="ntu-page__source-label">As featured by</span>
            <span className="ntu-page__source-name">NTU · National Institute of Education</span>
          </div>
        </div>

        <div className="ntu-page__message">
          <div className="ntu-page__what">
            <p className="ntu-page__section-label">What This Means</p>
            <h2 className="ntu-page__section-title">Academic Recognition of Sensory Play</h2>
            <p>
              Being featured by NTU's National Institute of Education — the institution responsible
              for training Singapore's teachers — is a meaningful endorsement of the work we do at
              Little Joy Play.
            </p>
            <p>
              The article highlights the rise in demand for sensory play, child-led activities, and
              the importance of messy, hands-on learning in early childhood. This aligns deeply with
              our philosophy: that children learn best when they are free to explore, discover, and
              create at their own pace.
            </p>
            <p>
              We are honoured to be recognised alongside Singapore's education community and remain
              committed to bringing the very best play-based learning experiences to your little ones.
            </p>
          </div>

          <div className="ntu-page__sign">
            <p>With Love,</p>
            <p><strong>Ms. Indri and Ms. Meyi</strong></p>
            <p>Founders of Little Joy Play</p>
          </div>
        </div>

      </div>
    </div>
  )
}
