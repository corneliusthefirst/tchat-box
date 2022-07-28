import axios from 'axios'
import {
  LOGIN_PAGE,
  LOGIN_URL,
  REFRESH_TOKEN_URL,
} from '../constants/history.constants'
import storage from '../context/storage'

axios.defaults.withCredentials = true

const client = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
})

client.interceptors.request.use(async (config) => {
  if (localStorage?.appState?.user) {
    const { user } = await storage.getItem('appState')
    config.headers.Authorization = `Bearer ${user?.tokens?.access?.token}`
  }
  return config
})

client.interceptors.response.use(
  (response) => response,
  async (err) => {
    const { status } = err.response
    const originalReq = err.config

    if (originalReq.url !== LOGIN_URL && err.response) {
      if (
        err.response.status === 401 &&
        err.response?.data?.message === 'Token not found'
      ) {
        await storage.setItem('appState', { user: null })
        window.location.replace(LOGIN_PAGE)
        return Promise.reject()
      }

      if (
        (err.response.status === 401 &&
          err.response?.data?.message === 'Please authenticate',
        err.config && !err.config._retry)
      ) {
        originalReq._retry = true
        const { user } = await storage.getItem('appState')
        const refreshToken = user?.tokens?.refresh?.token

        // request to refresh token
        try {
          const res = await client.post(REFRESH_TOKEN_URL, {
            refreshToken: refreshToken,
          })

          await storage.setItem('appState', { user: res.data })

          originalReq.headers[
            'Authorization'
          ] = `Bearer ${res.data?.tokens?.access?.token}`
          originalReq.headers['Device'] = 'device'

          return client(originalReq)
        } catch (_error) {
          return Promise.reject(_error)
        }
      }
    }

    switch (status) {
      case 403:
        await storage.setItem('appState', { user: null })
        window.location.replace(LOGIN_PAGE)
        break
      default:
        break
    }

    return Promise.reject(err)
  }
)
export default client
