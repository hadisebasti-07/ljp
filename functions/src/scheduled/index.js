const { onSchedule } = require('firebase-functions/v2/scheduler')
const { getFirestore } = require('firebase-admin/firestore')

// Runs every day at midnight UTC
const dailyCleanup = onSchedule('every 24 hours', async () => {
  const db = getFirestore()
  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days ago

  const stale = await db.collection('uploads')
    .where('uploadedAt', '<', cutoff)
    .get()

  const batch = db.batch()
  stale.docs.forEach((doc) => batch.delete(doc.ref))
  await batch.commit()
})

module.exports = { dailyCleanup }
