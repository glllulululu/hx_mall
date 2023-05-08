Page({
  /**
   * 页面的初始数据
   */
  data: {
   goods:[],
   comments:[],
   no_comments:[],
   isReplay:true,
   sales:[],
   show:false,
   msg:'',
   state:0,
   show2:false,
   addCount:[],
   addCount1:[],
   num:1,
   num1:1,
   minusStatus:'disabled',
   msg1:true,
   show3:false,
   isLogin:false,
  customId:'',
  userInfo:'',
  buycarCount:wx.getStorageSync('sum1')
  },
  // 从首页去评价详情
  godetail(e){
   wx.navigateTo({
     url: '/pkgA/pages/comment_detail/comment_detail?productId='+JSON.stringify(e.currentTarget.dataset.info1),
   })
   console.log(e.currentTarget.dataset.info1);
  },
  // 返回首页
  goback(){
    wx.navigateBack();
  },
  // 从推荐商品去商品详情
  gotodetail(e){
    this.setData({
    addCount:[]
    })
    e.currentTarget.dataset.info3;
    wx.setStorageSync('sale_info',e.currentTarget.dataset.info3)
    wx.navigateTo({
      url:'/pages/product_detail/product_detail?productId='+JSON.stringify(e.currentTarget.dataset.info3),
    })
  },
  // 去我的界面
  gotoMy(){
  wx.switchTab({
  url: '/pages/customMsg/customMsg',
  })
  },
  //去首页
  gotoIndex(){
wx.switchTab({
  url: '/pages/Index_page/Index_page',
})
  },
// 立即购买
  goBuy(){
    if(wx.getStorageSync('userName')!==""||wx.getStorageSync('customId')!==""){
      this.setData(
        { 
          show2:true,
          show:false,
        }
        );
      var that=this;
      wx.request({
      url: 'http://127.0.0.1:8686/product/car',
      method:'GET',
      success:(res)=>{
  if(this.data.addCount==[]){
    var add=res.data.data.filter(item =>{
       return item.productId==wx.getStorageSync('sale_info')
    })
  }else{
     var add=res.data.data.filter(item =>{
         return item.productId==wx.getStorageSync('info')
       })
  }
      add.filter(item=>{
 //  存入进入确认订单的数据
       wx.setStorageSync('stock', item.stock);
       wx.setStorageSync('order_pic', item.imgUrl);
       wx.setStorageSync('order_productName', item.productName);
       wx.setStorageSync('order_price', item.outPrice2);
     })
       that.setData({
       addCount:add
         })
    }})
    }else{
      this.setData({
        show: true,
      })
    }
  },
  onClose(){
    this.setData({ 
      show: false
    });
  },
  gotoClose(){
    this.setData({ show: false });
  },
  //设置昵称
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
      show:false
    });
  }})},
  // 获取完头像昵称保存，进入立即购买菜单
  onClose1() {
    this.setData({ 
      show2: false
    });
  },
  //立即购买事件
    // 数量减
    bindMinus(){
      var num = this.data.num;  
      // 如果大于1时，才可以减  
      if (num > 1) {  
          num --; 
          wx.setStorageSync('reduceCount',this.data.num) 
      }else{
        wx.showToast({
          title:'本产品1件起售',
          icon:"none"
        })
      }  
      // 只有大于一件的时候，才能normal状态，否则disable状态  
      var minusStatus = num <= 1 ? 'disabled' : 'normal';  
      // 将数值与状态写回  
      this.setData({  
          num: num,  
          minusStatus: minusStatus  
      });  
    },
    bindPlus: function() {  
      var num = this.data.num;  
      // 自增1  
      if(num<wx.getStorageSync('stock')){
        num ++;  
      }else{
      wx.showToast({
        title:'购买数量超出库存',
        icon:"none"
      })
      }
      // 只有大于一件的时候，才能normal状态，否则disable状态  
      var minusStatus = num < 1 ? 'disabled' : 'normal';  
      // 将数值与状态写回  
      this.setData({  
          num: num,  
          minusStatus: minusStatus  
      });  
  },  
  /* 输入框事件 */  
  bindManual: function(e) {  
    // 判断输入框的内容是否是数字型
      var num = e.detail.value;  
      var rex=/^[0-9]+$/;
      var flg=rex.test(num);
      if(flg){
      // 将数值与状态写回  
      this.setData({  
      num: num  
      }); 
      }else{
      this.setData({  
      num:1 
      }); 
      }
  }, 
  // 确认订单
  orderOk(){
  wx.setStorageSync('addCount', this.data.num);
  wx.navigateTo({
    url: '/pages/order/order?name=立即购买',
  })
  },
//加入购物车
 //去购物车
 gobuycar(){
  wx.switchTab({
    url: '/pages/shopcar/shopcar',
  })
},
//生成要加入购物车的商品
addcar(){
  this.setData({ show3: true });
  var _that=this;
  wx.request({
    url: 'http://127.0.0.1:8686/product/car',
    method:'GET',
    success:(res)=>{
      console.log(res.data.data);
        var add1=res.data.data.filter(item =>{
          return item.productId==wx.getStorageSync('info')
        })
      res.data.data.filter(item=>{
        wx.setStorageSync('stock', item.stock)
      })
      console.log(add1)
     _that.setData({
      addCount1:add1
     })
}})
},
//提交加购商品信息
car_Confirm(){
      // 获取商品ID和商品数量
    var buycarId=wx.getStorageSync('buycarId')
    // var custom_id=wx.getStorageSync('userName')
     var procudtId = wx.getStorageSync('info');
      var Count = this.data.num1;
      // 调用后端接口
      // 参数两个：商品ID和商品数量
  if(buycarId==""){
   //当前没有购物车，创建购物车    
   //获得时间戳购物车编号
  var shoppingCarId =new Date().getFullYear()+ (new Date().getMonth() + 1) + new Date().getDate();
          // 存储
  wx.setStorageSync('buycarId', shoppingCarId);
      }else{
  wx.setStorageSync('buycarId',buycarId);
  }
  wx.request({
    url: 'http://127.0.0.1:8686/product/carlist',
    header: {      
      'content-type': 'application/json' // 默认值
     },   
    method:'GET',
    data:{
      productId:procudtId,
      Count1:Count,
      buycarId:wx.getStorageSync('buycarId'),
      custom_id:wx.getStorageSync('customId'),
      selectState:"0"
    },
    success:(res)=>{
      console.log(res.data)
      wx.showToast({
        title:'添加购物车成功',
        icon:'none'
      })
      this.setData({
        show3:false
      })
    }
  })
  },
    // 关闭弹出层
onClose2() {
  this.setData({ show3: false });
    },
  //加入购物车事件
      // 数量减
      bindMinus1(){
        var num1 = this.data.num1;  
        // 如果大于1时，才可以减  
        if (num1 > 1) {  
            num1 --; 
            wx.setStorageSync('reduceCount',this.data.num1) 
        }else{
          wx.showToast({
            title:'本产品1件起售',
            icon:"none"
          })
        }  
        // 只有大于一件的时候，才能normal状态，否则disable状态  
        var minusStatus1= num1 <= 1 ? 'disabled' : 'normal';  
        // 将数值与状态写回  
        this.setData({  
            num1: num1,  
            minusStatus1: minusStatus1  
        });  
      },
      bindPlus1: function() {  
        var num1 = this.data.num1;  
        // 自增1  
        if(num1<wx.getStorageSync('stock')){
          num1++;  
        }else{
        wx.showToast({
          title:'购买数量超出库存',
          icon:"none"
        })
        }
        // 只有大于一件的时候，才能normal状态，否则disable状态  
        var minusStatus1 = num1 < 1 ? 'disabled' : 'normal';  
        // 将数值与状态写回  
        this.setData({  
            num1: num1,  
            minusStatus1: minusStatus1  
        });  
    },  
    /* 输入框事件 */  
    bindManual1: function(e) {  
      // 判断输入框的内容是否是数字型
        var num1 = e.detail.value;  
        var rex=/^[0-9]+$/;
        var flg=rex.test(num1);
        if(flg){
        // 将数值与状态写回  
        this.setData({  
        num1: num1  
        }); 
        }else{
        this.setData({  
        num1:1 
        }); 
        }
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that=this;
    // 获取指定商品详情
    wx.request({
      url: 'http://127.0.0.1:8686/product/detail',
      method:'GET',
      success:(res)=>{
    var data2=res.data.data.filter(item =>{
      return item.productId==options.productId
    })
     that.setData({
        goods:data2
      })
    }
    }),
    // 筛选已评价的商品
    wx.request({
      url: 'http://127.0.0.1:8686/product/comment',
      method:'GET',
      success:(res)=>{
      var data3=res.data.data.filter(item =>{
          return item.productId==options.productId
        })
        res.data.data.filter(item =>{
         if(item.repaly!==""){
        that.setData({
          isReplay:false
        })
         }
      })
     that.setData({
       comments:data3
      })  }
    }),
    // 筛选未评价的商品
    wx.request({
      url: 'http://127.0.0.1:8686/product/no_comment',
      method:'GET',
      success:(res)=>{
      var data4=res.data.data.filter(item =>{
          return item.id==options.productId&&item.state3=="10"
        })
     that.setData({
       no_comments:data4
      })  }
    }),
    // 推荐商品
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
  // 设置每页标题
    if(options.name=="首页"){
      wx.setNavigationBarTitle({
      title:JSON.parse(wx.getStorageSync('info2')),
      })
      }
      else if(options.name=="分类"){
        wx.setNavigationBarTitle({
          title:JSON.parse(wx.getStorageSync('info8')),
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