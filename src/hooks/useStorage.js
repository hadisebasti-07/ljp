import { useState } from 'react'
import { uploadFile } from '../firebase/storage'

export const useUpload = () => {
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)

  const upload = async (path, file) => {
    setUploading(true)
    setError(null)
    try {
      const url = await uploadFile(path, file, setProgress)
      return url
    } catch (err) {
      setError(err)
      return null
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  return { upload, progress, uploading, error }
}
