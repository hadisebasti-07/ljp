import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { BOOKING_URL } from '../../constants'
import './Header.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
    setAboutOpen(false)
  }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="header__inner container">
        <Link to="/" className="header__logo">
          <span className="header__logo-text">Little Joy Play</span>
        </Link>

        <nav className={`header__nav${menuOpen ? ' header__nav--open' : ''}`}>
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'} end>
            Home
          </NavLink>

          <div
            className="nav-dropdown"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <button
              className={`nav-link nav-link--dropdown${location.pathname.startsWith('/about') || location.pathname === '/news' ? ' nav-link--active' : ''}`}
              onClick={() => setAboutOpen((v) => !v)}
            >
              About <span className="dropdown-arrow">▾</span>
            </button>
            {aboutOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-menu__inner">
                  <NavLink to="/about" className="dropdown-item">Our Story</NavLink>
                  <NavLink to="/news" className="dropdown-item">News</NavLink>
                </div>
              </div>
            )}
          </div>

          <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}>
            Programmes
          </NavLink>

          <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}>
            Contact
          </NavLink>
        </nav>

        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary header__cta">Book a trial</a>

        <button
          className={`header__burger${menuOpen ? ' header__burger--open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
