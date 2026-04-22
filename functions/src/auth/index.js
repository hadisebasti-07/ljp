const { onDocumentCreated } = require('firebase-functions/v2/firestore')
const { getFirestore } = require('firebase-admin/firestore')
const { beforeUserCreated } = require('firebase-functions/v2/identity')

// Create a user profile document when a new user signs up
const onUserCreated = beforeUserCreated(async (event) => {
  const { uid, email, displayName, photoURL } = event.data
  const db = getFirestore()

  await db.collection('users').doc(uid).set({
    uid,
    email,
    displayName: displayName || '',
    photoURL: photoURL || '',
    createdAt: new Date(),
    updatedAt: new Date(),
  })
})

module.exports = { onUserCreated }
