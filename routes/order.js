var express = require('express');
var router = express.Router();
var {Acer} = require('../src/entity/acer');
var {order} = require('../src/entity/order');
var {getManager} = require( "typeorm");

/* GET home page. */
router.get('/', async function(req, res, next) {
    const cookie = req.cookies;//获取cookie值
    console.log('cookie', cookie);
    const userselect = getManager().getRepository(Acer);
    const userdata = await userselect.findOne({where:{session:cookie.account}});
    // console.log('userdata', userdata);
    const repository = getManager().getRepository(order);
    const rawData = await repository.find({where:{Orderid:userdata.userNum}});
    console.log('rawData', rawData);
    // console.log('userdata', userdata);
    res.render('order', {
        rawData:rawData
    });
});

module.exports = router;