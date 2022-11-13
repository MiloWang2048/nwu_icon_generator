import { cloudEnv } from "./common/config"

// app.js
App({
  onLaunch() {
    wx.cloud.init({
      env: cloudEnv
    })
  },
  globalData: {}
})