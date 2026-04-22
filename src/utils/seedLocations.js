/**
 * Run once to seed Firestore with initial location data.
 * Call seedLocations() from a one-off admin action or browser console.
 * After seeding, update mapEmbedUrl per location in the admin dashboard.
 */
import { setDocument } from '../firebase/firestore'

const initialLocations = [
  {
    name: 'Upper Bukit Timah',
    address: 'Jalan Layang Layang, Singapore 598486',
    area: 'West',
    phone: '+65 9820 4155',
    mapEmbedUrl: '',
    isActive: true,
    order: 1,
  },
  {
    name: 'Trehaus @ Funan Mall',
    address: 'North Bridge Road Lift Lobby A, Singapore 179097',
    area: 'Central',
    phone: '+65 9646 4295',
    mapEmbedUrl: '',
    isActive: true,
    order: 2,
  },
  {
    name: 'East Coast Commune',
    address: '1000 ECP, #01-03, Singapore 449876',
    area: 'East',
    phone: '+65 9646 4295',
    mapEmbedUrl: '',
    isActive: true,
    order: 3,
  },
  {
    name: 'Pasir Ris',
    address: 'Blk 528B Street 51, Singapore 512528',
    area: 'East',
    phone: '+65 9646 4295',
    mapEmbedUrl: '',
    isActive: true,
    order: 4,
  },
]

export async function seedLocations() {
  for (const loc of initialLocations) {
    const id = loc.name.toLowerCase().replace(/[^a-z0-9]/g, '-')
    await setDocument('locations', id, loc)
    console.log(`Seeded: ${loc.name}`)
  }
  console.log('All locations seeded.')
}
