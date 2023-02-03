var express = require('express');
var router = express.Router();
var {centerWork} = require('../src/entity/centerWork');
var {comment} = require('../src/entity/comment');
var {Acer} = require('../src/entity/acer');
var {getManager} = require( "typeorm");


router.get('/', async function (req, res, next,) {
    // var id =location.search;
    // id = req.query;
    // id = id.id
    // const cookie = req.cookies;
    // const {content} =req.body;
    // console.log('id',id);
    // res.send('发布成功！！！');
    // id = {id};
    // id = id.match(id)[0].replace("'","").replace("'","");

    // const workRepository = getManager().getRepository(centerWork);//用户作品表
    // const acerRepository = getManager().getRepository(Acer);//用户信息表
    // const commentRepository = getManager().getRepository(comment);//评论表
    // const userCenter = await workRepository.findOne({where:{id:id.id}});//当前作品
    // const commentCenter = await commentRepository.find({where:{WorkId:userCenter.id}});//当前作品下的评论
    // const acerCenter = await acerRepository.findOne({where:{userNum:userCenter.WorkId}});//当前作品的账号信息
    // const lengthCenter = await workRepository.find({where:{WorkId:acerCenter.userNum}});//当前作品下的评论
    // res.render('comment',{
    //     comment:commentCenter,
    //     user:userCenter,
    //     Leg:lengthCenter.length,
    //     acer:acerCenter
    // });



    // const workRepository = getManager().getRepository(centerWork);//用户作品表
    // const userRepository = getManager().getRepository(Acer);//用户信息表
    // const commentRepository = getManager().getRepository(comment);//评论表
    // const EnterCenter = await acerRepository.findOne({where:{session:cookie.account}});
    // console.log('EnterCenter',EnterCenter);
    // console.log('userCenter',userCenter);

    // await commentRepository.save({WorkId:userCenter.id})


});

module.exports = router;