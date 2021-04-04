// miniprogram/pages/select-border/select-border.js

import {
  bordersCount,
  cloudFileRootPath
} from '../../common/config'

Page({
  data: {
    hintUrl: cloudFileRootPath + "/assets/hint.png",
    avatarUrl: "",
    borders: [],
    current: 0
  },
  onLoad() {

    // listen on avatarUrl updates.
    this.getOpenerEventChannel().on('avatarUrl', avatarUrl => {
      this.setData({
        avatarUrl
      })
    })

    // load borders.
    const borders = [];
    for (let i = 0; i < bordersCount; i++) {
      borders.push(`${cloudFileRootPath}/borders/${i}.png`)
    }
    this.setData({
      borders
    })
  },
  onChange(e) {
    this.setData({
      current: e.detail.current
    })
  },
  onNext() {
    const {
      avatarUrl,
      current,
      borders
    } = this.data
    wx.navigateTo({
      url: '/pages/generate-avatar/generate-avatar',
      success: res => {
        res.eventChannel.emit("mixData", {
          avatar: avatarUrl,
          border: borders[current]
        })
      }
    })
  }
})