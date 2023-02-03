var express = require('express');
var router = express.Router();
var {NewPage} = require('../src/entity/NewPage');
var {getManager} = require( "typeorm");

/* GET home page. */
router.get('/', async function(req, res, next) {
    const repository = getManager().getRepository(NewPage);
    const rawData = await repository.find();
    console.log('rawData', rawData);
    res.render('NewPage', {
        rawData: rawData,
    });

});

module.exports = router;