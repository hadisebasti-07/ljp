import { useEffect, useState } from 'react'
import { subscribeToCollection, subscribeToDocument } from '../firebase/firestore'

export const useDocument = (path, id) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    const unsubscribe = subscribeToDocument(path, id, (snap) => {
      setData(snap.exists() ? { id: snap.id, ...snap.data() } : null)
      setLoading(false)
    })
    return unsubscribe
  }, [path, id])

  return { data, loading, error }
}

export const useCollection = (path, constraints = []) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = subscribeToCollection(path, (snap) => {
      setData(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      setLoading(false)
    }, constraints)
    return unsubscribe
  }, [path])

  return { data, loading, error }
}
