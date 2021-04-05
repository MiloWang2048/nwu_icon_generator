// miniprogram/pages/select-avatar/select-avatar.js
import {
  cloudFileRootPath
} from '../../common/config'
Page({
  data: {
    avatarUrl: cloudFileRootPath + "/assets/account.png"
  },
  onUseWechatAvatar() {
    wx.showLoading({
      title: '获取头像',
    })
    wx.getUserProfile({
      desc: "使用微信头像",
      success: res => {
        let url = res.userInfo.avatarUrl;
        if (/\/[0-9]+$/.test(url)) {
          url = url.replace(/\/[0-9]+$/, "/0")
        }
        wx.downloadFile({
          url,
          success: res => {
            this.setData({
              avatarUrl: res.tempFilePath
            })
          },
          complete() {
            wx.hideLoading()
          }
        })
      },
      fail() {
        wx.hideLoading()
      }
    })
  },
  onChoosePhoto(e) {
    wx.chooseImage({
      count: 1,
      sourceType: [e.currentTarget.dataset.type],
      sizeType: ['original'],
      success: photoRes => {
        wx.navigateTo({
          url: '/pages/clip-avatar/clip-avatar',
          events: {
            clippedPhoto: src => {
              this.setData({
                avatarUrl: src
              })
            }
          },
          success: res => {
            res.eventChannel.emit("rawPhoto", photoRes.tempFilePaths[0])
          },
          fail: console.error
        })
      }
    })
  },
  onNext() {
    if (/^cloud.+/.test(this.data.avatarUrl)) {
      wx.showToast({
        title: '请选择头像',
        icon: 'error'
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/select-border/select-border',
      success: res => {
        res.eventChannel.emit('avatarUrl', this.data.avatarUrl)
      }
    })
  }
})