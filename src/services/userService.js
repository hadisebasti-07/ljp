import { setDocument, getDocument } from '../firebase/firestore'

export const createUserProfile = (uid, data) =>
  setDocument('users', uid, data)

export const getUserProfile = async (uid) => {
  const snap = await getDocument('users', uid)
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export const updateUserProfile = (uid, data) =>
  setDocument('users', uid, data)
