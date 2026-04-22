import { useState } from 'react'
import { useCollection } from '../../../hooks/useFirestore'
import { addDocument, updateDocument, deleteDocument } from '../../../firebase/firestore'
import '../admin.css'

const EMPTY = { message: '', ctaLabel: '', ctaUrl: '', isActive: true, startDate: '', endDate: '' }

export default function AdminPromotions() {
  const { data: promos, loading } = useCollection('promotions')
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('')

  const openNew = () => { setForm(EMPTY); setEditing('new') }
  const openEdit = (p) => { setForm({ ...p }); setEditing(p) }
  const cancel = () => { setEditing(null); setStatus('') }

  const handleChange = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [e.target.name]: val }))
  }

  const handleSave = async () => {
    if (!form.message.trim()) return
    setStatus('saving')
    try {
      if (editing === 'new') {
        await addDocument('promotions', form)
      } else {
        await updateDocument('promotions', editing.id, form)
      }
      setStatus('saved')
      setTimeout(() => { setEditing(null); setStatus('') }, 800)
    } catch {
      setStatus('error')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this promotion?')) return
    await deleteDocument('promotions', id)
  }

  if (loading) return <p>Loading…</p>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 className="admin-page-title">Promotions</h1>
          <p className="admin-page-sub">Active promotions show as a banner across the site.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openNew}>+ New promotion</button>
      </div>

      {editing && (
        <div className="admin-card" style={{ marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: 20 }}>
            {editing === 'new' ? 'New Promotion' : 'Edit Promotion'}
          </h3>

          {status === 'saved' && <p className="admin-success">Saved.</p>}
          {status === 'error' && <p className="admin-error">Something went wrong.</p>}

          <div className="admin-field">
            <label>Banner Message</label>
            <input name="message" value={form.message} onChange={handleChange} placeholder="e.g. 20% off all November sensory classes — limited slots!" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
            <div className="admin-field">
              <label>CTA Button Label <span style={{ fontWeight: 400, color: 'var(--color-gray)' }}>(optional)</span></label>
              <input name="ctaLabel" value={form.ctaLabel} onChange={handleChange} placeholder="e.g. Book now" />
            </div>
            <div className="admin-field">
              <label>CTA URL <span style={{ fontWeight: 400, color: 'var(--color-gray)' }}>(optional)</span></label>
              <input name="ctaUrl" value={form.ctaUrl} onChange={handleChange} placeholder="e.g. https://list.sg/@littlejoyplay" />
            </div>
            <div className="admin-field">
              <label>Start Date</label>
              <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
            </div>
            <div className="admin-field">
              <label>End Date</label>
              <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
            </div>
            <div className="admin-field">
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
                Active (show on site now)
              </label>
            </div>
          </div>
          <div className="admin-form-actions">
            <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={status === 'saving'}>
              {status === 'saving' ? 'Saving…' : 'Save promotion'}
            </button>
            <button className="admin-btn admin-btn-ghost" onClick={cancel}>Cancel</button>
          </div>
        </div>
      )}

      <div className="admin-card" style={{ padding: 0 }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Message</th>
              <th>CTA</th>
              <th>Dates</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {promos.map((p) => (
              <tr key={p.id}>
                <td style={{ maxWidth: 320 }}>{p.message}</td>
                <td style={{ color: 'var(--color-gray)', fontSize: 13 }}>{p.ctaLabel || '—'}</td>
                <td style={{ color: 'var(--color-gray)', fontSize: 12 }}>
                  {p.startDate || '—'} → {p.endDate || '—'}
                </td>
                <td>
                  <span className={`admin-badge ${p.isActive ? 'admin-badge--active' : 'admin-badge--inactive'}`}>
                    {p.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="admin-btn admin-btn-ghost" onClick={() => openEdit(p)}>Edit</button>
                    <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(p.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {promos.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--color-gray)', padding: 40 }}>No promotions yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
