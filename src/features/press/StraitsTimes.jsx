import { Link } from 'react-router-dom'
import SEO from '../../components/common/SEO'
import './StraitsTimes.css'

export default function StraitsTimes() {
  return (
    <div className="st-page">
      <SEO
        title="Featured in The Straits Times | Little Joy Play"
        description="Little Joy Play was featured in The Straits Times Life Parenting section on 21 April 2025, highlighting the rise in demand for sensory play in Singapore."
        path="/press/straits-times"
      />

      <div className="st-page__hero">
        <div className="container st-page__hero-inner">
          <Link to="/news" className="st-page__back">← Back to News</Link>
          <div className="st-page__badge">Press Feature</div>
          <h1 className="st-page__title">
            We are featured in<br />
            <span>The Straits Times</span> 🥳
          </h1>
          <p className="st-page__date">21 April 2025 · Life Parenting Section</p>
        </div>
      </div>

      <div className="st-page__body">

        <div className="st-page__image-wrap">
          <img src="/images/press/st_ljp.jpg" alt="Little Joy Play featured in The Straits Times" className="st-page__image" />
          <a
            href="https://www.straitstimes.com/singapore/parenting-education/sensory-play-rise-in-demand-for-fun-messy-child-led-activities"
            target="_blank"
            rel="noopener noreferrer"
            className="st-page__read-article"
          >
            Read the full article on straitstimes.com →
          </a>
        </div>

        <div className="st-page__message">
          <p>
            Thank you <strong>@straits_times</strong> for featuring us in the Life Parenting section.
            We are elated that there is more awareness brought to parents of the benefits of sensory
            play to their children.
          </p>
          <p>
            Thank you to our followers and Little Joy Play families who support and believe in what
            we are doing. We truly celebrate the joy of learning and the natural wonder your children
            possess. We are so excited to bring more holistic fun learning to your little ones 🤗
          </p>
          <div className="st-page__sign">
            <p>With Love,</p>
            <p><strong>Ms. Indri and Ms. Meyi</strong></p>
            <p>Founders of Little Joy Play</p>
          </div>
        </div>

      </div>
    </div>
  )
}
