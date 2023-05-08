// //链接数据库操作
const mysql=require('mysql');
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'hongxing'
});
connection.connect();
//gtt
//小程序首页封面
module.exports.indeximg_selectByState=function(callback){
  let sql=`select * from indeximg`;
  connection.query(sql,function(err,data){
      callback(data);
  });
}
//渲染小程序首页商品
module.exports.product_msg = function (callback) {
  let sql = `select productId,new_products,productName,outPrice2,outCount,imgUrl  from product a,product_img b where a.id=b.productId`;
  // limit ${pageIndex*8},${(pageIndex+1)*8}
  connection.query(sql, function (err, data) {
      callback(data);
  });
}
//渲染商品详情
module.exports.product_detail = function (callback) {
  let sql = `select  productId,productName,outPrice2,outCount,imgUrl,description,specification  from product a,product_img b where a.id=b.productId`;
  connection.query(sql, function (err, data) {
      callback(data);
  });
}
//用户评价(已评价)
module.exports.product_comment = function (callback) {
  let sql = `select head,cid,productId,comment,comment_type,orderTime,reply from comment`;
  connection.query(sql, function (err, data) {
      callback(data);
  });
}
//用户评价(未评价)
module.exports.product_no_comment = function (callback) {
  let sql = `select id,state3 from product`;
  connection.query(sql, function (err, data) {
      callback(data);
  });
}
//用户评价详情
module.exports.product_comment_detail = function (callback) {
  let sql = `select head,cid,productId,comment,comment_type,orderTime,reply from comment`;
  connection.query(sql, function (err, data) {
      callback(data);
  });
}
//推荐商品
module.exports.product_sale = function (callback) {
  let sql = `select  productId,productName,outPrice2,imgUrl from product a,product_img b where a.id=b.productId`;
  connection.query(sql, function (err, data) {
      callback(data);
  });
}
//立即购买进入选择页面
//展示加入购物车的某个商品数量
module.exports.product_car = function (callback) {
    let sql = `select  productId,productName,outPrice2,stock,imgUrl from product a,product_img b where a.id=b.productId`;
    connection.query(sql, function (err, data) {
        callback(data);
    });
  }
  //确定订单界面
  //选取收货地址
  module.exports.order_address = function (callback) {
      let sql = `select customs_id,telphone,customName,address1,detaddress1 from custom as a,address as b where a.customs_id=b.custom_id;`;
      connection.query(sql, function (err, data) {
          callback(data);
      });
    }
  //使用优惠券
  module.exports.order_discount = function (callback) {
      let sql = `select discount_name,discount_price,threshold,limit_price,end_time from discount`;
      connection.query(sql, function (err, data) {
          callback(data);
      });
    }
    //数据库增加优惠券领取数量
    module.exports.discount_add=function(callback){
      let sql=`update discount set count_receive=count_receive+1 where id=1;`;
      connection.query(sql,function(err,data){
          callback(data);
      });
  }
  //数据库增加优惠券使用数量
      module.exports.discount_addUse=function(callback){
        let sql=`update discount set count_use=count_use+1 where id=1;`;
        connection.query(sql,function(err,data){
            callback(data);
        });
    }
  //查询用户是否已经领取过了优惠券
  module.exports.have_discount = function (customs_id,callback) {
    let sql = `select discount,customs_id from custom where customs_id='${customs_id}'`;
    connection.query(sql, function (err, data) {
        callback(data);
    });
  }
  //用户领取了优惠券，存入数据库
  module.exports.save_discount=function(discount,customs_id,callback){
    let sql=`update custom set discount='${discount}' where customs_id='${customs_id}'`;
    connection.query(sql,function(err,data){
        callback(data);
    });
  }
  //从购物车去结算
module.exports.order_buycar = function (buycarId,callback) {
  let sql = `select a.Count1 ,b.outPrice2,a.productId,c.imgUrl,b.productName from buycar a 
  join product b on a.productId=b.id
  join product_img c on a.productId=c.productId
  where buycarId='${buycarId}' and selectState="1" order by create_time desc `;
  connection.query(sql, function (err, data) {
      callback(data);
  });
}
//   //提交订单（总订单）
module.exports.order_submit=function(orderId,cid,orderTime,allPrice,discount,address,detaddress,phone,state,service_charge,remark,callback){
  let sql=`insert into order1 values('${orderId}','${cid}','${orderTime}',${allPrice},'${discount}','${address}','${detaddress}',
  '${phone}','${state}',${service_charge},'${remark}')`;
  connection.query(sql,function(err,data){
      callback(data);
  });
}
//提交订单（从立即购买进入订单明细）
module.exports.order_detail=function(orderId,productId,count,outPrice,allPrice,phone,doneCom,callback){
  let sql=`insert into order_detail(orderId,productId,count,outPrice,allPrice,phone,doneCom) values('${orderId}',${productId},${count},${outPrice},${allPrice},'${phone}','${doneCom}')`;
  connection.query(sql,function(err,data){
    console.log(err);
      callback(data);
  });
}
  //提交订单（从购物车进入订单明细）
  module.exports.detail_submit=function(orderId,productId,count,outPrice,allPrice,phone,doneCom,callback){
    let sql=`insert into order_detail(orderId,productId,count,outPrice,allPrice,phone,doneCom) values('${orderId}',${productId},${count},${outPrice},${allPrice},'${phone}','${doneCom}')`;
    connection.query(sql,function(err,data){
      // console.log(err);
        callback(data);
    });
  }
  //付款
  module.exports.order_pay=function(state,orderId,callback){
    let sql=`update order1 set state='${state}' where orderId='${orderId}'`;
    connection.query(sql,function(err,data){
        callback(data);
    });
  }
//yl
// 该用户订单全部信息
module.exports.order_selectByCid = function (cid, callback) {
  let sql = `select * from order1 a
  join order_detail b on a.orderId=b.orderId
  join product c on b.productId=c.id
  join product_img d on c.id=d.productId
  where cid='${cid}'`;
  connection.query(sql, function (err, data) {
    callback(data)
  });
}

// 用户优惠券查询
// 根据用户id查询是否存在优惠券
module.exports.coupon_selectByCid = function (cid, callback) {
  let sql = `select discount from custom where custom_id="${cid}"`;
  connection.query(sql, function (err, data) {
    callback(data);
  })
}
// 优惠券信息
module.exports.coupon_selectAllDiscount = function (callback) {
  let sql = `select * from discount where id=1`;
  connection.query(sql, function (err, data) {
    callback(data);
  });
}
//存储用户
module.exports.insert_custom = function (custom_pic, customs_id, discount,telphone, nickName, callback) {
  // nickName=nickName.replace("'","");
  let sql = `insert into custom(custom_pic,customs_id,discount,telphone,nickName)VALUES('${custom_pic}','${customs_id}','${discount}','${telphone}','${nickName}')`
  connection.query(sql, function (err, data) {
    callback(data)
  })
}
// 根据名字确定登录用户的id
module.exports.selectId_ByName = function (nickName, callback) {
  let sql = `select customs_id from custom where nickName="${nickName}"`;
  connection.query(sql, function (err, data) {
    callback(data)
  })
}
// 查看用户Id,防止重复
module.exports.select_Cid = function (customs_id, nickName, callback) {
  let sql = `select * from custom where customs_id="${customs_id}" or nickName="${nickName}"`;
  connection.query(sql, function (err, data) {
    callback(data)
  })
}
// 获得该订单的总价，和订单号
module.exports.selectInfo_ByCid = function (cid, callback) {
  let sql = `select orderId,allPrice from order1 where cid="${cid}"`;
  connection.query(sql, function (err, data) {
    callback(data)
  })
}
module.exports.selectState_ByCid = function (cid, callback) {
  let sql = `select state from order1 where cid="${cid}"`;
  connection.query(sql, function (err, data) {
    callback(data)
  })
}
// 以下是去评价接口
// 查看该用户下的该商品是否评论过了
module.exports.selectState_ByOrderId = function (productId,orderId, callback) {
  let sql = `select doneCom from comment where productId=${productId} and orderId=${orderId}`;
console.log(sql);
  connection.query(sql, function (err, data) {
    callback(data)
  })
}
// 添加评论
module.exports.insert_comment = function (orderId,productId,productName,comment,comment_type,cid,state,doneCom, callback) {
  let sql = `insert into comment (orderId,productId,productName,comment,comment_type,cid,state)VALUES(${orderId},${productId},'${productName}','${comment}','${comment_type}','${cid}',${state},${doneCom})`;
  console.log(sql);
  connection.query(sql, function (err, data){
    callback(data)
  })
}
// 根据id查询是否存在该状态
module.exports.selectState_have = function (state, cid, callback) {
    let sql = `select state=${state} from order1 where cid="${cid}"`;
    connection.query(sql, function (err, data) {
      callback(data)
    })
  }
  // 新增评论
// 修改评论状态值
module.exports.updtate_doneCom = function (orderId, productId, callback) {
    let sql = ` update order_detail set doneCom=1 where orderId='${orderId}' and productId=${productId}`;
    connection.query(sql, function (err, data) {
      callback(data)
    })
  }

//gll
//左侧导航栏
module.exports.product_type=function(callback) {
    let sql = `select * from product_type`;
  connection.query(sql, function (err, data) {
        callback(data);
    });
  }
//根据typeid筛选
module.exports.product_category=function(callback) {
    let sql = `select productId,productName,outPrice2,outCount,imgUrl,typeName,typeID  from product a,product_img b,product_type c where a.id=b.productId and a.typeID=c.id
  `
  connection.query(sql, function (err, data) {
        callback(data);
    });
  }
//购物车商品展示
module.exports.buycar_list = function (buycarId,callback) {
  let sql = `select a.Count1 ,b.outPrice2,a.productId,c.imgUrl,b.productName from buycar a 
  join product b on a.productId=b.id
  join product_img c on a.productId=c.productId
  where buycarId='${buycarId}' order by create_time desc`;
  connection.query(sql, function (err, data) {
      callback(data);
  });
}
  //展示加入购物车的某个商品数量
module.exports.product_car = function (callback) {
  let sql = `select  productId,productName,outPrice2,stock,imgUrl from product a,product_img b where a.id=b.productId`;
  connection.query(sql, function (err, data) {
      callback(data);
  });
}
//添加商品进购物车
module.exports.product_carlist = function (buycarId,productId,Count1,custom_id,selectState,callback) {
  let querySqlByCarId = `select count(*) num from buycar where buycarId = ${buycarId} and productId = ${productId}` ;
  connection.query(querySqlByCarId,function(err, data) {
    console.log(err);
    // 第二步 判断商品存不存在
    console.log('现在要添加，先查询，结果 : ' + JSON.stringify(data));
    console.log('num is : ' + data[0].num);
    if (data[0].num > 0) {
      // 存在->修改数量
      let updataCount = `update buycar set Count1 = Count1 + ${Count1} where buycarId = ${buycarId} and productId = ${productId}` ;
      connection.query(updataCount,function(err, data){
        console.log('商品存在，修改数量 : ' + data);
        callback(data);
      });
    } else {
      // 不存在->新增
      let sql = `insert into buycar(productId,Count1,buycarId,custom_id,selectState) values(${productId},${Count1},'${buycarId}','${custom_id}','${selectState}')`;
      connection.query(sql, function (err, data) {
      console.log('商品不存在，新增 : ' + data);
      callback(data);
      });
    }
  }
  );
}
//根据productId删除购物车东西
//修改购车商品状态值
module.exports.buycar_updateById=function(selectState,buycarId,productId,callback){
  let sql = `update buycar set selectState="${selectState}" where buycarId="${buycarId}" and productId=${productId}` 
  connection.query(sql,function(err, data){
    callback(data);
  });
  }
//删除购物车内的商品
module.exports.buycar_deleteById=function(selectState,callback){
  let sql=`delete from buycar where selectState=${selectState}`;
  connection.query(sql,function(err,data){
      callback(data);
  });
}
//去结算时更新数据库商品数量
// module.exports.buycarcount_updateById=function(Count1,buycarId,productId,callback){
//   let sql = `update buycar set Count1=${Count1} where buycarId="${buycarId}" and productId=${productId}` 
//   connection.query(sql,function(err, data){
//     console.log(err);
//     callback(data);
//   });
//   }
//lht
// 收货地址
module.exports.address_add=function(customName,phone,address,detaddress,custom_id,callback){
  let sql=`insert INTO address (customName,phone,address,detaddress,custom_id) VALUES ('${customName}',${phone},'${address}','${detaddress}','${custom_id}')`;
  connection.query(sql,function(err,data){
    callback(data)
  })
  }
  // 渲染管理地址
  module.exports.address_apply=function(custom_id,callback){
    let sql=`select * from address where custom_id='${custom_id}'`;
    connection.query(sql,function(err,data){
      callback(data)
    })
    }
     // 删除地址
  module.exports.address_delete=function(custom_id,callback){
      let sql=`delete from address where custom_id='${custom_id}'`;
      connection.query(sql,function(err,data){
        callback(data)
      })
      }
      // 渲染个人信息
      module.exports.customs_apply=function(customs_id,callback){
        let sql=`select nickName,custom_pic,telphone from custom where customs_id='${customs_id}'`;
        console.log(sql);
        connection.query(sql,function(err,data){
          callback(data)
        })
        }