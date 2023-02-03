var express = require('express');
var router = express.Router();
var {Acer} = require('../src/entity/acer');
var {getManager} = require( "typeorm");

/* GET home page. */
router.get('/', async  function(req, res, next) {
    const cookie = req.cookies;//获取cookie值
    console.log("cookie",cookie);
    const userRepository = getManager().getRepository(Acer);
    const saveUsers = await userRepository.findOne({where:{session:cookie.account}});//account为cookie的键
    console.log('left', saveUsers);
    res.render('left', {
        saveUsers: saveUsers
    });
});



module.exports = router;