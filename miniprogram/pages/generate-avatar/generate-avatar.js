const {
  avatarBaseWidth
} = require("../../common/config");

// miniprogram/pages/generate-avatar/generate-avatar.js
Page({
  data: {},
  onLoad() {
    wx.showLoading({
      title: "生成头像"
    })
    this.getOpenerEventChannel().on("mixData", mixData => {
      wx.cloud.downloadFile({
        fileID: mixData.border,
        success: res => {
          mixData.border = res.tempFilePath
          this.mix(mixData.avatar, mixData.border)
        },
        complete: res => {
          wx.hideLoading();
        }
      })
    })
  },
  mix(avatar, border) {
    wx.createSelectorQuery().select('#canvas').fields({
      node: true
    }).exec(res => {
      const canvas = res[0].node
      canvas.width = canvas.height = avatarBaseWidth;
      drawImage(canvas, avatar).then(() => drawImage(canvas, border));
    })
  },
  onSave() {
    wx.showLoading({
      title: "保存头像"
    })
    wx.createSelectorQuery().select('#canvas').fields({
      node: true
    }).exec(res => {
      const canvas = res[0].node;

      wx.canvasToTempFilePath({
        destWidth: avatarBaseWidth,
        destHeight: avatarBaseWidth,
        canvas,
        success(res) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success() {
              wx.showToast({
                title: '保存成功',
                icon: 'success'
              })
            }
          })
        },
        fail(res) {
          console.error(res)
          wx.showToast({
            title: '生成头像失败',
            icon: 'error'
          })
        }
      })
    })
  },
  onShareAppMessage() {}
})

function drawImage(canvas, imgPath) {
  return new Promise(resolve => {
    const ctx = canvas.getContext('2d');
    wx.getImageInfo({
      src: imgPath,
      success: img => {
        const imgObj = canvas.createImage()
        imgObj.src = img.path
        imgObj.onload = () => {
          ctx.drawImage(imgObj, 0, 0, img.width, img.height, 0, 0, avatarBaseWidth, avatarBaseWidth)
          resolve()
        }
      },
      fail: console.error
    })
  })
}