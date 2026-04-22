import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
} from 'firebase/storage'
import { app } from './config'

export const storage = getStorage(app)

export const uploadFile = (path, file, onProgress) => {
  const storageRef = ref(storage, path)
  const uploadTask = uploadBytesResumable(storageRef, file)

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        onProgress?.(progress)
      },
      reject,
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref)
        resolve(url)
      }
    )
  })
}

export const getFileUrl = (path) =>
  getDownloadURL(ref(storage, path))

export const deleteFile = (path) =>
  deleteObject(ref(storage, path))

export const listFiles = (path) =>
  listAll(ref(storage, path))
