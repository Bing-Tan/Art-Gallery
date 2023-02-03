var express = require('express');
var router = express.Router();
var {Acer} = require('../src/entity/acer');
var {getManager} = require( "typeorm");
const https = require('https');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('outlogin');
});

router.post('/',async function (req, res, next) {
    const cookie = req.cookies;//获取cookie值
    console.log('cookie',cookie);
    const repository = getManager().getRepository(Acer);/*获取储存库*/
    const veUsers = await repository.findOne({where: {session: cookie.account}});


    var moveUsers = await repository.update(veUsers,{ session: ' '});
    console.log('session',moveUsers.session);
    // 设置cookie //res.cookie(名称,值,{配置信息})
    res.cookie("account",moveUsers.session,{maxAge: 900000, httpOnly: true});
    console.log(req.signedCookies);
    console.log('moveUsers',moveUsers);
    res.render('Enter');

});
module.exports = router;