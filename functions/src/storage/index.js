const { onObjectFinalized } = require('firebase-functions/v2/storage')
const { getFirestore } = require('firebase-admin/firestore')

// Example: log metadata when a file is uploaded
const onFileUploaded = onObjectFinalized(async (event) => {
  const { name, size, contentType, bucket } = event.data
  const db = getFirestore()

  await db.collection('uploads').add({
    path: name,
    size,
    contentType,
    bucket,
    uploadedAt: new Date(),
  })
})

module.exports = { onFileUploaded }
