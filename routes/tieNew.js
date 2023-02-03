var express = require('express');
var router = express.Router();
var {NewPage} = require('../src/entity/NewPage');
var {getManager} = require( "typeorm");

/* GET home page. */
router.get('/', async function(req, res, next) {
    const id = req.query;
    console.log('id',id);
    const repository = getManager().getRepository(NewPage);
    const rawData = await repository.findOne({where:{id:id.id}});
    // console.log('rawData', rawData);
    res.render('tieNew', {
        rawData: rawData,
    });

});

module.exports = router;