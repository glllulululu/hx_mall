// pages/paySuccess/paySuccess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  msg:'',
  msg1:'',
  msg2:''
  },
  gotoSee(){
    wx.navigateTo({
      url: '/pkgB/pages/orderAll/orderAll',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minute=date.getMinutes();
    var second=date.getSeconds();
    if (month < 10) {
      month = "0" + month
    }
    if (day < 10) {
      day = "0" + day
    }
    if (hours < 10) {
      hours = "0" + hours
    }
    if(minute<10){
      minute="0"+minute
    }
    if(second<10){
      second="0"+second
    }
  var date1=year +'-'+month +'-'+ day + ' '+hours+':'+minute+':'+second
  this.setData({
  msg:wx.getStorageSync('orderId'),
  msg2:wx.getStorageSync('totalPrice'),
  msg1:date1
  })
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