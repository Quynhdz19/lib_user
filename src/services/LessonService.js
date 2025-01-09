import axiosInstance from './axios'
import BaseService from './BaseService'

class LessonService extends BaseService {
  async addLesson(moduleId, formData) {
    try {
      const response = await this.post(`/courses/modules/${moduleId}/lessons`, formData)
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }

  async updateLesson(lessonId, lessonData) {
    try {
      const response = await this.put(`/courses/modules/lessons/${lessonId}`, lessonData)
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }

  async getUploadPresignedUrl(formData) {
    try {
      const response = await this.post(
        `/courses/modules/lessons/get-upload-presigned-url`,
        formData,
      )
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }

  async getLessonDetail(lessonId) {
    try {
      const response = await this.get(`/courses/modules/lessons/${lessonId}`)
      return response
    } catch (error) {
      throw error.response?.data
    }
  }

  async getLessons(moduleId, searchParams = {}) {
    try {
      const response = await this.get(`/courses/modules/${moduleId}/lessons`, searchParams)
      return response
    } catch (error) {
      throw error.response?.data
    }
  }

  async deleteLessons(moduleId, lessonsData) {
    try {
      const response = await this.delete(`/courses/modules/${moduleId}/remove-lessons`, {
        data: lessonsData,
      })
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }

  async addNote(lessonId, noteData) {
    try {
      const response = await this.put(
        `/courses/modules/lessons/${lessonId}/add-user-note`,
        noteData,
      )
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }

  async updateNote(lessonId, noteData) {
    try {
      const response = await this.put(
        `/courses/modules/lessons/${lessonId}/update-user-note`,
        noteData,
      )
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }
}

const lessonService = new LessonService(axiosInstance)
export default lessonService
