var express = require('express');
var router = express.Router();
var {UserCar} = require('../src/entity/userCar');
var {Acer} = require('../src/entity/acer');
var {getManager} = require( "typeorm");
// var db = require('../sql.js');

/* GET home page. */
router.get('/', async function(req, res, next) {

    // const {id} =req.body.id;
    var id = req.query;
    // id = `${id}`;
    // id = id.match(id)[0].replace("`","").replace("`","");
    console.log('id',id);
    const carselect = getManager().getRepository(UserCar);
    await carselect.delete({id:id.id});
    // const cardata = await carselect.findOne({where:{id:id.id}});
    // console.log('cardata',cardata);

    const cookie = req.cookies;//获取cookie值
    console.log('cookie', cookie);
    const userselect = getManager().getRepository(Acer);
    const userdata = await userselect.findOne({where:{session:cookie.account}});
    // console.log('userdata', userdata);
    const repository = getManager().getRepository(UserCar);
    const rawData = await repository.find({where:{Carid:userdata.userNum}});
    // console.log('rawData', rawData);
    // console.log('userdata', userdata);
    res.render('car', {
        rawData:rawData
    });
    // res.send('car');
    // db.query(`delete from banner where id=${id}`,function (err,data){
    //     db.query('select *from banner',function (err,data){
    //         if(err){
    //             throw err;
    //         }else {
    //             res.write('失败');
    //         }
    //     })
    // })
});


module.exports = router;