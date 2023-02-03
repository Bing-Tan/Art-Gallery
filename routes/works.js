var express = require('express');
var router = express.Router();
var {Banners} = require('../src/entity/ALLbanner');
var {western} = require('../src/entity/western');
var {userBanner} = require('../src/entity/userbanner');
var {Chinese} = require('../src/entity/Chinese');
var {centerWork} = require('../src/entity/centerWork');
var {getManager} = require( "typeorm");
var {Like} = require( "typeorm");

/* GET home page. */
router.get('/', async function(req, res, next) {
    const repository = getManager().getRepository(Banners);
    const rawData = await repository.find();

    const pository = getManager().getRepository(western);
    const westernData = await pository.find();

    const tory = getManager().getRepository(Chinese);
    const ChineseData = await tory.find();

    const potory = getManager().getRepository(centerWork);
    const userCenter = await potory.find();

    const sitory = getManager().getRepository(userBanner);
    const userData = await sitory.find();
    res.render('works', {
        rawData: rawData,
        westernData: westernData,
        ChineseData:ChineseData,
        userData: userData,
        userCenter:userCenter
    });
});

router.post('/', async function(req, res, next) {
    const {search} = req.body;
    console.log('req.body', search);
    const repository = getManager().getRepository(Banners);
    const rawData = await repository.find({where:{worksName:Like ('%' + search + '%' )}});
    console.log('rawData', rawData);

    const pository = getManager().getRepository(western);
    const westernData = await pository.find({where:{worksName:Like ('%' + search + '%' )}});
    const westData = await pository.find({where:{Explain:Like ('%' + search + '%' )}});
    console.log('westernData', westernData);
    console.log('westData', westData);

    const tory = getManager().getRepository(Chinese);
    const ChineseData = await tory.find({where:{worksName:Like ('%' + search + '%' )}});
    console.log('ChineseData', ChineseData);

    const potory = getManager().getRepository(centerWork);
    const userCenter = await potory.find({where:{worksName:Like ('%' + search + '%' )}});
    console.log('userCenter', userCenter);

    const sitory = getManager().getRepository(userBanner);
    const userData = await sitory.find({where:{worksName:Like ('%' + search + '%' )}});
    console.log('userData', userData);
    res.render('works', {
        rawData: rawData,
        westernData: westernData,
        westData:westData,
        ChineseData:ChineseData,
        userData: userData,
        userCenter:userCenter
    });
});



module.exports = router;