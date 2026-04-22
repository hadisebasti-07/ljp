import { useState } from 'react'
import { useCollection } from '../../../hooks/useFirestore'
import { addDocument, updateDocument, deleteDocument, serverTimestamp } from '../../../firebase/firestore'
import { orderBy } from '../../../firebase/firestore'
import '../admin.css'

const EMPTY = { title: '', excerpt: '', body: '', tag: 'News', published: true }

export default function AdminNews() {
  const { data: posts, loading } = useCollection('posts', [orderBy('createdAt', 'desc')])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('')

  const openNew = () => { setForm(EMPTY); setEditing('new') }
  const openEdit = (post) => { setForm({ ...post }); setEditing(post) }
  const cancel = () => { setEditing(null); setStatus('') }

  const handleChange = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [e.target.name]: val }))
  }

  const handleSave = async () => {
    if (!form.title.trim()) return
    setStatus('saving')
    try {
      if (editing === 'new') {
        await addDocument('posts', { ...form, createdAt: serverTimestamp() })
      } else {
        await updateDocument('posts', editing.id, form)
      }
      setStatus('saved')
      setTimeout(() => { setEditing(null); setStatus('') }, 800)
    } catch {
      setStatus('error')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return
    await deleteDocument('posts', id)
  }

  if (loading) return <p>Loading…</p>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 className="admin-page-title">News</h1>
          <p className="admin-page-sub">Create and manage news posts shown on the /news page.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openNew}>+ New post</button>
      </div>

      {editing && (
        <div className="admin-card" style={{ marginBottom: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: 20 }}>
            {editing === 'new' ? 'New Post' : 'Edit Post'}
          </h3>

          {status === 'saved' && <p className="admin-success">Post saved.</p>}
          {status === 'error' && <p className="admin-error">Something went wrong.</p>}

          <div className="admin-field">
            <label>Title</label>
            <input name="title" value={form.title} onChange={handleChange} placeholder="Post title" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
            <div className="admin-field">
              <label>Tag / Category</label>
              <input name="tag" value={form.tag} onChange={handleChange} placeholder="e.g. Press, Update, Event" />
            </div>
            <div className="admin-field">
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" name="published" checked={form.published} onChange={handleChange} />
                Published (visible on site)
              </label>
            </div>
          </div>
          <div className="admin-field">
            <label>Excerpt <span style={{ fontWeight: 400, color: 'var(--color-gray)' }}>(shown in news card)</span></label>
            <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={3} placeholder="Short summary shown on the news listing page…" />
          </div>
          <div className="admin-field">
            <label>Full Content</label>
            <textarea name="body" value={form.body} onChange={handleChange} rows={10} placeholder="Full post content…" />
          </div>
          <div className="admin-form-actions">
            <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={status === 'saving'}>
              {status === 'saving' ? 'Saving…' : 'Save post'}
            </button>
            <button className="admin-btn admin-btn-ghost" onClick={cancel}>Cancel</button>
          </div>
        </div>
      )}

      <div className="admin-card" style={{ padding: 0 }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Tag</th>
              <th>Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id}>
                <td style={{ fontWeight: 600 }}>{p.title}</td>
                <td>{p.tag}</td>
                <td style={{ color: 'var(--color-gray)', fontSize: 12 }}>
                  {p.createdAt?.toDate?.()?.toLocaleDateString('en-SG') || '—'}
                </td>
                <td>
                  <span className={`admin-badge ${p.published ? 'admin-badge--active' : 'admin-badge--inactive'}`}>
                    {p.published ? 'Published' : 'Draft'}
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
            {posts.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--color-gray)', padding: 40 }}>No posts yet. Create your first one.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
