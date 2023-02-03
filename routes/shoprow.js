var express = require('express');
var router = express.Router();
var {Acer} = require('../src/entity/acer');
var {Goods} = require('../src/entity/GoodsInformations');
var {userGoods} = require('../src/entity/userGoods');
var {UserCar} = require('../src/entity/userCar');
var {getManager} = require( "typeorm");
var cp  = require('child_process');
// var bodyParser = require('body-parser');


/* GET home page. */
router.get('/', async function(req, res, next) {
    res.render('shoprow');
});

router.post('/', async function(req, res, next) {
    const cookie = req.cookies;//获取cookie值
    // console.log('cookie', cookie);
    const {goodsName,explain,price } = req.body;
    // console.log('body', goodsName,explain,price);
    const userRepository = getManager().getRepository(Acer);
    const saveUsers = await userRepository.findOne({where:{session:cookie.account}});
    // console.log('saveUsers' , saveUsers);

    if( saveUsers != null && cookie.account == saveUsers.session){
        // router.use(bodyParser.urlencoded({ extended: false }));
        // console.log('body', router.use(bodyParser.json(goodsName)));
        // const goodsRepository = getManager().getRepository(Goods);
        const serRepository = getManager().getRepository(userGoods);
        // const findGoods = await goodsRepository.findOne({where:{goodsName:goodsName,explain:explain,price:price}});
        const finduserGoods = await serRepository.findOne({where:{goodsName:goodsName,explain:explain,price:price}});
        const save = await userRepository.findOne({where:{userNum:finduserGoods.sellerId}});

        let Car = new UserCar();
        Car.Carid = saveUsers.userNum;
        Car.goodsName = finduserGoods.goodsName;
        Car.goods = finduserGoods.goods;
        Car.explain = finduserGoods.explain;
        Car.price = finduserGoods.price;
        Car.seller = save.userName;
        const CarRepository = getManager().getRepository(UserCar);
        const FindCar = await CarRepository.findOne({where:{Carid:Car.Carid,goodsName:Car.goodsName,goods:Car.goods,explain:Car.explain}});
        // console.log('FindCar',FindCar);
        // console.log('Car',Car);
        // var quantity = FindCar.quantity;
        if(FindCar != null){
            if( (Car.goods == FindCar.goods) && (Car.goodsName == FindCar.goodsName) ){
                Car.quantity = FindCar.quantity+1;
                await CarRepository.update(FindCar,{quantity:Car.quantity});
                // console.log('数量加一!!');
            }else {
                await CarRepository.save((Car));
                // console.log('保存成功！！！');
            }
        }else {
                await CarRepository.save((Car));
                // console.log('保存成功！！！');
            }

        res.render('shoprow');
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