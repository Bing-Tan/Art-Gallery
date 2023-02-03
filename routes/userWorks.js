var express = require('express');
// const {BaseEntity} = require("typeorm");
var router = express.Router();
var {centerWork} = require('../src/entity/centerWork');
var {Acer} = require('../src/entity/acer');
var {getManager} = require( "typeorm");
var {Like} = require( "typeorm");


router.get('/', async function(req, res,next) {
    const cookie = req.cookies;
    console.log('cookie',cookie.account);
    const userSelect = getManager().getRepository(Acer);
    const workpotory = getManager().getRepository(centerWork);
    const userCenter = await workpotory.find();

    var data = [];
    for( var i=0;i<userCenter.length;i++){
        const userdata = await userSelect.findOne({where:{userNum:userCenter[i].WorkId}});
        let obj = {}
        obj["item"] = userdata.ImgUrl // Look at this
        obj["itemDesc"] = userdata.userName
        data.push(obj);
    }
    console.log('userCenter',data)

    res.render('userWorks', {
        rawData: userCenter,
        userData: data,
    });

});

router.post('/',async function (req, res){
    const {search} = req.body;
    console.log('req.body', search);
    const repository = getManager().getRepository(userBanner);/*获取储存库*/
    const rawData = await repository.find({where:{worksName:Like ('%' + search + '%' )}});
    console.log('likeData','rawData', rawData);

    const potory = getManager().getRepository(centerWork);
    const userCenter = await potory.find({where:{worksName:Like ('%' + search + '%' )}});
    res.render('userWorks', {
        rawData: rawData,
        userCenter:userCenter
    });
});

module.exports = router;