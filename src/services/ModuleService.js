import axiosInstance from './axios'
import BaseService from './BaseService'

class ModuleService extends BaseService {
  async addModule(courseId, moduleData) {
    try {
      const response = await this.post(`/courses/${courseId}/modules`, moduleData)
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }

  async getDetailModule(moduleId) {
    try {
      const response = await this.get(`/courses/modules/${moduleId}`)
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }

  async getModules(courseId, searchParams = {}) {
    try {
      const response = await this.get(`/courses/${courseId}/modules`, searchParams)
      return response
    } catch (error) {
      throw error.response?.data
    }
  }

  async updateModule(moduleId, moduleData) {
    try {
      const response = await this.put(`/courses/modules/${moduleId}`, moduleData)
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }

  async deleteModules(courseId, modulesData) {
    try {
      const response = await this.delete(`/courses/${courseId}/remove-modules`, {
        data: modulesData,
      })
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }
}

const moduleService = new ModuleService(axiosInstance)
export default moduleService
