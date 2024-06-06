/**
 * 保存到本地
 * @param key
 * @param value
 */
export const saveLocalData = (key: string, value: any) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  uni.setStorageSync(key, value)
}

/**
 * 读取本地数据
 * @param key
 */
export const getLocalData = (key: string) => {
  const value = uni.getStorageSync(key)
  if (value) {
    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  }
}

/**
 * 删除本地数据
 * @param key
 */
export const removeLocalData = (key: string) => {
  uni.removeStorageSync(key)
}
