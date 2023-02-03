var express = require('express');
var router = express.Router();
var {Acer} = require('../src/entity/acer');
var {UserCar} = require('../src/entity/userCar');
var {getManager} = require( "typeorm");

/* GET home page. */
router.get('/', async function(req, res, next) {
    const obj = req.body.hobby;//获取cookie值
    var check_arr = req.query;
    console.log('id',check_arr);
    // var Id = [];
    var arr;
    arr = check_arr.id.split(",");
    // Id.push(arr);
    console.log('Id',arr, arr.length);

    var object = [];
    for (var i = 0; i < arr.length; i++) {
        // console.log('check_arr', check_arr.id[i]);
        const repository = getManager().getRepository(UserCar);
        const rawData = await repository.findOne({where:{id:arr[i]}});
        let obj = {}
        obj = rawData
        object.push(obj)
    }
    console.log('obj',object)
    object.forEach(function (item){
       var jia = item.price * item.quantity;
       console.log('jia',jia)
    })
    //
    // const cookie = req.cookies;//获取cookie值
    // // console.log('Id', Id);
    // // const userselect = getManager().getRepository(Acer);
    // // const userdata = await userselect.findOne({where:{session:cookie.account}});
    // // console.log('userdata', userdata);
    // // console.log('rawData', rawData);
    // // console.log('userdata', userdata);
    // // res.render('car', {
    // //     rawData:rawData
    // // });
    // // res.send('成功！！！')
    // const userselect = getManager().getRepository(Acer);
    // const userdata = await userselect.findOne({where:{session:cookie.account}});
    // // console.log('userdata', userdata);
    // const repository = getManager().getRepository(UserCar);
    // const rawData = await repository.find({where:{Carid:userdata.userNum}});
    // // console.log('rawData', rawData);
    // // console.log('userdata', userdata);
    // // res.render('car', {
    // //     rawData:rawData,
    // //     // choose:object
    // // });
});

router.post('/', async function(req, res, next) {
    // const obj = req.body.hobby;//获取cookie值
    var check_arr = req.query;
    console.log('id',check_arr);
    // var Id = [];
    var arr;
    arr = check_arr.id.split(",");
    // Id.push(arr);
    console.log('Id',arr, arr.length);

    var object = [];
    for (var i = 0; i < arr.length; i++) {
        // console.log('check_arr', check_arr.id[i]);
        const repository = getManager().getRepository(UserCar);
        const rawData = await repository.findOne({where:{id:arr[i]}});
        let obj = {}
        obj = rawData
        object.push(obj)
    }
    console.log('obj',object)
    object.forEach(function (item){
        var jia = item.price * item.quantity;
        console.log('jia',jia)
    })
    // res.send('结算成功')
});

module.exports = router;