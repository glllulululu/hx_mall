// 创建store实例对象
import {
  action,
  observable
} from 'mobx-miniprogram'
export const store = observable({
  phone:'',
  userName: 111,
  randomId: '',
  randomId1:'',
  getCid:action(function(count){
     // 随机生成用户数字编号，客户编号
     let array = [];
     // 判断是否5位数
     for (var j = 0; j < 4; j++) {
       var rand = parseInt(Math.random() * count);
       array.push(rand);
       // 如果小于位数4，就继续添加
     }
    //  console.log(array);
     let arr = array.join("")
     // 生成时间戳
     var date = new Date();
     var year = date.getFullYear();
     var month = date.getMonth() + 1;
     var day = date.getDate();
     var hours = date.getHours()
     year = (year + "").substring(2);
     if (month < 10) {
       month = "0" + month
     }
     if (day < 10) {
       day = "0" + day
     }
     if (hours < 10) {
       hours = "0" + hours
     }
     // 在这里修改了mobx的randomId值
       this.randomId= year + month + day + hours + arr
  }),
  getCid1:action(function(count){
   //获取订单号
     let array1= [];
     for (var i = 0; i <2; i++) {
       var rand = parseInt(Math.random() * count);
       array1.push(rand);
     }
     let arr1= array1.join("")
    // 生成时间戳
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours()
    year = (year + "").substring(2);
    if (month < 10) {
      month = "0" + month
    }
    if (day < 10) {
      day = "0" + day
    }
    if (hours < 10) {
      hours = "0" + hours
    }
    // 在这里修改了mobx的randomId值
      this.randomId1= year + month + day + hours + arr1
 }),
})