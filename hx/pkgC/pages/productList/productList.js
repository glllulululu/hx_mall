Page({
  /**
   * 页面的初始数据
   */
  data: {
    listData:[],

  },
goback(){
wx.navigateBack(-1)
  },
list(){
  if(wx.getStorageSync('info')==''){
    var _that=this;
    wx.request({
      url: 'http://127.0.0.1:8686/product_category',
      method:'GET',
      success:(res)=>{
       _that.setData({
         listData:res.data.data,
       })
      }
    })
  }else{
    var _that=this;
    wx.request({
      url: 'http://127.0.0.1:8686/product_category',
      method:'GET',
      success:(res)=>{
        var data1=res.data.data.filter(item=>{
          return item.productName.indexOf(wx.getStorageSync('info'))!=-1
        })
       _that.setData({
         listData:data1,
       })
      }
    })
  }
},
gotodetail(e){
  e.currentTarget.dataset.info3;
  wx.navigateTo({
    url:'/pkgA/pages/product_detail/product_detail?productId='+JSON.stringify(e.currentTarget.dataset.info3),
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   this.list()
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