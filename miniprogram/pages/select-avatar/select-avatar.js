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
        wx.downloadFile({
          url: res.userInfo.avatarUrl,
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
        
        this.setData({
          avatarUrl: photoRes.tempFilePaths[0]
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