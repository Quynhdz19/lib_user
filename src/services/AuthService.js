import axiosInstance from './axios'
import BaseService from './BaseService'

class AuthService extends BaseService {
  async signIn(credentials) {
    try {
      const response = await this.post(`\login`, credentials)
      return response
    } catch (error) {
      throw error.response?.data
    }
  }
}

const authService = new AuthService(axiosInstance)
export default authService
