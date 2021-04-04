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
  onChoosePhoto() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success: photoRes => {
        // wx.navigateTo({
        //   url: '/pages/clip-avatar/clip-avatar',
        //   events: {
        //     gotClippedPhoto: res => {
        //       console.log(res)
        //     }
        //   },
        //   success: res => {
        //     res.eventChannel.emit('photoPath', photoRes.tempFilePaths[0])
        //   }
        // })
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