var express = require('express');
var router = express.Router();
var {Acer} = require('../src/entity/acer');
var {userGoods} = require('../src/entity/userGoods');
var {order} = require('../src/entity/order');
var {getManager} = require( "typeorm");
var cp  = require('child_process');


router.post('/', async function(req, res, next) {
    /**
     * Created by jacksoft on 17/4/26.
     */
    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    const cookie = req.cookies;//获取cookie值
    console.log('cookie', cookie);
    const {goodsName,explain,quantity,goodsUrl,price } = req.body;
    console.log('body', goodsName,goodsUrl,explain,price);
    const userRepository = getManager().getRepository(Acer);
    const GoodsRepository = getManager().getRepository(userGoods);
    const saveUsers = await userRepository.findOne({where:{session:cookie.account}});
    const findGoods = await GoodsRepository.findOne({where:{goodsName:goodsName,explain:explain,price:price}});
    const save = await userRepository.findOne({where:{userNum:findGoods.sellerId}});
    // console.log('saveUsers' , saveUsers);
    // res.send('购买成功！！！');

    if( saveUsers != null && cookie.account == saveUsers.session){
        var platform = '3001'; //平台变化 3001代表当前系统平台的码
        var r1 = Math.floor(Math.random()*100); // 获取两个0-9的随机数
        var r2 = Math.floor(Math.random()*100);

        var sysDate = new Date().Format('yyyyMMddhhmmss'); // 生成系统时间
        var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss'); // 生成订单创建时间
        var orderId = platform+r1+sysDate+r2; // 生成订单编号
        console.log('orderId',orderId);

        let newOrder = new order();
        newOrder.Orderid = saveUsers.userNum;
        newOrder.goodsName = goodsName;
        newOrder.goods = findGoods.goods;
        newOrder.explain = explain;
        newOrder.number = orderId;
        newOrder.date = createDate;
        newOrder.quantity = quantity;
        newOrder.price = price;
        newOrder.seller = save.userName;
        const OrderRepository = getManager().getRepository(order);
        // const FindOrder  = await  CarRepository.findOne({where:{
        //         Orderid:Order.Orderid,goodsName:Order.goodsName,
        //         goods:Order.goods,explain:Order.explain,number:Order.number,
        //         price:Order.price,seller:Order.seller
        // }});
        await OrderRepository.save((newOrder));
        res.render('Buy');
    }else {
        var loginIng = function() {//已登录状态弹窗
            cp.exec(
                'mshta "javascript:var sh=new ActiveXObject("WScript.Shell"); ' +
                'sh.Popup("您还未登录！！！", 10, "Title!", 64 );close()"')
        }
        loginIng();
        res.render('Enter');
    }
});
module.exports = router;