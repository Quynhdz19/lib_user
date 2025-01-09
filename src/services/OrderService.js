import axiosInstance from './axios'
import BaseService from './BaseService'
import axios from 'axios'

class OrderService extends BaseService {
  async addOrder(orderData) {
    try {
      const response = await this.post('/orders', orderData)
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }
  async voteFile(orderData) {
    try {
      const response = await this.post('/user/vote-file/', orderData)
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }

  async commentFile(orderData) {
    try {
      const response = await this.post('/user/comment-file', orderData)
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }

  async getRegistrationOrder() {
    try {
      const response = await this.get('/orders/pending-by-user')
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }

  async getOrders(searchParams = {}) {
    try {
      const response = await this.get('/user/search-files', searchParams)
      return response
    } catch (error) {
      throw error.response?.data
    }
  }
  async getFileOfUser(searchParams = {}) {
    try {
      const response = await this.get('/user-files', searchParams)
      return response
    } catch (error) {
      throw error.response?.data
    }
  }

  async getHistoryDownload(searchParams = {}) {
    try {
      const response = await this.get('/user-downloads', searchParams)
      return response
    } catch (error) {
      throw error.response?.data
    }
  }

  async getDetailFiles(searchParams = {}) {
    try {
      const response = await this.get('/file-details', searchParams)
      return response
    } catch (error) {
      throw error.response?.data
    }
  }

  async downloadFile(fileID) {
    try {
      const response = this.api.post(
        '/user/download-file/',
        { fileID },
        { responseType: 'blob' }, // Ensure responseType is set to blob here
      )
      return response
    } catch (error) {
      throw error.response?.data
    }
  }
  async uploadFiles(params) {
    try {
      const response = this.api.post('/user/upload-file', params)
      return response
    } catch (error) {
      throw error.response?.data
    }
  }

  async getFileViewUrl(fileID) {
    try {
      const response = await this.post('/user/view-file', { fileID })
      return response
    } catch (error) {
      throw error.response?.data
    }
  }

  async updateOrder(orderId, orderData) {
    try {
      const response = await this.put(`/orders/orders/${orderId}`, orderData)
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }


}


const orderService = new OrderService(axiosInstance)
export default orderService
