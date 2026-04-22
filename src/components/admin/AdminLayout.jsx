import { NavLink, useNavigate } from 'react-router-dom'
import { logOut } from '../../firebase/auth'
import './AdminLayout.css'

const navItems = [
  { to: '/admin', label: 'Overview', icon: '⊞', end: true },
  { to: '/admin/submissions', label: 'Enquiries', icon: '✉' },
  { to: '/admin/locations', label: 'Locations', icon: '📍' },
  { to: '/admin/news', label: 'News', icon: '📰' },
  { to: '/admin/promotions', label: 'Promotions', icon: '🎉' },
]

export default function AdminLayout({ children }) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logOut()
    navigate('/admin')
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <span className="admin-sidebar__logo">Little Joy Play</span>
          <span className="admin-sidebar__tag">Admin</span>
        </div>

        <nav className="admin-sidebar__nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `admin-nav-item${isActive ? ' admin-nav-item--active' : ''}`
              }
            >
              <span className="admin-nav-item__icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-sidebar__link"
          >
            ↗ View site
          </a>
          <button className="admin-sidebar__logout" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </aside>

      <main className="admin-main">
        {children}
      </main>
    </div>
  )
}
