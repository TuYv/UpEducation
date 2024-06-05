import { toast } from '@/utils/wechat'

import { getLocalData, removeLocalData } from './storage'

const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL

interface RequestOptions extends UniApp.RequestOptions {
  // 是否需要显示加载loading
  showLoading?: boolean
  // 是否显示错误信息toast
  showToast?: boolean
}

interface ResponseData<T> {
  resultCode: string
  resultData: T
  resultMsg: string
}

/**
 * 显示/隐藏请求loading
 */
const loadingInstance = {
  loadingCount: 0,
  addCount() {
    this.loadingCount++
  },
  getCount() {
    return this.loadingCount
  },
  subCount() {
    this.loadingCount--
    if (this.loadingCount < 0) {
      this.loadingCount = 0
    }
  }
}
const hiddenLoading = (hasLoading: boolean) => {
  if (hasLoading && loadingInstance.getCount() > 0) {
    loadingInstance.subCount()
  }
  if (hasLoading && loadingInstance.getCount() === 0) {
    uni.hideLoading()
  }
}

/**
 * 显示错误信息
 * @param title
 */
const showErrorToast = (title: string) => {
  setTimeout(() => {
    toast(title)
  }, 500)
}

const request = <T>(options: RequestOptions) => {
  const { showLoading = true, showToast = true } = options
  return new Promise<ResponseData<T>>((resolve, reject) => {
    if (showLoading) {
      loadingInstance.addCount()
      if (loadingInstance.getCount() === 1) {
        uni.showLoading({
          title: '加载中...',
          mask: true
        })
      }
    }

    options.url = API_BASE_URL + options.url
    const token = getLocalData('token')
    options.header = {
      ...options.header,
      accept: 'application/json',
      Authorization: 'Bearer ' + token
    }
    uni.request({
      ...options,
      success: (res) => {
        hiddenLoading(showLoading)
        if (res.statusCode !== 200) {
          if (res.statusCode === 401) {
            toast('登录过期')
            removeLocalData('tokenExpireTime')
            setTimeout(() => {
              uni.reLaunch({
                url: '/pages/index/index'
              })
            }, 1000)
            return
          }
          showErrorToast('请求异常')
        } else {
          if ((res.data as ResponseData<T>).resultCode !== '0') {
            if (showToast) {
              showErrorToast((res.data as ResponseData<T>).resultMsg)
            }
          }
        }
        resolve(res.data as ResponseData<T>)
      },
      fail: (err) => {
        hiddenLoading(showLoading)
        showErrorToast('请求异常')
        reject(err)
      }
    })
  })
}

export default request
