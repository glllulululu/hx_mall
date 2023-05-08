Page({
  data: {
    phoneCode: '86',
    verifyCode: '',
    //手机号
    phone: '',
    //手机号防止多次点击
    button: false,
    //发送验证码按钮初始内容
    text: '发送验证码'
  },
  Timer() {},
  choosePhoneCode() {
    wx.navigateTo({
      url: '/pkgD/pages/countryPhoneCode/countryPhoneCode',
    })
  },

  getCodeValue(e) {
    let verifyCode= e.detail.value;
    this.setData({
      verifyCode: verifyCode
    })
    
  },
  // 手机号
  phone(e) {
    let phone = e.detail.value;
    this.setData({
      phone: phone
    })
  },
  // 验证码
  setCode() {
    let that = this;
    //data里取出之前存入的手机号
    let phone = this.data.phone;
    //验证手机号格式是否正确
    var phone_reg = /^1[35789]\d{9}$/;
    if (!phone_reg.test(phone)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: "none"
      })
      return;
    };
    // this.setData({ text:'发送中'}) ;
    this.setData({button:true});
    setTimeout(() => {
      wx.showToast({
        title: '验证码已发送',
        icon: "none"
      }); //弹出提示框
      //示例默认1234，生产中请删除这一句。
      that.setTimer(); //调用定时器方法
    }, 1000)
  },
  setTimer() {
    let that = this;
    let holdTime = 60; //定义变量并赋值
    this.setData({ text:'重新获取(60)'});
    //setInterval（）是一个实现定时调用的函数，可按照指定的周期（以毫秒计）来调用函数或计算表达式。
    //setInterval方法会不停地调用函数，直到 clearInterval被调用或窗口被关闭。
    this.Timer = setInterval(() => {
      if (holdTime <= 0) {
        this.setData({button:false});
        that.setData({text:'获取验证码'});
        clearInterval(that.Timer); //清除该函数
        return; //返回前面
      }
      that.setData({ text:"重新获取(" + holdTime + ")"});
      // that.Text = "重新获取(" + holdTime + ")" ;
      holdTime--;
    }, 1000)
  },
  submitData(e) {
    if (this.data.verifyCode != 1234) {
      wx.showToast({
        title: '验证码不正确',
        icon: "none"
      });
      return;
    }
    wx.setStorageSync('info1',(this.data.phone))
       console.log(wx.getStorageSync('info1'))
      wx.navigateBack();
    wx.showLoading({
      title: '登入成功',
      icon: 'none',
      duration: 1500
    })
  }

})