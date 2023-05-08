Page({
  /**
   * 页面的初始数据
   */
  data: {
   listData:[],
   activeIndex:0,
   toView:'a0',
    listData3:[],
    value: '',
    show: false,
  },
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  selectMenu:function(e){
    let index=e.currentTarget.dataset.index
    this.setData(
      {activeIndex:index,toView:'a'+index}
    )
  },
  goto(e){
    e.currentTarget.dataset.info7;
    console.log(e.currentTarget.dataset.info7);
     wx.setStorageSync('info7',JSON.stringify(e.currentTarget.dataset.info7))
    var _that=this;
    wx.request({
      url: 'http://127.0.0.1:8686/product/type',
      method:'GET',
      success:(res)=>{
        console.log(res.data.data)
       _that.setData({
         listData3:res.data.data
       })
  }}),
  wx.request({
    url: 'http://127.0.0.1:8686/product_category',
    method:'GET',
    success:(res)=>{
      console.log(res.data.data)
      var data1=res.data.data.filter(item=>{
        return item.typeID==wx.getStorageSync('info7')

      })
      console.log(data1)
       console.log('缓存',wx.getStorageSync('info7'));
     _that.setData({
       listData:data1,
     })
    }
  })
  },
  skip(){
    wx.navigateTo({
      url: '/pkgC/pages/commoditySearch/commoditySearch',
    })
  },
  //根据商品的不同id去商品详情
  goDetail(e){
    wx.setStorageSync('info8',JSON.stringify(e.currentTarget.dataset.info8));
    wx.setStorageSync('info',JSON.stringify(e.currentTarget.dataset.info6));
    wx.navigateTo({
      url: '/pages/product_detail/product_detail?name=分类&productId='+JSON.stringify(e.currentTarget.dataset.info6),
    })
  },
  /*
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _that=this;
    wx.request({
      url: 'http://127.0.0.1:8686/product/type',
      method:'GET',
      success:(res)=>{
        console.log(res.data.data)
       _that.setData({
         listData3:res.data.data
       })
  }}),
  wx.request({
    url: 'http://127.0.0.1:8686/product_category',
    method:'GET',
    success:(res)=>{
      console.log(res.data.data)
      var data1=res.data.data.filter(item=>{
        return item.typeID=='1'
      })
     _that.setData({
       listData:data1,
     })
    }
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