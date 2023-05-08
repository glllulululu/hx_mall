Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputVal:'',
    searchRecord:[],
    searchValue:'',
    serchContent:'请输入搜索关键词'
  },
  openHistorySearch: function () {
    this.setData({
      searchRecord: wx.getStorageSync('searchRecord') || [],//若无储存则为空
    })
  },

   //点击搜索按钮提交表单跳转并储存历史记录
   searchSubmitFn: function (e) {
    var that = this
    var inputVal = e.detail.value.input
    var searchRecord = this.data.searchRecord

    if (inputVal == '') {
      //输入为空时的处理
    }
    else {
      //将搜索值放入历史记录中,只能放前五条
      if (searchRecord.length < 5) {
        searchRecord.unshift(
          {
            value: inputVal,
            id: searchRecord.length
          }
        )
      }
      else {
        searchRecord.pop()//删掉旧的时间最早的第一条
        searchRecord.unshift(
          {
            value: inputVal,
            id: searchRecord.length
          }
        )
      }
    //将历史记录数组整体储存到缓存中
    wx.setStorageSync('searchRecord', searchRecord)
    }
  },
  historyDelFn: function () {
    wx.clearStorageSync('searhRecord')
    this.setData({
      searchRecord: []
    })
  },
  goto(e){
    this.data.searchValue
      wx.setStorageSync('info',(this.data.searchValue))
      wx.navigateTo({
        url: '/pkgC/pages/productList/productList'
      })
    },
  
handle(e){
  this.setData({
    searchValue:e.detail.value,
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.openHistorySearch()
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