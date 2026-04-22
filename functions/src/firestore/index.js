const { onDocumentCreated } = require('firebase-functions/v2/firestore')
const { getFirestore } = require('firebase-admin/firestore')

// Example: update a counter when a post is created
const onPostCreated = onDocumentCreated('posts/{postId}', async (event) => {
  const db = getFirestore()
  const post = event.data.data()

  await db.collection('stats').doc('posts').set(
    { count: require('firebase-admin/firestore').FieldValue.increment(1) },
    { merge: true }
  )
})

module.exports = { onPostCreated }
