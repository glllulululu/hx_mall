// pkgB/pages/goComment/goComment.js
// import Notify from '@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentId: '', //用户编号
    orderId: '', //订单编号
    productName: '',
    // 输入框内容
    content: '',
    allProductId: '',
    productId: '',
    stateUse: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      orderId: options.orderId,
      productName: options.productName,
      productId: options.productId
    })
    const that = this;
    wx.getStorage({
      'key': 'currentId',
      success(res) {
        that.setData({
          currentId: res.data
        })
      }
    });
  },

  sendComment() {
    const that = this;
    if (that.data.content == '') {
      wx.showModal({
        content: '您还没有输入任何内容哦'
      })
    } else {
      wx.request({
        url: 'http://127.0.0.1:8686/insert/comment',
        data: {
          orderId: that.data.orderId,
          productId: that.data.productId,
          productName: that.data.productName,
          comment: that.data.content,
          comment_type: '',
          cid: that.data.currentId,
          state:0,
          doneCom: 1
        },
        success(res) {
          wx.showModal({
            content: '评价成功，感谢您的反馈！'
          })
          console.log('添加用户评价成功');
        }
      })
    }

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