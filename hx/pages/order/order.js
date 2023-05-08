import {
  set
} from 'mobx-miniprogram';
import {
  createStoreBindings
} from 'mobx-miniprogram-bindings';
import {
  store
} from '../../store/store'
Page({
  /**
   * 页面的初始数据
   */
  data: {
  address:[],
  msg:"",
  msg1:"",
  order_pic:"",
  order_productName:"",
  order_price:"",
  order_count:"",
  total_price:0,
  total_price1:'',
  show:false,
  active:0,
  discount:[],
  lose_discount:[],
  discount2:[],
  msg2:'',
  msg3:'',
  msg4:'',
  msg5:'',
  msg6:'',
  msg7:true,
  msg8:'领取',
  msg9:'',
  msg10:false,
  state:0,
  state1:true,
  leaveMsg:'',
  orderBuy:[],
  isShow1:"",
  isShow2:false,
  },
  // 查看可使用的优惠券
  gotoDiscount(){
    this.setData({
      show:true
    })
    if(this.data.msg2=="暂无优惠券可用"){
      var that=this;
      // 获取优惠券
      wx.request({
        url: 'http://127.0.0.1:8686/order/discount',
        method:'GET',
        success:(res)=>{
      var date=new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
      var data1=res.data.data.filter(item =>{
        return Date.parse(item.end_time)>=Date.parse(date)&&item.threshold<that.data.total_price1;
      })
      if(data1.length==0){
      that.setData({
        msg3:"暂无可用优惠券"
      })
      }
      var data2=res.data.data.filter(item =>{
        return Date.parse(item.end_time)<Date.parse(date);
      })
      var data3=res.data.data.filter(item =>{
        return Date.parse(item.end_time)>=Date.parse(date);
      })
       that.setData({
          discount:data1,
          lose_discount:data2,
          discount2:data3,
          msg4:'优惠券已失效',
          msg5:'订单金额不满足'
        })
      }
     })
    }else{
      var that=this;
      // 获取优惠券
      wx.request({
        url: 'http://127.0.0.1:8686/order/discount',
        method:'GET',
        success:(res)=>{
      var date=new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
      var data1=res.data.data.filter(item =>{
        return Date.parse(item.end_time)>=Date.parse(date)
      })
      var data2=res.data.data.filter(item =>{
        return Date.parse(item.end_time)<Date.parse(date);
      })
    that.setData({
      discount:data1,
      msg5:'',
      lose_discount:data2,
      msg4:'优惠券已失效',
    })
    }
  })
  }
  },
  onClose(){
    this.setData({
      show:false
    })
  },
  // 领取优惠券
  receive(){
    wx.request({
      url: 'http://127.0.0.1:8686/save/discount',
      header:{
      'content-type':'application/json'
      },
      method:'GET',
      data:{
      discount:1,
      customs_id:wx.getStorageSync('customId')||wx.getStorageSync('userName')
      },
      success:(res)=>{
     wx.showToast({
      title: '领取成功',
      icon:'success'
    })
    }
    })
  this.setData({
      msg6:'您已领取1张优惠券，共抵用￥1',
      msg7:false,
      msg8:'已领取',
      msg10:true
      })
wx.request({
  url: 'http://127.0.0.1:8686/discount/add',
  header:{
  'content-type':'application/json'
  },
  method:'GET',
  success:(res)=>{
wx.showToast({
  title: '领取成功',
  icon:'success'
})
}
})
  },
  gotouse(){
// 使用优惠券
    wx.request({
      url: 'http://127.0.0.1:8686/discount/addUse',
      header:{
      'content-type':'application/json'
      },
      method:'GET',
      success:(res)=>{
     wx.showToast({
      title: '已使用',
      icon:'success'
    })
    }
    });
    if(this.options.name=="购物车"){
      this.setData({
        msg8:'已领取',
        msg7:true,
        show:false,
        msg2:'-1',
        total_price1:wx.getStorageSync('total')-1,
        })
    }
    else if(this.options.name=="立即购买"){
      this.setData({
        msg8:'已领取',
        msg7:true,
        show:false,
        msg2:'-1',
        total_price1:wx.getStorageSync('order_price')*wx.getStorageSync('addCount')-1
        })
    }
  },
  //留言
  gotoLeave(e){
  wx.setStorageSync('leaveMsg',e.detail.value);
  },
  //付款
  gotoPay(e){
  this.getCid1(e.target.dataset.step);
  wx.setStorageSync('orderId',this.data.randomId1)
  wx.setStorageSync('totalPrice', this.data.total_price1)
  this.getCid1(e.target.dataset.step);
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minute=date.getMinutes();
  var second=date.getSeconds();
  if (month < 10) {
    month = "0" + month
  }
  if (day < 10) {
    day = "0" + day
  }
  if (hours < 10) {
    hours = "0" + hours
  }
  if(minute<10){
    minute="0"+minute
  }
  if(second<10){
    second="0"+second
  }
  var date1=year +'-'+month +'-'+ day + ' '+hours+':'+minute+':'+second
    var that=this;
    var service_charge=that.data.total_price1*0.006;
  //总订单
    wx.request({
      url: 'http://127.0.0.1:8686/order/submit',
      header:{
      'content-type':'application/json'
      },
      method:'GET',
      data:{
      orderId:that.data.randomId1,
      cid:wx.getStorageSync('customId')||wx.getStorageSync('userName'),
      orderTime:date1,
      allPrice:that.data.total_price1,
      discount:that.data.msg2.substring(1),
      address:wx.getStorageSync('address'),
      detaddress:wx.getStorageSync('detaddress'),
      phone:wx.getStorageSync('telphone'),
      state:0,
      service_charge:service_charge,
      remark:wx.getStorageSync('leaveMsg')
      },
    success:(res)=>{
    wx.showToast({
      title: '提交成功',
      icon:'success',
      duration:2000
    })
    }});
    //订单明细（立即结算）
    if(this.options.name=="立即购买"){
      console.log(111);
      console.log(JSON.parse(wx.getStorageSync('info')));
      console.log(wx.getStorageSync('addCount'));
      console.log(wx.getStorageSync('order_price'));
      console.log(that.data.total_price1);
      console.log(wx.getStorageSync('telphone'));
      console.log(that.data.randomId1);
      wx.request({
        url: 'http://127.0.0.1:8686/order/detail',
        method:'GET',
        data:{
        orderId:that.data.randomId1,
        productId:JSON.parse(wx.getStorageSync('info')),
        count:wx.getStorageSync('addCount'),
        outPrice:wx.getStorageSync('order_price'),
        allPrice:that.data.total_price1,
        phone:wx.getStorageSync('telphone'),
        doneCom:"0"
        },
      success:(res)=>{
      wx.showToast({
        title: '提交成功',
        icon:'success'
      })
      }
      })
    }
   
    //订单明细(从购物车结算)
    if(this.options.name=="购物车"){
      wx.request({
        url: 'http://127.0.0.1:8686/detail/submit',
        method:'GET',
        data:{
        orderId:that.data.randomId1,
        carts:that.data.orderBuy,
        phone:wx.getStorageSync('telphone'),
        doneCom:"0"
        },
      success:(res)=>{
      wx.showToast({
        title: '提交成功',
        icon:'success'
      })
      }
      })
    }
  wx.navigateTo({
    url: '/pages/pay/pay',
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  // 获取mobx数据
  this.storeBindings = createStoreBindings(this, {
  store,
  fields: ['randomId1'], //接收需要的字段
  actions: ['getCid1']
  })
  this.getCid1(10);
  //立即购买
    var that=this;
    wx.request({
      url: 'http://127.0.0.1:8686/order/address',
      method:'GET',
      success:(res)=>{
      var address1=res.data.data.filter(item=>{
        return item.customs_id==wx.getStorageSync('customId')||item.customs_id==wx.getStorageSync('userName')
      })
      wx.setStorageSync('address',address1[0].address1);
      wx.setStorageSync('detaddress',address1[0].detaddress1);
      wx.setStorageSync('telphone',address1[0].telphone);

     if(address1.length!==0){
      that.setData({
      address:address1
       }) 
     } else{
      that.setData({
        msg:"请先添加收货地址",
        msg1:"请选择收货地址"
       }) 
     }
     }
    });
     //从购物车去结算
  wx.request({
    url: 'http://127.0.0.1:8686/order/buycar',
    header: {      
      'content-type': 'application/json' 
     },   
    method:'GET',
    data:{
    buycarId:wx.getStorageSync('buycarId')||"2050"
    },
    success:(res)=>{
        that.setData({
          orderBuy:res.data.data,
          isShow2:true,
        })
        let list=[];
        this.data.orderBuy.forEach(item=>{
          list.push(item.outPrice2*item.Count1)
        })
        let total=0;
        list.forEach(item=>{
          total=total+item
        })
        wx.setStorageSync('total',total)
       }
  })
  //是否领取过优惠券
  wx.request({
    url: 'http://127.0.0.1:8686/have/discount',
    header:{
      'content-type':'application/json'
      },
    method:'GET',
    data:{
      customs_id:wx.getStorageSync('customId')||wx.getStorageSync('userName')
    },
    success:(res)=>{
    var have_discount=res.data.data.filter(item=>{
      return item.customs_id==wx.getStorageSync('customId')||item.customs_id==wx.getStorageSync('userName')
    })
    if(options.name=="立即购买"){
      that.setData({
        order_pic:wx.getStorageSync('order_pic'),
        order_productName:wx.getStorageSync('order_productName'),
        order_price:wx.getStorageSync('order_price'),
        order_count:wx.getStorageSync('addCount'),
        total_price:wx.getStorageSync('order_price')*wx.getStorageSync('addCount'),
        isShow1:false,
        isShow2:false,
      })
    }
  else if(options.name=="购物车"){
    that.setData({
      isShow1:true,
      isShow2:true,
      total_price:wx.getStorageSync('total'),
    })
  }
    if(options.name=="购物车"){
      if(have_discount[0].discount!=="0"||wx.getStorageSync('total')<15){
        that.setData({
          total_price1:wx.getStorageSync('total'),
          msg2:"暂无优惠券可用",
          msg10:true,
          msg8:'已领取'
        })
        }else{
          that.setData({
            msg2:"有优惠券可领取",
            total_price1:wx.getStorageSync('total'),
            msg9:'使用'
          })
        }
    }
    else if(options.name=="立即购买"){
      if(have_discount[0].discount!=="0"||wx.getStorageSync('order_price')*wx.getStorageSync('addCount')<15){
        that.setData({
          total_price1:wx.getStorageSync('order_price')*wx.getStorageSync('addCount'),
          msg2:"暂无优惠券可用",
          msg10:true,
          msg8:'已领取'
        })
        }else{
          that.setData({
            msg2:"有优惠券可领取",
            total_price1:wx.getStorageSync('order_price')*wx.getStorageSync('addCount'),
            msg9:'使用'
          })
        }
    }
  }
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    if(this.data.address.length==0){
      wx.showToast({
        title: '请添加收货地址',
        icon:'none',
        duration:2000
      });
      this.setData({
        state:0,
        state1:true
      })
    }
    else if(this.data.total_price1<15){
      wx.showToast({
        title: '全场满15元起送哦',
        icon:'none',
        duration:2000
      })
      this.setData({
        state:0,
        state1:true
      })
    }     
    else if(this.data.address.length!==0&&this.data.total_price1>=15){
      this.setData({
        state:1,
        state1:false
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if(this.data.msg8=="已领取"){
      if(this.data.msg2=="暂无优惠券可用"){
        this.setData({
          discount2:[]
        })
      }
     }
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