import {
  getRemoteConfig,
  fetchAndActivate,
  getValue,
  getString,
  getBoolean,
  getNumber,
} from 'firebase/remote-config'
import { app } from './config'

export const remoteConfig = getRemoteConfig(app)

// Minimum fetch interval (12h in production, 0 in dev)
remoteConfig.settings.minimumFetchIntervalMillis =
  import.meta.env.DEV ? 0 : 43200000

remoteConfig.defaultConfig = {
  welcome_message: 'Welcome to LittleJoy!',
  feature_new_dashboard: false,
}

export const initRemoteConfig = () => fetchAndActivate(remoteConfig)

export const getConfig = (key) => getValue(remoteConfig, key)
export const getConfigString = (key) => getString(remoteConfig, key)
export const getConfigBool = (key) => getBoolean(remoteConfig, key)
export const getConfigNumber = (key) => getNumber(remoteConfig, key)
