Page({
  /**
   * 页面的初始数据
   */
  data: {
  show: false,
  currentIndex:0,
  pic:[],
  foods:[],
  msg:''
  },
  // 点击切换字体颜色
  // 综合排序
  ChangeColor(){
    this.setData({
      currentIndex:0,
    })
    this.bindInit();
  },
  // 销量排序
  ChangeColor1(){
    var that=this;
    wx.request({
      url: 'http://127.0.0.1:8686/product_msg/add',
      method:'GET',
      success:(res)=>{
    var count=res.data.data;
    count.sort(
      function(b,c){
          return c.outCount-b.outCount;
      }
  );
     that.setData({
        currentIndex:1,
        foods:res.data.data
      })  }
    })
  },
  // 筛选新品
  ChangeColor2(){
    var that=this;
    wx.request({
      url: 'http://127.0.0.1:8686/product_msg/add',
      method:'GET',
      success:(res)=>{
    var new_product=res.data.data;
    new_product=res.data.data.filter(item =>{
      return item.new_products=="true"
  })
     that.setData({
        currentIndex:2,
        foods:new_product
      })  }
    })
  },
  ChangeColor3(){
    this.ChangeColor5();
  },
//价格从低到高排序
ChangeColor5(){
  var that=this;
  wx.request({
    url: 'http://127.0.0.1:8686/product_msg/add',
    method:'GET',
    success:(res)=>{
  var upPrice=res.data.data;
  upPrice.sort(
    function(b,c){
        return b.outPrice2-c.outPrice2;
    }
);
   that.setData({
      currentIndex:5,
      foods:upPrice
    })  }
  })
},
//价格从高到低排序
ChangeColor6(){
  var that=this;
  wx.request({
    url: 'http://127.0.0.1:8686/product_msg/add',
    method:'GET',
    success:(res)=>{
  var downPrice=res.data.data;
  downPrice.sort(
    function(b,c){
        return c.outPrice2-b.outPrice2;
    }
);
   that.setData({
      currentIndex:6,
      foods:downPrice
    })  }
  })
},
// 打开筛选弹出层
showPopup(){
    this.setData({
      currentIndex:4,
      show: true 
    })
  },
  // 关闭筛选弹出层
onClose(){
    this.setData({ 
      show: false 
    });
  },
  //最低价格
downPrice(e){
 wx.setStorageSync('downPrice',e.detail.value);
  },
  //最高价格
upPrice(e){
  wx.setStorageSync('upPrice',e.detail.value);
  },
  // 筛选界面重置按钮
  reset(){
    this.setData({ 
      msg:""
    });
  },
  // 筛选界面确定按钮
  subOk(){
    var that=this;
    wx.request({
      url: 'http://127.0.0.1:8686/product_msg/add',
      method:'GET',
      success:(res)=>{
     var price=res.data.data.filter(item=>{
      if(wx.getStorageSync('upPrice')==""&&wx.getStorageSync('downPrice')!==""){
        return item.outPrice2>=wx.getStorageSync('downPrice');
      }else if(wx.getStorageSync('upPrice')!==""&&wx.getStorageSync('downPrice')==""){
        return item.outPrice2<=wx.getStorageSync('upPrice');
      }else if(wx.getStorageSync('upPrice')!==""&&wx.getStorageSync('downPrice')!==""){
        return item.outPrice2>=wx.getStorageSync('downPrice')&&item.outPrice2<=wx.getStorageSync('upPrice');
      }else{
        return item.outPrice2
      }
     });
     that.setData({
        foods:price,
        msg:''
      })  }
    })
    that.onClose();
  },
  // 首页搜索商品
  gotoSearch(){
  wx.navigateTo({
    url: '/pkgC/pages/commoditySearch/commoditySearch',
  })
  },
  // 获取全部商品
  bindInit(){
    var that=this;
    wx.request({
      url: 'http://127.0.0.1:8686/product_msg/add',
      method:'GET',
      success:(res)=>{
     that.setData({
        foods:res.data.data
      })  }
    })
  },
  // 从首页去商品详情
  goshop(e){
    e.currentTarget.dataset.info;
    wx.navigateTo({
      url:'/pages/product_detail/product_detail?name=首页&productId='+JSON.stringify(e.currentTarget.dataset.info),
    })
    wx.setStorageSync('info2',JSON.stringify(e.currentTarget.dataset.info2)
   );
  //立即购买界面存值
    wx.setStorageSync('info',JSON.stringify(e.currentTarget.dataset.info)
   )
  },
  /**
   * 生命周期函数--监听页面加载
   */
onLoad(options) {
var that=this;
that.bindInit();
// 获取轮播图
wx.request({
  url:'http://127.0.0.1:8686/indeximg/selectByState',
  method:'GET',
  success:(res)=>{
     var data1=res.data.data.filter(item =>{
      return item.state=="true"
  })
  that.setData({
      pic:data1
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
   this.bindInit();
   wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    wx.showLoading({
      title: '到底了',
    })
    setTimeout(()=>{
      wx.hideLoading();
    },1000);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})