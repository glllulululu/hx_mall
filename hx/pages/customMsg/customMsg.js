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
    userInfo: '',
    isLogin: false,
    // 新的随机id
    customId: '',
    discountCount: 0,
    address: '我现在是空的',
    phone: '1234566',
    // 当前登录用户id
    currentId: '',
    // 优惠券数量
    componCount: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      newLogin: this.data.isLogin
    })
    // 是否一打开就就获取用户信息
    // if (wx.getUserProfile) {
    //   this.setData({
    //     isLogin: true
    //   })
    // }
    // }
    // 获取mobx数据
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['randomId'], //接收需要的字段
      actions: ['getCid']
    })
    this.getCid(10);
  },
  get() {
    wx.setStorageSync('isLogin', this.data.isLogin)
  },
  // 授权
  getuserinfo(res) {
    var that = this;
    // wx.getUserProfile获取用户信息弹窗
    wx.getUserProfile({
      // 声明用途
      desc: '获取会员信息',
      // 用户点击确认调用
      success: (res) => {
        this.setData({
          isLogin: true,
          userInfo: res.userInfo
        });
        // 筛选数据库里有没有相同的id
        if (this.data.isLogin == true) {
          var that = this;
          // 查询数据库有没有这个id,没有就创建用户
          wx.request({
            url: 'http://127.0.0.1:8686/select/cid',
            data: {
              customs_id: this.data.randomId,
              nickName: this.data.userInfo.nickName
            },
            method: 'get',
            header: {
              'content-type': 'application/json'
            },
            // 查询id成功
            success(res) {
              that.setData({
                currentId: that.data.randomId
              });

              //如果没有这个id就存入该用户
              if (res.data == '') {
                that.setData({
                  // 这个customId是要存储到数据据库里面的
                  customId: that.data.randomId,
                })
                wx.request({
                  url: 'http://127.0.0.1:8686/insert/custom',
                  method: 'GET',
                  data: {
                    custom_pic: that.data.userInfo.avatarUrl,
                    customs_id: that.data.customId,
                    discount: that.data.discountCount,
                    telphone: that.data.phone,
                    nickName: that.data.userInfo.nickName
                  },
                  success() {
                    console.log('添加用户成功');
                  }
                })
              } else {
                wx.request({
                  url: 'http://127.0.0.1:8686/selectId/ByName',
                  method: 'GET',
                  data: {
                    nickName: that.data.userInfo.nickName
                  },
                  // 得到当前用户登录id
                  success(res) {
                    that.setData({
                      // 当前用户id
                      currentId: res.data[0].customs_id,
                    });

                    // console.log(that.data.join);
                    wx.setStorageSync(
                      'currentId', that.data.currentId
                    );
                    wx.getStorage({
                      key: "currentId",
                      success(res) {
                        console.log('currentId');
                  wx.setStorageSync('userName',that.data.currentId)
                      },
                    }, );
                  }
                })
              }
            },
            fail() {
              console.log('失败');
            }
          });
          // 查询该用户有没有优惠券
          wx.request({
            url: 'http://127.0.0.1:8686/coupon/selectByCid',
            method: 'get',
            data: {
              cid: that.data.currentId
            },
            success(res) {
              if (res.data.length > 0) {
                that.setData({
                  componCount: res.data
                })
              } else {
                that.setData({
                  componCount: 0
                })
              }
            }
          })
        }
        wx.setStorage({
          key: "userInfo",
          data: res.userInfo
        });
      },
      // 用户拒绝之后调用
      fail: (res) => {
        this.setData({
          isLogin: false
        })
        wx.showModal({
          title: '提示',
          content: '需要登录才能购买哦',
          complete: (res) => {
            if (res.cancel) {}
            if (res.confirm) {}
          }
        })
      }
    })
  },

  // 退出
  exitUser(res) {
    wx.clearStorageSync('userName');
    wx.clearStorageSync('currentId');
    // wx.clearStorageSync('customId');
    wx.clearStorageSync('login');
    wx.showModal({
      title: '警告',
      content: '确定退出红星商城吗',
      complete: (res) => {
        if (res.confirm) {
          this.setData({
            isLogin: false
          })
          wx.removeStorage({
            key: 'userInfo',
            success(res) {
              console.log('退出登录', res);
            }
          });
        }
      }
    })
  },

  // wx.getStorage({
  //   key: "userInfo",
  //   success(res){
  //     console.log('成功存储');
  //   },
  //   fail(){
  //     console.log();
  //   }
  // })
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      isLogin:wx.getStorageSync('login'),
      currentId:wx.getStorageSync('customId')
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
    this.storeBindings.destroyStoreBindings();
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