import api from '../plugins/axios'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

class ApiService {
  static async get<T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    config: AxiosRequestConfig
  ) {
    const { params } = config

    return await api.get<T, R, D>(url, { method: 'GET', params })
  }

  static async patch<T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    data: D,
    config: AxiosRequestConfig
  ) {
    const { params } = config

    return await api.patch<T, R, D>(url, data, {
      method: 'PATCH',
      params,
    })
  }

  static async post<T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    data: D,
    config: AxiosRequestConfig
  ) {
    const { params } = config

    return await api.post<T, R, D>(url, data, {
      method: 'POST',
      params,
    })
  }

  static async delete<T = unknown, R = AxiosResponse<T>, D = unknown>(
    url: string,
    config: AxiosRequestConfig
  ) {
    const { params } = config

    return await api.delete<T, R, D>(url, {
      method: 'POST',
      params,
    })
  }
}

export default ApiService
