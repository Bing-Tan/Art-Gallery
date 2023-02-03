var express = require('express');
var router = express.Router();
var {Goods} = require('../src/entity/GoodsInformations');
var {userGoods} = require('../src/entity/userGoods');
var {getManager} = require( "typeorm");

/* GET home page. */
router.get('/', async function(req, res, next) {
    const repository = getManager().getRepository(Goods);
    const rawData = await repository.find();
    const userRepository = getManager().getRepository(userGoods);
    const userRawData = await userRepository.find();
    // console.log('rawData', rawData);
    // console.log('newGoods', newGoods);
    res.render('collect', {
        rawData:rawData,
        userData:userRawData
    });
});

module.exports = router;