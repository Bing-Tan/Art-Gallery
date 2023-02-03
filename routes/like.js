var express = require('express');
var router = express.Router();
var {centerWork} = require('../src/entity/centerWork');
var {Acer} = require('../src/entity/acer');
var {getManager} = require( "typeorm");


router.post('/',async  (req, res)=>{
        const {date,time} = req.body;
        console.log('req.body', time);
        const cookie = req.cookies;//获取cookie值
        const userRepository = getManager().getRepository(Acer);
        const saveUsers = await userRepository.findOne({where:{session:cookie.account}});

        const repository = getManager().getRepository(centerWork);/*获取储存库*/
        const likeData = await repository.findOne({where: {date:time,time:date,WorkId:saveUsers.userNum}});
        console.log('likeData', likeData);
        await repository.delete(likeData,{date:date,time:time});


        const rawData = await repository.find({where:{WorkId:saveUsers.userNum}});

        // var userdata = saveUsers.userName;
        // console.log('userdata',userdata);
        res.render('bannerList',{
                rawData:rawData,
                userdata:saveUsers
        });
        // await repository.delete(Western,{ firstName: "Timber" });
        // res.render('bannerList');
});
module.exports = router;