import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { app } from './config'

export const messaging = getMessaging(app)

export const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission()
  if (permission !== 'granted') return null

  return getToken(messaging, {
    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
  })
}

export const onForegroundMessage = (callback) =>
  onMessage(messaging, callback)
