// miniprogram/pages/clip-avatar/alip-avatar.js
Page({
  data: {
    src: ''
  },
  onLoad() {
    this.cropper = this.selectComponent("#image-cropper")
    this.getOpenerEventChannel().on("rawPhoto", src => {
      this.setData({
        src
      })
    })
  },
  onSubmit() {
    wx.showLoading({
      title: '剪裁图片',
    })
    this.cropper.getImg(res => {
      this.getOpenerEventChannel().emit("clippedPhoto", res.url);
      wx.hideLoading()
      wx.navigateBack()
    })
  }
})