var express = require('express');
const {Like} = require("typeorm");
var router = express.Router();
var {western} = require('../src/entity/western');
var {getManager} = require( "typeorm");

/* GET home page. */
router.get('/', async function(req, res, next) {
    const repository = getManager().getRepository(western);
    const rawData = await repository.find();
    console.log('rawData', rawData);
    res.render('Western', {
        rawData: rawData,
    });

});

router.post('/',async function (req, res){
    const {search} = req.body;
    console.log('req.body', search);
    const repository = getManager().getRepository(western);/*获取储存库*/
    const rawData = await repository.find({where:{worksName:Like ('%' + search + '%' )}});
    console.log('likeData','rawData', rawData);
    res.render('Western', {
        rawData: rawData,
    });
});

module.exports = router;