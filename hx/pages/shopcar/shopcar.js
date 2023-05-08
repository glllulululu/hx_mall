Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    comments:[],
    no_comments:[],
    sales:[],
    msg:'',
    cart:[],        // 购物车列表
    hasList:false,     // 列表是否有数据
    selected:false,
    editTrue: false,
    showModalStatus: false,
    editText: '编辑',
    check:0,
    show5:false
  },
  showedit() {
    var that = this;
    if (that.data.editTrue == true) {
      that.setData({
        editTrue: false,
        editText: '编辑'
      })
  
    } else {
      that.setData({
        editTrue: true,
        editText: '完成',
      })
    }
  },
  gotoIndex(){
    wx.switchTab({
      url: '/pages/Index_page/Index_page',
    })
  },
  //从购物车商品推荐去商品详情
  gotodetail(e){
    e.currentTarget.dataset.info3;
    wx.navigateTo({
      url:'/pages/product_detail/product_detail?productId='+JSON.stringify(e.currentTarget.dataset.info3),
    })
  },
//购物车总价计算
getTotalPrice() {
  let cart =this.data.carts ;         // 获取购物车列表
  let total = 0;
  for(let i = 0; i<cart.length; i++) {     // 循环列表得到每个数据
    if(cart[i].selected) {          // 判断选中才会计算价格
      total += cart[i].Count * cart[i].outPrice2;   // 所有价格加起来
    }
  }
  this.setData({                // 最后赋值到data中渲染到页面
    car: cart,
    totalPrice: total.toFixed(2)
  });
},

//数量加
// 减少事件处理函数
handleMinus(e) {
  const index = e.currentTarget.dataset.index;
  let carts = this.data.carts;
  let Count1= carts[index].Count1;
  if(Count1 <= 1){
   return false;
  }
  Count1 = Count1 - 1;
  carts[index].Count1 = Count1;
  this.setData({
   carts: carts
  });
  this.getTotalPrice();
},

// 增加事件处理函数
handlePlus(e) {
  const index = e.currentTarget.dataset.index;
  let carts = this.data.carts;
  let Count1 = carts[index].Count1 ;
  if(Count1<wx.getStorageSync('stock')){
    Count1 = Count1  + 1;
  }else{
    wx.showToast({
      title: '购买数量超出库存',
      icon:'none'
    })
  }
  carts[index].Count1  = Count1 ;
  this.setData({
   carts: carts
  });
  this.getTotalPrice();
},
// 输入框事件处理函数
handleInput(e) {
  let index = e.currentTarget.dataset.index;
  let carts = this.data.carts;
  let Count1 =e.detail.value;
  if (Count1 < 1) {
    Count1 = 1;
  }
  carts[index].Count1 = Count1;
  this.setData({
    carts: carts
  })
},
//购物车展示
Binit(){
// 购物车界面
var that=this;
wx.request({
  url: 'http://127.0.0.1:8686/buycar/list',
  header: {      
    'content-type': 'application/json' 
   },   
  method:'GET',
  data:{
  buycarId:wx.getStorageSync('buycarId')||"2050"
  },
  success:(res)=>{
      that.setData({
        hasList: true,
        carts:res.data.data,
      })
      let list=[];
      this.data.carts.forEach(item=>{
        list.push(item.Count1)
      })
      let sum=0;
      list.forEach(item=>{
        sum=sum+item
      })
      wx.setStorageSync('sum1',sum)
     }
})
},
//购物车商品推荐
saleBinit(){
  //商品推荐
  var that=this;
  wx.request({
    url: 'http://127.0.0.1:8686/product/sale',
    method:'GET',
    success:(res)=>{
    var data5=res.data.data
    var arr=[];
    for(var i=0;i<6;i++){
      const index1=parseInt(Math.random()*data5.length);
     arr.push(data5[index1]);
    }
    let newarr=[];
    arr.filter((item)=>{
      newarr.includes(item)?'':newarr.push(item)
    })
    that.setData({
     sales:newarr
    })
  }
  })
},
//从购物车去商品详情
gobuycarDetail(e){
  wx.setStorageSync('info',JSON.stringify(e.currentTarget.dataset.buycar));
  console.log(wx.getStorageSync('info'))
  wx.navigateTo({
    url: '/pages/product_detail/product_detail?name=分类&productId='+JSON.stringify(e.currentTarget.dataset.buycar),
  })
},
//购物车选中事件
gotoRadio(e){
  e.currentTarget.dataset.radio;
  wx.setStorageSync('radio', e.currentTarget.dataset.radio);
  // console.log(wx.getStorageSync('radio'));
},
goselect(event){
if(event.detail.value==''){
 this.setData({
   check:0
 })
 if(this.data.check==0){
  wx.request({
    url: 'http://127.0.0.1:8686/buycar/updateById',
    header: {      
      'content-type': 'application/json' 
     },   
    method:'GET',
    data:{
    selectState:"0",
     buycarId:wx.getStorageSync('buycarId'),
     productId:wx.getStorageSync('radio')
    },
    success:(res)=>{
    wx.showToast({
      title: '取消勾选',
      icon:'success'
    })
       }
 })
 this.Binit();
}
}else{
  this.setData({
    check:1
  })
  if(this.data.check==1){
    wx.request({
      url: 'http://127.0.0.1:8686/buycar/updateById',
      header: {      
        'content-type': 'application/json' 
       },   
      method:'GET',
      data:{
      selectState:"1",
       buycarId:wx.getStorageSync('buycarId'),
       productId:wx.getStorageSync('radio')
      },
      success:(res)=>{
      wx.showToast({
        title: '勾选成功',
        icon:'success'
      })
         }
   })
  }
  this.Binit();
}
},
onClickButton(){
 // 购物车删除事件
 wx.request({
  url: 'http://127.0.0.1:8686/buycar/deleteById',
  header: {      
    'content-type': 'application/json' 
   },   
  method:'GET',
  data:{
   selectState:"1"
  },
  success:(res)=>{
  wx.showToast({
    title: '删除成功',
    icon:'success'
  })
     }
})
this.Binit();
},
//去结算
onClickSettle(){
  // // 1.获取数据
  // console.log("当前购物车的数据 : " + JSON.stringify(this.data.carts));
  // var that=this;
  // console.log("that.data.carts : " + JSON.stringify(that.data.carts));
  // wx.request({
  //   url: 'http://127.0.0.1:8686/buycarcount/updateById',
  //   header: {      
  //     'content-type': 'application/json' // 默认值
  //    },   
  //   method:'GET',
  //   data:{
  //     carts: that.data.carts,
  //     buycarId:wx.getStorageSync('buycarId')
  //   },
  // success:(res)=>{

  //   }

  // })
if(wx.getStorageSync('userName')!==""||wx.getStorageSync('customId')!==""){
wx.navigateTo({
  url: '/pages/order/order?name=购物车',
})
  }
  else{
    this.setData(
      { 
        show5:true
      }
      );
  }
},
//授权登录
onClose(){
  this.setData({ 
    show5: false
  });
},
gotoClose(){
  this.setData({ show5: false });
},
onClickShow(){
  wx.getUserProfile({
      desc: '获取会员信息',
      success: (res) => {
        this.setData({
           isLogin:true,
           userInfo:res.userInfo
        })
        wx.showToast({
          title: '登陆成功',
          icon:'success'
        })
    //查询数据库是否存在该用户
    var that=this;
        wx.request({
          url: 'http://127.0.0.1:8686/selectId/ByName',
          method: 'GET',
          data: {
            nickName: that.data.userInfo.nickName.replace("'","")
          },
          success(res) {
            that.setData({
      // 当前用户id
              customId: res.data[0].customs_id,
              join: true
            });
      wx.setStorageSync('login',that.data.isLogin)
      wx.setStorageSync('customId',that.data.customId)
      }
    }),
    that.setData({ 
      show5:false
    });
  }})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.Binit();
    this.saleBinit();
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // this.goselect();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var that=this;
    wx.request({
      url: 'http://127.0.0.1:8686/buycar/list',
      header: {      
        'content-type': 'application/json' // 默认值
       },   
      method:'GET',
      data:{
      buycarId:wx.getStorageSync('buycarId')
      },
      success:(res)=>{
       that.setData({
         hasList: true,
         carts:res.data.data,
       })
       if(this.data.carts.length>0){
        that.setData({
           hasList: true,
         })
       }else{
        that.setData({
          hasList: false,
        })
       }
       let list=[];
       this.data.carts.forEach(item=>{
         list.push(item.Count1)
       })
       let sum=0;
       list.forEach(item=>{
         sum=sum+item
       })
       wx.setStorageSync('sum1',sum)
      }
    })
    // 购物车商品推荐
    that.saleBinit();
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