import { useEffect } from 'react'
import { initRemoteConfig } from '../firebase/remoteConfig'
import { AuthProvider } from '../context/AuthContext'
import StructuredData from '../components/common/StructuredData'
import Router from './Router'

export default function App() {
  useEffect(() => {
    initRemoteConfig().catch(() => {})
  }, [])

  return (
    <AuthProvider>
      <StructuredData />
      <Router />
    </AuthProvider>
  )
}
