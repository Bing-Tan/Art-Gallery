var express = require('express');
var router = express.Router();
var {userGoods} = require('../src/entity/userGoods');
var {Acer} = require('../src/entity/acer');
var {getManager} = require( "typeorm");
// var db = require('../sql.js');

/* GET home page. */
router.get('/', async function(req, res, next) {

    var id = req.query;
    console.log('id',id);
    const carselect = getManager().getRepository(userGoods);
    await carselect.delete({id:id.id});

    const cookie = req.cookies;//获取cookie值
    const userRepository = getManager().getRepository(Acer);
    const saveUsers = await userRepository.findOne({where:{session:cookie.account}});
    const repository = getManager().getRepository(userGoods);
    const rawData = await repository.find({where:{sellerId:saveUsers.userNum}});
    console.log('rawData', rawData);
    // console.log('newGoods', newGoods);
    res.render('publish', {
        rawData:rawData,
        userdata:saveUsers
    });
});


module.exports = router;