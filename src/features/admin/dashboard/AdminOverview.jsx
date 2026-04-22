import { useEffect, useState } from 'react'
import { getCollection } from '../../../firebase/firestore'
import '../../admin/admin.css'

export default function AdminOverview() {
  const [counts, setCounts] = useState({ submissions: 0, locations: 0, news: 0 })

  useEffect(() => {
    Promise.all([
      getCollection('contact_submissions'),
      getCollection('locations'),
      getCollection('posts'),
    ]).then(([subs, locs, posts]) => {
      setCounts({
        submissions: subs.size,
        locations: locs.size,
        news: posts.size,
      })
    })
  }, [])

  const stats = [
    { label: 'Enquiries', value: counts.submissions, icon: '✉', link: '/admin/submissions', color: '#e8f2e8' },
    { label: 'Locations', value: counts.locations, icon: '📍', link: '/admin/locations', color: '#f2e8f5' },
    { label: 'News Posts', value: counts.news, icon: '📰', link: '/admin/news', color: '#fef3e2' },
  ]

  return (
    <div>
      <h1 className="admin-page-title">Overview</h1>
      <p className="admin-page-sub">Welcome back. Here's what's happening on the site.</p>

      <div className="admin-stats-grid">
        {stats.map((s) => (
          <a key={s.label} href={s.link} className="admin-stat-card" style={{ '--stat-bg': s.color }}>
            <span className="admin-stat-card__icon">{s.icon}</span>
            <div>
              <p className="admin-stat-card__value">{s.value}</p>
              <p className="admin-stat-card__label">{s.label}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="admin-card" style={{ marginTop: 32 }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: 12 }}>Quick Links</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="/admin/locations" className="admin-btn admin-btn-ghost">Manage locations</a>
          <a href="/admin/submissions" className="admin-btn admin-btn-ghost">View enquiries</a>
          <a href="/admin/news" className="admin-btn admin-btn-ghost">Write news post</a>
          <a href="/admin/promotions" className="admin-btn admin-btn-ghost">Add promotion</a>
          <a href="/" target="_blank" rel="noopener noreferrer" className="admin-btn admin-btn-ghost">↗ View live site</a>
        </div>
      </div>
    </div>
  )
}
