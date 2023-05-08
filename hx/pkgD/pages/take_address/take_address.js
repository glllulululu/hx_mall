Page({
  /**
   * 页面的初始数据
   */
  data: {
    addressList: '',
    currentId:'',
    address_id:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init();
  },
  init(){
     var that=this;
    wx.getStorage({
      key: 'currentId1',
      success(res){
        that.setData({
          currentId:res.data

        })
        wx.request({
          url: 'http://127.0.0.1:8686/address/apply',
              header: {
                    'content-type': 'application/json'
                  },
          method:'GET',
          data:{
            custom_id:that.data.currentId
          },
          success(res){
            that.setData({
              addressList:res.data
            })
            console.log(that.data.addressList);
          }
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
 
  },
  delAddr(e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要删除该地址吗？',
      success(res) {
        if (res.confirm) {
          //console.log('用户点击确定')
          wx.request({
            url: 'http://127.0.0.1:8686/address/delete',
            header: {
              'content-type': 'application/json'
            },
            method: 'get',
            data: {
              custom_id:that.data.currentId
            },
            success: function (res) {
              console.log(res)
              wx.showToast({
                title: '删除成功',
                  }, 1000)
                  that.init();
                }
              })
        } else if (res.cancel) {
          console.log('用户点击取消')
          return false
        }
      }
    })
  }
})