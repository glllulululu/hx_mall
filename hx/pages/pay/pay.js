// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  msg:'',
  msg1:'',
  showPayPwdInput:false,  //是否展示密码输入层
  pwdVal: '',  //输入的密码
  payFocus: true, //文本框焦点
  },
  showInputLayer: function(){
    this.setData({ showPayPwdInput: true, payFocus: true });
  },
  /**
   * 隐藏支付密码输入层
   */
  hidePayLayer: function(){
    
    var val = this.data.pwdVal;

    this.setData({ showPayPwdInput: false, payFocus: false, pwdVal: '' }, function(){
      //修改订单从待付款为待发货状态
      wx.request({
        url: 'http://127.0.0.1:8686/order/pay',
        header:{
        'content-type':'application/json'
        },
        method:'GET',
        data:{
        state:'0',
        orderId:wx.getStorageSync('orderId')
        },
        success:(res)=>{
          wx.showToast({
            // title: val,
            title:'支付成功',
            icon:'success',
            duration:2000
          })
      }
      });




      wx.navigateTo({
        url: '/pages/paySuccess/paySuccess',
      })
    });
  },
  /**
   * 获取焦点
   */
  getFocus: function(){
    this.setData({ payFocus: true });
  },
  /**
   * 输入密码监听
   */
  inputPwd: function(e){
      this.setData({ pwdVal: e.detail.value });

      if (e.detail.value.length >= 6){
        this.hidePayLayer();
      }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  this.setData({
    msg:wx.getStorageSync('orderId'),
    msg1:wx.getStorageSync('totalPrice')
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