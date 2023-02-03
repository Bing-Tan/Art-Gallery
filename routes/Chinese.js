var express = require('express');
var router = express.Router();
var {Chinese} = require('../src/entity/Chinese');
var {getManager} = require( "typeorm");
const {Like} = require("typeorm");

/* GET home page. */
router.get('/', async function(req, res, next) {
    const repository = getManager().getRepository(Chinese);
    const rawData = await repository.find();
    console.log('rawData', rawData);
    res.render('Chinese', {
        rawData: rawData,
    });
});

router.post('/',async function (req, res){
    const {search} = req.body;
    console.log('req.body', search);
    const repository = getManager().getRepository(Chinese);/*获取储存库*/
    const rawData = await repository.find({where:{worksName:Like ('%' + search + '%' )}});
    console.log('likeData','rawData', rawData);
    res.render('Chinese', {
        rawData: rawData,
    });
});

module.exports = router;