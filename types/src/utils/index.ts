import dayjs from 'dayjs'

/**
 * 防抖
 * @param fn
 * @param delay 间隔时间
 * @returns
 */
export const debounce = (fn: Function, delay: number) => {
  let timer: any
  return (...args: any) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * 节流
 * @param fn
 * @param delay
 * @returns
 */
export const throttle = (fn: Function, delay: number) => {
  let timer: any
  return (...args: any) => {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, delay)
    }
  }
}

/**
 * 深拷贝，只能拷贝常见的object和array，复杂类型请使用 'lodash.clonedeep'
 * @param obj
 * @returns
 */
export const deepClone = (obj: any) => {
  let result: any
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      result = []
      for (let i = 0; i < obj.length; i++) {
        result[i] = deepClone(obj[i])
      }
    } else {
      result = {}
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          result[key] = deepClone(obj[key])
        }
      }
    }
  } else {
    result = obj
  }
  return result
}

/**
 * 项目文件地址
 * @param url
 * @returns
 */
export const getImage = (url: string) => {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${import.meta.env.VITE_APP_FILE_URL}${url}`
}

/**
 * 静态文件OSS地址
 * @param name
 * @returns
 */
export const getStaticImage = (name: string) => {
  return `${name}`
}

/**
 * 数字千分位和小数显示
 * @param value
 * @param fractionDigits 小数位数
 * @returns
 */
export const formatThousands = (value: string | number | undefined, fractionDigits: number = 0) => {
  return Number(value || 0).toLocaleString('zh-CN', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  })
}

/**
 * 格式化日期
 * @param date
 * @param formatType 格式化样式，默认为 'YYYY-MM-DD HH:mm:ss'
 * @param isSpecialFormat 是否时特殊的时间样式，如 '今天 13:00'
 * @returns
 */
export const formatDate = (date: string | Date | number, formatType = 'YYYY-MM-DD HH:mm:ss') => {
  if (!date) return ''
  if (typeof date === 'string') {
    date = Number(date)
  }
  return dayjs(date).format(formatType)
}
