import { useEffect, useState } from 'react'
import { subscribeToCollection } from '../../firebase/firestore'
import './PromoBanner.css'

export default function PromoBanner() {
  const [promo, setPromo] = useState(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    const unsub = subscribeToCollection('promotions', (snap) => {
      const active = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .find((p) => {
          if (!p.isActive) return false
          if (p.startDate && p.startDate > today) return false
          if (p.endDate && p.endDate < today) return false
          return true
        })
      setPromo(active || null)
    })
    return unsub
  }, [])

  if (!promo || dismissed) return null

  return (
    <div className="promo-banner">
      <p className="promo-banner__msg">{promo.message}</p>
      {promo.ctaLabel && promo.ctaUrl && (
        <a
          href={promo.ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="promo-banner__cta"
        >
          {promo.ctaLabel}
        </a>
      )}
      <button className="promo-banner__close" onClick={() => setDismissed(true)} aria-label="Dismiss">✕</button>
    </div>
  )
}
