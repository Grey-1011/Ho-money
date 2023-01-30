import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { mockItemCreate, mockSession, mockTagIndex, mockTagShow } from "../mock/mock"

type GetConfig = Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method' | 'headers'>
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'headers'>
type DeleteConfig = Omit<AxiosRequestConfig, 'params'>

export class Http {
  instance: AxiosInstance
  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    })
  }

  //CRUD
  get<R = unknown>(url: string, query?: Record<string, JSONValue>, config?: GetConfig){
    return this.instance.request<R>({
      ...config,
      url,
      params: query,
      method: 'GET'
    })
  }

  post<R = unknown>(url: string, data?: Record<string, JSONValue>, config?: PostConfig){
    return this.instance.request<R>({
      ...config, 
      url,
      data,
      method: 'POST'
    })

  }
  patch<R = unknown>(url: string, data?:Record<string, JSONValue>, config?: PatchConfig){
    return this.instance.request<R>({
      ...config,
      url,
      data,
      method: 'POST',
    })
  }

  
  delete(url: string, query?: Record<string, string>, config?: DeleteConfig){
    return this.instance.request({
      ...config,
      url,
      params: query,
      method: 'DELETE'
    })
  }
}

const mock = (response: AxiosResponse) => {
  if(location.hostname !== 'localhost' && location.hostname !== '127.0.0.1' && location.hostname !== '192.168.43.107'){
    return false
  }
  switch (response.config?.params?._mock){
    case 'tagIndex':
      [response.status, response.data] = mockTagIndex(response.config)
      return true
    case 'itemCreate':
      [response.status, response.data] = mockItemCreate(response.config)
      return true
    case 'tagShow':
      [response.status, response.data] = mockTagShow(response.config)
      return true
    // case 'itemIndex':
    //   [response.status, response.data] = mockItemIndex(response.config)
    //   return true
    // case 'tagCreate':
    //   [response.status, response.data] = mockTagCreate(response.config)
    //   return true
    case 'session':
      [response.status, response.data] = mockSession(response.config)
      return true 
  }
  return false
}


export const http = new Http('/api/v1')

http.instance.interceptors.request.use(config => {
  const jwt = localStorage.getItem('jwt')
  if(jwt){
    config.headers!.Authorization = `Bearer ${jwt}`
  }
  return config
}, () => {})

http.instance.interceptors.response.use(response => {
  mock(response)
  if(response.status >= 400){
    throw response
  }else {
    return response
  }
},(error) => {
  mock(error.response)
  if(error.response.status >= 400) {
    throw error
  }else {
    return error.response
  }
})


http.instance.interceptors.response.use(response => {
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

