import { useEffect } from 'react'

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ChildCare',
  name: 'Little Joy Play',
  url: 'https://www.littlejoyplay.sg',
  logo: 'https://www.littlejoyplay.sg/logo.png',
  description: 'Play-based sensory classes and literacy programmes for children aged 8 months to 6 years across multiple locations in Singapore.',
  email: 'hello@littlejoyplay.sg',
  sameAs: ['https://www.instagram.com/littlejoyplay'],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+65-9646-4295',
      contactType: 'customer service',
      areaServed: 'SG',
      availableLanguage: 'English',
    },
    {
      '@type': 'ContactPoint',
      telephone: '+65-9820-4155',
      contactType: 'customer service',
      areaServed: 'SG',
      availableLanguage: 'English',
    },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '15:00',
    },
  ],
  location: [
    {
      '@type': 'Place',
      name: 'Little Joy Play — Upper Bukit Timah',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Jalan Layang Layang',
        addressLocality: 'Singapore',
        postalCode: '598486',
        addressCountry: 'SG',
      },
    },
    {
      '@type': 'Place',
      name: 'Little Joy Play — Trehaus @ Funan Mall',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'North Bridge Road Lift Lobby A',
        addressLocality: 'Singapore',
        postalCode: '179097',
        addressCountry: 'SG',
      },
    },
    {
      '@type': 'Place',
      name: 'Little Joy Play — East Coast Commune',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1000 East Coast Parkway #01-03',
        addressLocality: 'Singapore',
        postalCode: '449876',
        addressCountry: 'SG',
      },
    },
    {
      '@type': 'Place',
      name: 'Little Joy Play — Pasir Ris',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Blk 528B Street 51',
        addressLocality: 'Singapore',
        postalCode: '512528',
        addressCountry: 'SG',
      },
    },
  ],
}

export default function StructuredData() {
  useEffect(() => {
    let el = document.getElementById('schema-org')
    if (!el) {
      el = document.createElement('script')
      el.id = 'schema-org'
      el.type = 'application/ld+json'
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(schema)
  }, [])

  return null
}
