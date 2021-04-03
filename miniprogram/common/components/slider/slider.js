// common/components/slider/slider.js
Component({
  data: {
    x: 0,
    last: 0,
    sliderWidth: 0,
    sliderBlockWidth: 0
  },
  lifetimes: {
    attached() {
      const query = wx.createSelectorQuery().in(this)
      query.select(".slider").boundingClientRect(res => {
        this.setData({
          sliderWidth: res.width
        })
      })
      query.select(".slider-block").boundingClientRect(res => {
        this.setData({
          sliderBlockWidth: res.width
        })
      })
      query.exec()
    }
  },
  methods: {
    onTouchEnd() {
      const {
        last,
        sliderWidth,
        sliderBlockWidth
      } = this.data
      if (sliderWidth - sliderBlockWidth - last < 2) {
        wx.vibrateShort({
          type: "heavy"
        })
        wx.navigateTo({
          url: '/pages/select-avatar/select-avatar',
        })
      }
      this.setData({
        x: 0,
        last: 0
      })
    },
    onChange(e) {
      this.setData({
        last: e.detail.x
      })
    }
  }
})