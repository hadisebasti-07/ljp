import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore'
import { app } from './config'

export const db = getFirestore(app)

export const getDocument = (path, id) =>
  getDoc(doc(db, path, id))

export const getCollection = (path) =>
  getDocs(collection(db, path))

export const setDocument = (path, id, data) =>
  setDoc(doc(db, path, id), { ...data, updatedAt: serverTimestamp() })

export const addDocument = (path, data) =>
  addDoc(collection(db, path), { ...data, createdAt: serverTimestamp() })

export const updateDocument = (path, id, data) =>
  updateDoc(doc(db, path, id), { ...data, updatedAt: serverTimestamp() })

export const deleteDocument = (path, id) =>
  deleteDoc(doc(db, path, id))

export const subscribeToDocument = (path, id, callback) =>
  onSnapshot(doc(db, path, id), callback)

export const subscribeToCollection = (path, callback, constraints = []) =>
  onSnapshot(query(collection(db, path), ...constraints), callback)

export { where, orderBy, limit, serverTimestamp }
