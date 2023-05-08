// pages/custom detail/custom detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:'',
    custom_pic:'',
    telphone:'',
msg1:wx.getStorageSync('currentId')
// currentId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(this.data.msg1);
    var that=this;
       wx.request({
         url:'http://127.0.0.1:8686/customs/apply',
             header: {
                   'content-type': 'application/json'
                 },
         method:'GET',
         data:{
           customs_id:that.data.msg1
         },
         success(res){
           console.log(res.data[0].nickName);
           that.setData({
            nickName:res.data[0].nickName,
            custom_pic:res.data[0].custom_pic,
            telphone:res.data[0].telphone,
           })
         }
       })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx
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