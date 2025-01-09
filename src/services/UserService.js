import axiosInstance from './axios'
import BaseService from './BaseService'

class UserService extends BaseService {
  async addUser(userData) {
    try {
      const response = await this.post('/users', userData)
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }

  async getUser(userId) {
    try {
      const response = await this.get(`/users/${userId}`)
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }

  async getUsers(searchParams) {
    try {
      const response = await this.get('/users', searchParams)
      return response
    } catch (error) {
      throw error.response?.data
    }
  }

  async updateUser(userId, userData) {
    try {
      const response = await this.put(`/users/${userId}`, userData)
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }

  async getCourses(searchParams = {}) {
    try {
      const response = await this.get(`/users/courses/get-by-user`, searchParams)
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }

  async getDetailCourse(courseId) {
    try {
      const response = await this.get(`/users/courses/${courseId}`)
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }

  async deleteUsers(userData) {
    try {
      const response = await this.delete(`/users/remove-users`, { data: userData })
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }
}

const userService = new UserService(axiosInstance)
export default userService
