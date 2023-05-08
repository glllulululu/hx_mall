// //接口路径文件
const express=require('express');//导入第三方模块，使用抛出接口的
const app=express();
const cors=require('cors');//导入第三方模块，用来解决服务器端的跨域
const db=require('./db');//导入自定义模块，链接数据库
//解决跨域
app.use(cors());
app.all("*",function(request,response,next){
    response.header('Access-Control-Allow-Origin',"*");
    next();
});
// gtt
//小程序首页封面
app.get('/indeximg/selectByState',function(req,res){
  db.indeximg_selectByState(function(datas){
      res.send({data:datas});
  });
});
//渲染小程序首页商品
app.get('/product_msg/add',(req,res)=>{
  // let pageIndex=req.query.pageIndex;
  db.product_msg(function(data){
      res.send({data:data})
  });
});
//渲染商品详情
app.get('/product/detail',function(req,res){
  db.product_detail(function(datas){
      res.send({data:datas})
  });
});
//用户评价
app.get('/product/comment',function(req,res){
  db.product_comment(function(datas){
      res.send({data:datas})
  });
});
//用户评价(未评价)
app.get('/product/no_comment',function(req,res){
  db.product_no_comment(function(datas){
      res.send({data:datas})
  });
});
//用户评价详情
app.get('/product/comment_detail',function(req,res){
  db.product_comment_detail(function(datas){
      res.send({data:datas})
  });
});
//推荐商品 
app.get('/product/sale',function(req,res){
  db.product_sale(function(datas){
      res.send({data:datas})
  });
});
//立即购买
//展示加入购物车的某个商品数量
app.get('/product/car',(req,res)=>{
      db.product_car(function(datas){
          res.send({data:datas})
      });
    });
//订单界面
//选取收货地址
app.get('/order/address',(req,res)=>{
      db.order_address(function(datas){
          res.send({data:datas})
      });
    });
//使用优惠券
app.get('/order/discount',(req,res)=>{
      db.order_discount(function(datas){
          res.send({data:datas})
      });
    });
  //数据库增加优惠券领取数量
  app.get('/discount/add',function(req,res){
     db.discount_add(function(datas){
         if(datas.affectedRows>0){
             res.send('领取成功');
         }else{
             res.send('领取失败');
         }
     })
 })
   //数据库增加优惠券使用数量
   app.get('/discount/addUse',function(req,res){
    db.discount_addUse(function(datas){
        if(datas.affectedRows>0){
            res.send('领取成功');
        }else{
            res.send('领取失败');
        }
    })
})
  //查询用户是否已经领取过了优惠券
  app.get('/have/discount',(req,res)=>{
    let customs_id=req.query.customs_id;
        db.have_discount(customs_id,function(datas){
            res.send({data:datas})
        });
  });
  //用户领取了优惠券，存入数据库
  app.get('/save/discount',function(req,res){
    let discount=req.query.discount;
    let customs_id=req.query.customs_id;
    db.save_discount(discount,customs_id,function(datas){
        if(datas.affectedRows>0){
            res.send('提交成功');
        }else{
            res.send('提交失败');
        }
    })
  })
  //从购物车去结算
app.get('/order/buycar',(req,res)=>{
  let buycarId=req.query.buycarId
    db.order_buycar(buycarId,function(datas){
        res.send({data:datas})
    });
  });
//提交订单
app.get('/order/submit',function(req,res){
  let orderId=req.query.orderId;
  let cid=req.query.cid;
  let orderTime=req.query.orderTime;
  let allPrice=req.query.allPrice;
  let discount=req.query.discount;
  let address=req.query.address;
  let detaddress=req.query.detaddress;
  let phone=req.query.phone;
  let state=req.query.state;
  let service_charge=req.query.service_charge;
  let remark=req.query.remark;
  db.order_submit(orderId,cid,orderTime,allPrice,discount,address,detaddress,phone,state,service_charge,remark,function(datas){
      if(datas.affectedRows>0){
          res.send('提交成功');
      }else{
          res.send('提交失败');
      }
  })
})
//提交订单（从立即购买进入订单明细）
app.get('/order/detail',function(req,res){
  let orderId=req.query.orderId;
  let productId=req.query.productId;
  let count=req.query.count;
  let outPrice=req.query.outPrice;
  let allPrice=req.query.allPrice;
  let phone=req.query.phone;
  let doneCom=req.query.doneCom;
  db.order_detail(orderId,productId,count,outPrice,allPrice,phone,doneCom,function(datas){
      if(datas.affectedRows>0){
          res.send('提交成功');
      }else{
          res.send('提交失败');
      }
  })
})
  //提交订单（订单明细）
  app.get('/detail/submit',function(req,res){
    let orderId=req.query.orderId;
    let carts=JSON.parse(req.query.carts)
    let phone=req.query.phone;
    let doneCom=req.query.doneCom;
    carts.forEach(item=>{
      let allPrice=item.outPrice2*item.Count1;
      db.detail_submit(orderId,item.productId,item.Count1,item.outPrice2,allPrice,phone,doneCom,function(datas){
    // if(datas.affectedRows>0){
    //         res.send('提交成功');
    //     }else{
    //         res.send('提交失败');
    //     }
    })
      }
        )
    })
  //付款
  app.get('/order/pay',(req,res)=>{
    let state=req.query.state;
    let orderId=req.query.orderId;
      db.order_pay(state,orderId,function(datas){
          res.send({data:datas})
      });
    });
//yl
// 订单全部信息
app.get('/order/selectByCid', function (req, res) {
  db.order_selectByCid(req.query.cid,function (datas) {
    res.send(datas)
  })
});
// 根据用户id查询是否存在优惠券
app.get('/coupon/selectByCid', function (req, res) {
  db.coupon_selectByCid(req.query.cid, function (datas) {
    res.send(datas)
  })
})
// // 优惠券信息
app.get('/coupon/selectAllDiscount', function (req, res) {
  db.coupon_selectAllDiscount(function (datas) {
    res.send(datas)
  })
})
// 新增客户
app.get('/insert/custom', function (req, res) {
  let{custom_pic, customs_id, discount, telphone, nickName} = req.query;
  db.insert_custom(custom_pic, customs_id, discount, telphone, nickName, function (datas) {
    if (datas.affectedRows > 0) {
      res.send('添加成功');
    } else {
      res.send('添加失败');
    }
  });
});
// 根据名字确定登录用户的id
app.get('/selectId/ByName',function (req,res) {
  db.selectId_ByName(req.query.nickName,function (datas) {
    res.send(datas)
  })
})
// 查看用户Id,防止重复
app.get('/select/cid', function (req, res) {
  db.select_Cid(req.query.customs_id,req.query.nickName,function (datas) {
    res.send(datas)
  })
})
// 获得该订单的总价，和订单号
app.get('/selectInfo/ByCid', function (req, res) {
  db.selectInfo_ByCid(req.query.cid, function (datas) {
    res.send(datas)
  })
})
app.get('/selectState/ByCid', function (req, res) {
  db.selectState_ByCid(req.query.cid, function (datas) {
    res.send(datas)
  })
})
// 根据id查询是否存在该状态
app.get('/selectState/have', function (req, res) {
  let {
    state,
    cid
  } = req.query;
  db.selectState_have(state, cid, function (datas) {
    res.send(datas)
  })
})

// 以下是评价接口
//获得状态
app.get('/selectState/ByOrderId', function (req, res) {
  let {
    productId,orderId
  } = req.query;
  db.selectState_ByOrderId(productId,orderId, function (datas) {
    res.send(datas)
  })
})
// 添加评论
app.get('/insert/comment', function (req, res) {
  let {
    orderId,
    productId,
    productName,
    comment,
    comment_type,
    cid,
    state
  } = req.query;
  db.insert_comment(orderId, productId, productName, comment, comment_type, cid,state, doneCom, function (datas) {
    console.log(datas);
    if (datas.affectedRows > 0) {
      res.send('添加成功');
    } else {
      res.send('添加失败');
    }
  })
})
app.get('/updtate/doneCom',function (req,res) {
    db.updtate_doneCom(req.query.orderId,req.query.productId,function (datas) {
      res.send('ok')
    })
  })

//gll
//左侧导航栏
app.get('/product/type',(req,res)=>{
    db.product_type(function(datas){
        res.send({data:datas})
    });
  });
// //右侧商品
app.get('/product_category',(req,res)=>{
    db.product_category(function(datas){
        res.send({data:datas})
    });
  });
  //购物车商品展示
app.get('/buycar/list',(req,res)=>{
  let buycarId=req.query.buycarId
    db.buycar_list(buycarId,function(datas){
        res.send({data:datas})
    });
  });
  //展示加入购物车的某个商品数量
app.get('/product/car',(req,res)=>{
    db.product_car(function(datas){
        res.send({data:datas})
    });
  });
//添加商品进购物车
app.get('/product/carlist',(req,res)=>{
  let productId=req.query.productId;
  let Count1=req.query.Count1
  let buycarId=req.query.buycarId
  let custom_id=req.query.custom_id
  let selectState=req.query.selectState
    db.product_carlist(buycarId,productId,Count1,custom_id,selectState,function(datas){
      res.send({data:datas})
    });
  });

   //根据id删除购物车东西
  //修改购车商品状态值
   app.get('/buycar/updateById',function(req,res){
     if(selectState==0){
       
     }
      db.buycar_updateById(req.query.selectState,req.query.buycarId,req.query.productId,function(datas){
          if(datas.affectedRows>0){
              res.send('修改成功');
          }else{
              res.send('修改失败');
          }  
      });
    })
  //删除购物车内的商品
   app.get('/buycar/deleteById',function(req,res){
    db.buycar_deleteById(req.query.selectState,function(datas){
        if(datas.affectedRows>0){
            res.send('删除成功');
        }else{
            res.send('删除失败');
        }
        
    });
})
//去结算时更新数据库商品数量
// app.get('/buycarcount/updateById',function(req,res){
//   const carts = JSON.parse(req.query.carts);
//   const buycarId = req.query.buycarId;
//   // 修改数据库数据
//   carts.forEach(product => {
//     db.buycarcount_updateById(product.Count1, buycarId, product.productId, function(datas){
//       res.send('修改成功');
//     //   if(datas.affectedRows>0){
//     //     res.send('修改成功');
//     // }else{
//     //     res.send('修改失败');
//     // }
//     })
//   });
  
//  })
//lht
// 收货地址
app.get('/address/add',function(req,res){
  db.address_add(req.query.customName,req.query.phone,req.query.address,req.query.detaddress,req.query.custom_id,function(datas){
    res.send(datas)
    console.log(datas);
  })
})
// 渲染管理地址
app.get('/address/apply',function(req,res){
  db.address_apply(req.query.custom_id,function(datas){
    res.send(datas)
  })
})
// 删除地址
app.get('/address/delete',function(req,res){
    db.address_delete(req.query.custom_id,function(datas){
      res.send(datas)
    })
  })
  // 渲染个人信息
app.get('/customs/apply',function(req,res){
    db.customs_apply(req.query.customs_id,function(datas){
      res.send(datas)
    })
  })
//设置服务端口
app.listen(8686,function(){
    console.log('正在启动服务8686......');
});
