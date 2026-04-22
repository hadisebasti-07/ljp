import { useEffect, useState } from 'react'
import { subscribeToCollection } from '../../firebase/firestore'
import './LocationMap.css'

const FALLBACK_LOCATIONS = [
  { id: 'upper-bukit-timah', name: 'Upper Bukit Timah', address: 'Jalan Layang Layang, Singapore 598486', area: 'West', phone: '+65 9820 4155', mapEmbedUrl: '', isActive: true, order: 1 },
  { id: 'trehaus-funan', name: 'Trehaus @ Funan Mall', address: 'North Bridge Road Lift Lobby A, Singapore 179097', area: 'Central', phone: '+65 9646 4295', mapEmbedUrl: '', isActive: true, order: 2 },
  { id: 'east-coast-commune', name: 'East Coast Commune', address: '1000 ECP, #01-03, Singapore 449876', area: 'East', phone: '+65 9646 4295', mapEmbedUrl: '', isActive: true, order: 3 },
  { id: 'pasir-ris', name: 'Pasir Ris', address: 'Blk 528B Street 51, Singapore 512528', area: 'East', phone: '+65 9646 4295', mapEmbedUrl: '', isActive: true, order: 4 },
]

export default function LocationMap() {
  const [locations, setLocations] = useState(FALLBACK_LOCATIONS)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const unsub = subscribeToCollection('locations', (snap) => {
      const data = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((l) => l.isActive !== false)
        .sort((a, b) => (a.order || 0) - (b.order || 0))
      // Only replace fallback if Firestore actually has data
      if (data.length > 0) setLocations(data)
    })
    return unsub
  }, [])

  const current = locations[active]

  return (
    <div className="location-map">
      <div className="location-map__tabs">
        {locations.map((loc, i) => (
          <button
            key={loc.id}
            className={`location-map__tab${active === i ? ' location-map__tab--active' : ''}`}
            onClick={() => { setActive(i) }}
          >
            {loc.name}
          </button>
        ))}
      </div>

      <div className="location-map__body">
        <div className="location-map__info">
          <h3 className="location-map__name">{current.name}</h3>
          <p className="location-map__address">{current.address}</p>
          {current.phone && (
            <a href={`tel:${current.phone.replace(/\s/g, '')}`} className="location-map__phone">
              {current.phone}
            </a>
          )}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(current.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="location-map__directions"
          >
            Get directions →
          </a>
        </div>

        {current.mapEmbedUrl ? (
          <div className="location-map__embed">
            <iframe
              src={current.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map for ${current.name}`}
            />
          </div>
        ) : (
          <div className="location-map__placeholder">
            <div className="location-map__placeholder-inner">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <p>{current.address}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(current.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="location-map__open-maps"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
