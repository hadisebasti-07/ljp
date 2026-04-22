import { useEffect, useState } from 'react'
import { useCollection } from '../../../hooks/useFirestore'
import { setDocument, addDocument, updateDocument } from '../../../firebase/firestore'
import '../admin.css'

const EMPTY = { name: '', address: '', area: 'East', phone: '', mapEmbedUrl: '', isActive: true, order: 0 }

export default function AdminLocations() {
  const { data: locations, loading } = useCollection('locations')
  const sorted = [...locations].sort((a, b) => (a.order || 0) - (b.order || 0))

  const [editing, setEditing] = useState(null) // null | 'new' | location object
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('')

  const openNew = () => { setForm(EMPTY); setEditing('new') }
  const openEdit = (loc) => { setForm({ ...loc }); setEditing(loc) }
  const cancel = () => { setEditing(null); setStatus('') }

  const handleChange = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [e.target.name]: val }))
  }

  const handleSave = async () => {
    setStatus('saving')
    try {
      if (editing === 'new') {
        const id = form.name.toLowerCase().replace(/[^a-z0-9]/g, '-')
        await setDocument('locations', id, form)
      } else {
        await updateDocument('locations', editing.id, form)
      }
      setStatus('saved')
      setTimeout(() => { setEditing(null); setStatus('') }, 800)
    } catch {
      setStatus('error')
    }
  }

  const toggleActive = async (loc) => {
    await updateDocument('locations', loc.id, { isActive: !loc.isActive })
  }

  if (loading) return <p>Loading…</p>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 className="admin-page-title">Locations</h1>
          <p className="admin-page-sub">Manage your locations and Google Maps embed URLs.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openNew}>+ Add location</button>
      </div>

      {editing && (
        <div className="admin-card" style={{ marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: 20 }}>
            {editing === 'new' ? 'New Location' : `Edit — ${editing.name}`}
          </h3>

          {status === 'saved' && <p className="admin-success">Saved successfully.</p>}
          {status === 'error' && <p className="admin-error">Something went wrong. Please try again.</p>}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
            <div className="admin-field">
              <label>Location Name</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Upper Bukit Timah" />
            </div>
            <div className="admin-field">
              <label>Area</label>
              <select name="area" value={form.area} onChange={handleChange}>
                <option>East</option>
                <option>West</option>
                <option>Central</option>
                <option>North</option>
                <option>North-East</option>
              </select>
            </div>
            <div className="admin-field" style={{ gridColumn: '1 / -1' }}>
              <label>Address</label>
              <input name="address" value={form.address} onChange={handleChange} placeholder="Full address, Singapore XXXXXX" />
            </div>
            <div className="admin-field">
              <label>Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="+65 XXXX XXXX" />
            </div>
            <div className="admin-field">
              <label>Display Order</label>
              <input name="order" type="number" value={form.order} onChange={handleChange} min="1" />
            </div>
            <div className="admin-field" style={{ gridColumn: '1 / -1' }}>
              <label>Google Maps Embed URL</label>
              <input
                name="mapEmbedUrl"
                value={form.mapEmbedUrl}
                onChange={handleChange}
                placeholder="Paste the src URL from Google Maps → Share → Embed a map"
              />
              <span className="admin-field__hint">
                Go to Google Maps → search the address → Share → Embed a map → copy the src="…" value only
              </span>
            </div>
            <div className="admin-field">
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
                Active (visible on site)
              </label>
            </div>
          </div>

          <div className="admin-form-actions">
            <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={status === 'saving'}>
              {status === 'saving' ? 'Saving…' : 'Save location'}
            </button>
            <button className="admin-btn admin-btn-ghost" onClick={cancel}>Cancel</button>
          </div>
        </div>
      )}

      <div className="admin-card" style={{ padding: 0 }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Area</th>
              <th>Address</th>
              <th>Map</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((loc) => (
              <tr key={loc.id}>
                <td style={{ fontWeight: 600 }}>{loc.name}</td>
                <td>{loc.area}</td>
                <td style={{ color: 'var(--color-gray)', fontSize: 13 }}>{loc.address}</td>
                <td>
                  {loc.mapEmbedUrl
                    ? <span className="admin-badge admin-badge--active">Set</span>
                    : <span className="admin-badge admin-badge--inactive">Missing</span>
                  }
                </td>
                <td>
                  <span className={`admin-badge ${loc.isActive ? 'admin-badge--active' : 'admin-badge--inactive'}`}>
                    {loc.isActive ? 'Active' : 'Hidden'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="admin-btn admin-btn-ghost" onClick={() => openEdit(loc)}>Edit</button>
                    <button className="admin-btn admin-btn-ghost" onClick={() => toggleActive(loc)}>
                      {loc.isActive ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
