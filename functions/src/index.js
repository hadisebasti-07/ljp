const { initializeApp } = require('firebase-admin/app')

initializeApp()

// Auth triggers
const authTriggers = require('./auth')
exports.onUserCreated = authTriggers.onUserCreated

// Firestore triggers
const firestoreTriggers = require('./firestore')
exports.onPostCreated = firestoreTriggers.onPostCreated

// Storage triggers
const storageTriggers = require('./storage')
exports.onFileUploaded = storageTriggers.onFileUploaded

// Scheduled functions
const scheduled = require('./scheduled')
exports.dailyCleanup = scheduled.dailyCleanup
