var express = require('express');
var router = express.Router();
var {centerWork} = require('../src/entity/centerWork');
var {Acer} = require('../src/entity/acer');
var {getManager} = require( "typeorm");

/* GET home page. */
router.get('/', async function(req, res, next) {
    const cookie = req.cookies;//获取cookie值
    const userselect = getManager().getRepository(Acer);
    const userdata = await userselect.findOne({where:{session:cookie.account}});
    const repository = getManager().getRepository(centerWork);/*获取储存库*/
    const rawData = await repository.find({where:{WorkId:userdata.userNum}});
    console.log( 'WorkId',rawData);

    // console.log('newGoods', newGoods);
    res.render('bannerList', {
        rawData:rawData,
        userdata:userdata
    });
    // return rawData;
});

router.post('/', async function(req, res, next) {

});



module.exports = router;