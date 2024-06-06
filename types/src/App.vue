<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
onLaunch(() => {
  const updateManager = uni.getUpdateManager()

  updateManager.onCheckForUpdate(() => {
    // 请求完新版本信息的回调
  })

  updateManager.onUpdateReady(() => {
    uni.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success(res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
        }
      }
    })
  })

  updateManager.onUpdateFailed(() => {
    // 新的版本下载失败
  })
})
onShow(() => {})
onHide(() => {})
</script>
<style lang="scss">
@import '@/static/styles/index.scss';
</style>
