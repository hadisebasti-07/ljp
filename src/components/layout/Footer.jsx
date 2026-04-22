import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <img src="/images/logo/ljp_logo.png" alt="Little Joy Play" className="footer__logo-img" />
          </Link>
          <p className="footer__tagline">Spark your child's imagination with us.</p>
          <a
            href="https://www.instagram.com/littlejoyplay"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__instagram"
            aria-label="Instagram"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="3.5"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
            @littlejoyplay
          </a>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <h4 className="footer__col-title">Navigate</h4>
            <Link to="/">Home</Link>
            <Link to="/about">Our Story</Link>
            <Link to="/news">News</Link>
            <Link to="/services">Programmes</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Programmes</h4>
            <Link to="/services">Little Bubs</Link>
            <Link to="/services">Little Explorers</Link>
            <Link to="/services">Little Readers & Writers</Link>
            <Link to="/contact">Private Sessions</Link>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Get in Touch</h4>
            <a href="mailto:hello@littlejoyplay.sg">hello@littlejoyplay.sg</a>
            <a href="tel:+6596464295">East: (+65) 9646 4295</a>
            <a href="tel:+6598204155">West: (+65) 9820 4155</a>
            <p className="footer__hours">Weekdays 9am – 5pm<br />Saturday 10am – 3pm</p>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>Copyright © {new Date().getFullYear()} Little Joy Play. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
