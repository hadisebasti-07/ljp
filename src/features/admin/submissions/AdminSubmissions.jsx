import { useState } from 'react'
import { useCollection } from '../../../hooks/useFirestore'
import { updateDocument } from '../../../firebase/firestore'
import { orderBy } from '../../../firebase/firestore'
import '../admin.css'

const STATUS_LABELS = { new: 'New', in_progress: 'In Progress', done: 'Done' }
const STATUS_BADGE = { new: 'admin-badge--new', in_progress: 'admin-badge--active', done: 'admin-badge--read' }

export default function AdminSubmissions() {
  const { data: submissions, loading } = useCollection('contact_submissions', [orderBy('createdAt', 'desc')])
  const [selected, setSelected] = useState(null)

  const updateStatus = async (id, status) => {
    await updateDocument('contact_submissions', id, { status })
  }

  if (loading) return <p>Loading…</p>

  return (
    <div>
      <h1 className="admin-page-title">Enquiries</h1>
      <p className="admin-page-sub">{submissions.length} total submissions from the contact form.</p>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: 20 }}>
        <div className="admin-card" style={{ padding: 0 }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Location</th>
                <th>Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr
                  key={s.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelected(s.id === selected?.id ? null : s)}
                >
                  <td style={{ fontWeight: 600 }}>{s.name}</td>
                  <td style={{ color: 'var(--color-gray)' }}>{s.email}</td>
                  <td>{s.location || '—'}</td>
                  <td style={{ color: 'var(--color-gray)', fontSize: 12 }}>
                    {s.createdAt?.toDate?.()?.toLocaleDateString('en-SG') || '—'}
                  </td>
                  <td>
                    <span className={`admin-badge ${STATUS_BADGE[s.status || 'new']}`}>
                      {STATUS_LABELS[s.status || 'new']}
                    </span>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <select
                      value={s.status || 'new'}
                      onChange={(e) => updateStatus(s.id, e.target.value)}
                      style={{ fontSize: 12, padding: '4px 8px', borderRadius: 6, border: '1px solid var(--color-border)' }}
                    >
                      <option value="new">New</option>
                      <option value="in_progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--color-gray)', padding: 40 }}>No submissions yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {selected && (
          <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'var(--font-heading)' }}>{selected.name}</h3>
              <button className="admin-btn admin-btn-ghost" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
              <Row label="Email" value={<a href={`mailto:${selected.email}`} style={{ color: 'var(--color-sage-dark)' }}>{selected.email}</a>} />
              <Row label="Phone" value={<a href={`tel:${selected.phone}`} style={{ color: 'var(--color-sage-dark)' }}>{selected.phone}</a>} />
              <Row label="Location" value={selected.location || '—'} />
              <Row label="Date" value={selected.createdAt?.toDate?.()?.toLocaleString('en-SG') || '—'} />
              {selected.message && (
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--color-gray)', marginBottom: 6 }}>Message</p>
                  <p style={{ background: 'var(--color-cream)', borderRadius: 8, padding: '12px 14px', lineHeight: 1.7, color: 'var(--color-charcoal)' }}>{selected.message}</p>
                </div>
              )}
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <a href={`mailto:${selected.email}`} className="admin-btn admin-btn-primary">Reply by email</a>
                <a href={`https://wa.me/${selected.phone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="admin-btn admin-btn-ghost">WhatsApp</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const Row = ({ label, value }) => (
  <div style={{ display: 'flex', gap: 12 }}>
    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--color-gray)', width: 70, flexShrink: 0, paddingTop: 1 }}>{label}</span>
    <span>{value}</span>
  </div>
)
