import { getLocalData } from '@/utils/storage'

import { getImage } from './index'

interface UploadOptions {
  sourceType?: string[]
  showLoading?: boolean
  count?: number
}

interface FileResult {
  fileId: string
  fileUri: string
}

/**
 * toast
 * @param title
 * @param icon
 */
export const toast = (
  title: string,
  icon?: 'success' | 'loading' | 'error' | 'none' | 'fail' | 'exception'
) => {
  uni.showToast({
    title,
    icon: icon || 'none'
  })
}

/**
 * 预览图片
 * @param urls 图片链接或图片链接数组
 * @param current 当前点击的图片索引
 */
export const previewImage = (urls: string | string[], current?: number) => {
  if (typeof urls === 'string') {
    urls = [getImage(urls)]
  } else {
    urls = urls.map((url) => getImage(url))
  }
  uni.previewImage({
    current,
    urls
  })
}

/**
 * 选择/拍摄照片并上传
 * @param options sourceType：album 从相册选图，camera 使用相机；showLoading：是否显示上传中loading；count: 一次可选择的数量，默认1
 * @returns
 */
export const uploadFile = (options?: UploadOptions) => {
  const token = getLocalData('token')
  return new Promise<FileResult>((resolve, reject) => {
    uni.chooseImage({
      count: options?.count || 1,
      sizeType: ['compressed'],
      sourceType: options?.sourceType || ['album'],
      success: (response) => {
        if (options?.showLoading) {
          uni.showLoading({
            title: '上传中...',
            mask: true
          })
        }
        uni.uploadFile({
          url: import.meta.env.VITE_APP_BASE_URL + '/file/upload',
          filePath: response.tempFilePaths[0],
          name: 'file',
          fileType: 'image',
          header: {
            accept: 'application/json',
            Authorization: 'Bearer ' + token
          },
          success: (res) => {
            options?.showLoading && uni.hideLoading()
            if (res.statusCode !== 200) {
              if (res.statusCode === 401) {
                toast('登录过期')
                setTimeout(() => {
                  uni.reLaunch({
                    url: '/pages/index/index'
                  })
                }, 1000)
                return
              }
              toast('上传图片失败')
            } else {
              const dataObj = JSON.parse(res.data)
              if (dataObj.resultCode !== '0') {
                toast('上传图片失败')
              } else {
                resolve(dataObj.resultData.fileDTO)
              }
            }
          },
          fail: (err) => {
            options?.showLoading && uni.hideLoading()
            toast('上传图片失败')
            reject(err)
          }
        })
      }
    })
  })
}
