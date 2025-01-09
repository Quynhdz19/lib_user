import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import store from 'src/redux/store'
import { logout } from '../redux/modules/authSlice'

const axiosInstance = axios.create({
  timeout: 10000,
  baseURL: import.meta.env.VITE_BASE_API_URL,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const { auth } = store.getState()
    const accessToken = auth.accessToken

    if (accessToken) {
      const currentDate = new Date()
      const decodedAccessToken = jwtDecode(accessToken)

      if (decodedAccessToken?.exp > currentDate.getTime() / 1000) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
      } else {
        store.dispatch(logout())
        throw new axios.Cancel('Token expired, logging out...')
      }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logout())
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
