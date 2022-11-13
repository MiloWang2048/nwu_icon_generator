// miniprogram/pages/select-avatar/select-avatar.js
import {
  cloudFileRootPath
} from '../../common/config'

const defaultAvatarUrl = cloudFileRootPath + "/assets/account.png";

Page({
  data: {
    avatarUrl: defaultAvatarUrl
  },
  onChooseAvatar(e) {
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
        res.eventChannel.emit("rawPhoto", e.detail.avatarUrl)
      },
      fail: console.error
    })
  },
  onNext() {
    if (this.data.avatarUrl === defaultAvatarUrl) {
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