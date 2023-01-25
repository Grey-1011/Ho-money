import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios"
type JSONValue = string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue }

export class Http {
  instance: AxiosInstance
  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    })
  }

  //CRUD
  get<R = unknown>(url: string, query?: Record<string, string>, config?: Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>){
    return this.instance.request<R>({
      url,
      params: query,
      ...config,
      method: 'GET'
    })
  }

  post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: Omit<AxiosRequestConfig, 'data' | 'url' | 'method'>){
    return this.instance.request<R>({
      url,
      data,
      method: 'POST',
      ...config  
    })

  }
  patch<R = unknown>(url: string, data?:Record<string, JSONValue>, config?: Omit<AxiosRequestConfig, 'url' | 'data'>){
    return this.instance.request<R>({
      ...config,
      url,
      data,
      method: 'POST',
    })
  }

  
  delete(url: string, query?: Record<string, string>, config?: Omit<AxiosRequestConfig, 'url' | 'data'> ){
    return this.instance.request({
      ...config,
      url,
      params: query,
      method: 'DELETE'
    })
  }
}

export const http = new Http('/api/v1')

// http.instance.interceptors.request.use(config => {}, () => {})


http.instance.interceptors.response.use(response => {
  console.log(response)
  return response
}, (error) => {
  if(error.response){
    const axiosError = error as AxiosError
    if(axiosError.response?.status === 429){
      alert('发送太频繁了')
    }
  }
  throw error
})