import { getAnalytics, logEvent, setUserId, setUserProperties } from 'firebase/analytics'
import { app } from './config'

export const analytics = getAnalytics(app)

export const trackEvent = (eventName, params) =>
  logEvent(analytics, eventName, params)

export const identifyUser = (userId) =>
  setUserId(analytics, userId)

export const setUserProps = (properties) =>
  setUserProperties(analytics, properties)
