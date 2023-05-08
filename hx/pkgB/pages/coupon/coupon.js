// pages/orderAll/orderAll.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["未使用", "已使用", "已失效"],
    tabIndex: 0,
    sliderLeft: 0,
    sliderOffset: 0,
    sliderOffsets: [],
    // 优惠券信息
    couponInfo: [],
    // 有没有优惠券
    haveCoupon: false,
    // 用户唯一id
    currentId: '',
    isLogin:wx.getStorageSync('login'),

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('onload');
    this.setData({
      isLogin: options.isLogin
    })
    console.log(this.data.isLogin);
    let that = this;
    wx.getStorage({
        key: 'currentId',
        success(res) {
          // console.log(res.data);
          that.setData({
            currentId: res.data
          })
          // console.log(that.data.currentId);
        }
      }),

      this.init();
    wx.setNavigationBarTitle({
      title: '我的优惠券',
    });
    // 菜单滑动
    // 这个是异步调用，同步返回，所以需要记录this

    wx.getSystemInfo({
      success: function (res) {
        // 获取每个tab头的宽度
        let windowWidth = res.windowWidth;
        let itemWidth = windowWidth / that.data.tabs.length;
        //记录每个项的滑动距离
        let itemBox = [];
        for (let i in that.data.tabs) {
          itemBox.push(itemWidth * i)
        }
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - 48) / 2,
          sliderOffsets: itemBox,
          sliderOffset: 0,
          itemWidth: itemWidth,
          windowWidth: windowWidth
        })
      }
    })
  },
  // tab点击函数
  onTabClick(e) {
    // 点击对应项，调用对应移动距离
    let newOffset = this.data.sliderOffsets[e.currentTarget.id];
    this.setData({
      tabIndex: e.currentTarget.id,
      sliderOffset: newOffset
    })
  },
  // swiper滑动事件
  swiperChange(e) {
    console.log(e);
    this.setData({
      sliderOffset: this.data.sliderOffsets[e.detail.current],
      tabIndex: e.detail.current
    })
  },
  init() {
    const that = this;
    // 有没有优惠券
    wx.request({
        url: 'http://127.0.0.1:8686/coupon/selectByCid',
        data: {
          cid:wx.getStorageSync('customId')
        },
        success: (res) => {
          console.log(res.data);
          if (res.data.length > 0) {
            that.setData({
              haveCoupon: true
            })
          }
          // console.log(that.data.haveCoupon);
        }
      }),
      // 优惠券信息
      wx.request({
        url: 'http://127.0.0.1:8686/coupon/selectAllDiscount',
        method: 'get',
        success: (res) => {
          that.setData({
            couponInfo: res.data
          });
          console.log(that.data.couponInfo);
        }
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log(this.data.isLogin);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})