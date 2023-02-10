import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { closeToast, showLoadingToast } from "vant"

type GetConfig = Omit<AxiosRequestConfig, 'params' | 'url' | 'method' | 'headers'>
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method' | 'headers'>
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'headers'>
type DeleteConfig = Omit<AxiosRequestConfig, 'params' | 'headers'>

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


function isDev() {
  if (location.hostname !== 'localhost' &&
      location.hostname !== '127.0.0.1' &&
      location.hostname !== '192.168.1.3') {
    return false
  }
  return true
}

export const http = new Http( isDev() ? '/api/v1' : 'http://121.196.236.94:3000/api/v1')

http.instance.interceptors.request.use(config => {
  const jwt = localStorage.getItem('jwt')
  if(jwt){
    config.headers!.Authorization = `Bearer ${jwt}`
  }
  if(config._autoLoading === true){
    showLoadingToast({
      message: '加载中...'
    })
  }
  return config
}, () => {})


http.instance.interceptors.response.use(response => {
  if(response.config._autoLoading === true){
    closeToast()
  }
  return response
}, (error) => {
  if(error.config._autoLoading === true){
    closeToast()
  }
  throw error
})


if(NODE_ENV){
  import('../mock/mock').then((
    {
      mockTagIndex,
      mockItemCreate,
      mockTagShow,
      mockTagEdit,
      mockItemIndex,
      mockItemSummary,
      mockSession
    }
  ) => {
    const mock = (response: AxiosResponse) => {
      if(true || location.hostname !== 'localhost' && location.hostname !== '127.0.0.1' && location.hostname !== '192.168.43.107'){
        return false
      }
      switch (response.config?._mock){
        case 'tagIndex':
          [response.status, response.data] = mockTagIndex(response.config)
          return true
        case 'itemCreate':
          [response.status, response.data] = mockItemCreate(response.config)
          return true
        case 'tagShow':
          [response.status, response.data] = mockTagShow(response.config)
          return true
        case 'tagEdit':
          [response.status, response.data] = mockTagEdit(response.config)
          return true
        case 'itemIndex':
          [response.status, response.data] = mockItemIndex(response.config)
          return true
        case 'itemSummary':
          [response.status, response.data] = mockItemSummary(response.config)
          return true
        // case 'tagCreate':
        //   [response.status, response.data] = mockTagCreate(response.config)
        //   return true
        case 'session':
          [response.status, response.data] = mockSession(response.config)
          return true 
      }
      return false
    }
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
  })
}




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

