// pages/user_set/user_set.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
msg:wx.getStorageSync('info1')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },

// 退出
exitUser(res) {
  // wx.clearStorageSync('userName')
  // wx.showModal({
  //   title: '警告',
  //   content: '确定退出红星商城吗',
  //   complete: (res) => {
  //     if (res.confirm) {
  //       this.setData({
  //         isLogin: false,
  //       })
  //       wx.removeStorage({
  //         key: 'userInfo',
  //         success(res) {
  //           console.log('退出登录', res);
  //         }
  //       });
  //     }
  //   }
  // })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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