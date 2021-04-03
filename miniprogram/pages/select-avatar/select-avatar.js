// miniprogram/pages/select-avatar/select-avatar.js

Page({
  data: {
    avatarUrl: "cloud://test-2gfh7hzi770e8f48.7465-test-2gfh7hzi770e8f48-1305477959/assets/account.png"
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
    console.log("sdasd");
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success: res => {
        this.setData({
          avatarUrl: res.tempFilePaths[0]
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
    console.log("next page");
  }
})