// pages/orderAll/orderAll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["全部", "待支付", "待发货", "待收货", "待评价"],
    tabIndex: 0,
    sliderLeft: 0,
    sliderOffset: 0,
    sliderOffsets: [],
    // 全部订单数据
    // 当前用户id
    currentId: '',
    // 是否有订单
    haveOrder: false,
    // 循环订单数据
    showOrder: [],
    showOrder1: [],
    // 用户是否登录
    orderId: '',
    allPrice: '',
    // 订单状态
    orderState: '',
    haveState: 0,
    stateUse: '',
    state2:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '订单列表',
    });
    // 菜单滑动
    // 这个是异步调用，同步返回，所以需要记录this
    let that = this;
    // 获取设备相关信息
    wx.getSystemInfo({
      success: function (res) {
        // 获取每个tab头的宽度
        let windowWidth = res.windowWidth;
        let itemWidth = windowWidth / that.data.tabs.length;
        //记录每个项的滑动距离
        let itemBox = [];
        for (let i in that.data.tabs) {
          itemBox.push(itemWidth * i)
        }
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - 48) / 3,
          sliderOffsets: itemBox,
          sliderOffset: 0,
          itemWidth: itemWidth,
          windowWidth: windowWidth
        })
      }
    });
    // 获得当前id
    wx.getStorage({
      key: "currentId",
      success(res) {
        that.setData({
          currentId: res.data
        });
      },
    });
    // 初始化数据
    this.init()

  },
  // tab点击函数
  onTabClick(e) {
    // 点击对应项，调用对应移动距离
    let newOffset = this.data.sliderOffsets[e.currentTarget.id];
    this.setData({
      tabIndex: e.currentTarget.id,
      sliderOffset: newOffset
    });
    switch (parseInt(e.currentTarget.id)) {
      // 全部
      case 0:
        let temp = this.data.showOrder;
        this.setData({
          showOrder1: temp
        });

        break;
        // 待付款
      case 1:
        let temp1 = this.data.showOrder.filter(item => {
          return item.state == '6'
        })
        this.setData({
          showOrder1: temp1
        });
        this.have('6')
        break;
        // 代发货
      case 2:
        let temp2 = this.data.showOrder.filter(item => {
          return item.state == '0'
        })
        this.setData({
          showOrder1: temp2
        });
        this.have('0')
        break;
        // 待收货
      case 3:
        let temp3 = this.data.showOrder.filter(item => {
          return item.state == '1'
        })
        this.setData({
          showOrder1: temp3
        });
        this.have('1')
        break;
        // 待评价
      case 4:
        let temp4 = this.data.showOrder.filter(item => {
          return item.state == '2'
        })
        this.setData({
          showOrder1: temp4
        });
        this.have('2')
        break;
    }
  },
  // swiper滑动事件
  swiperChange(e) {
    this.setData({
      sliderOffset: this.data.sliderOffsets[e.detail.current],
      tabIndex: e.detail.current
    })
  },
  // 获取订单信息
 
  init() {
    const that = this
    // 订单全部信息
    wx.request({
      url: 'http://127.0.0.1:8686/order/selectByCid',
      method: 'GET',
      data: {
        cid:wx.getStorageSync('customId')
      },
      success: (res) => {
        console.log(res);
        console.log('返回该用户全部订单成功');
        if (res.data.length > 0) {
          console.log('有数据');
          this.setData({
            showOrder: res.data,
            haveOrder: true
          });
        } else {
          console.log('没数据')
          this.setData({
            haveOrder: false
          });
        }
        this.setData({
          showOrder1: this.data.showOrder
        });

      }
    });
    // 订单的总价，编号
    wx.request({
      url: 'http://127.0.0.1:8686/selectInfo/ByCid',
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      data: {
        cid: wx.getStorageSync('customId')
      },
      success(res) {
        console.log(res);
        that.setData({
          allPrice: res.data[0].allPrice,
          orderId: res.data[0].orderId,
          state2:res.data[0].state
        });

      }
    })
    // 查看订单状态
    wx.request({
      url: 'http://127.0.0.1:8686/selectState/ByCid',
      data: {
        cid: wx.getStorageSync('customId')
      },
      success(res) {
        that.setData({
          orderState: res.data[0].state
        });
      }
    })
  },
  // 看订单有那些状态
  have(s) {
    let that = this
    wx.request({
      url: 'http://127.0.0.1:8686/selectState/have',
      method: 'GET',
      data: {
        state: s,
        cid: wx.getStorageSync('customId')
      },
      success(res) {
        console.log(res.data);
        for (var key in res.data[0]) {
          that.setData({
            haveState: res.data[0][key]
          })
        }
      }
    })
  },
  // 编程式导航
  gotocomment(e) {
    // let oid= encodeURIComponent(JSON.stringify(e.currentTarget.dataset.oid));
    // let pname= encodeURIComponent(JSON.stringify(e.currentTarget.dataset.pname));
    let oid = e.currentTarget.dataset.oid;
    let pname = e.currentTarget.dataset.pname;
    let pid = e.currentTarget.dataset.pid
    wx.navigateTo({
      url: `/pkgB/pages/goComment/goComment?orderId=${oid}&&productName=${pname}&&productId=${pid}`,
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
    wx.getStorage({
      key: "isLogin",
      success(res) {
        console.log(res.data);
      },
    })
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