var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
const path = require("path");
var {Acer} = require('../src/entity/acer');
var {getManager} = require( "typeorm");
var cp  = require('child_process');

/* GET home page. */
router.get('/', async function(req, res, next) {
    const cookie = req.cookies;//获取cookie值
    console.log("cookie",cookie);
    const userRepository = getManager().getRepository(Acer);
    const saveUsers = await userRepository.findOne({where:{session:cookie.account}});//account为cookie的键
    console.log('userCenter', saveUsers);
    res.render('userCenter', {
        saveUsers: saveUsers
    });
});

router.post('/', async function (req ,res,next  ) {
    const cookie = req.cookies;//获取cookie值
    const repository = getManager().getRepository(Acer);/*获取储存库*/
    const veUsers = await repository.findOne({where:{session:cookie.account}});

    //上传的图片需要保存某一个目录，目录必须存在
    const form = new multiparty.Form();
    form.uploadDir = ('./public/upload');

    form.parse(req,async function (err,fields,files) {
        // const { userName, gander, introdution} = req.body;
        // console.log('req.body', req.body);
        //获取上传图片的路径
        var ImgUrl = files.ImgUrl[0].path;
        var userName = fields.userName[0];
        var gander = fields.gander[0];
        var introdution = fields.introdution[0];
        // const { userName, gander, introdution} =fields
        console.log('ImgUrl', ImgUrl);
        console.log('parse', userName,gander,introdution);
    // });
        let newUser = new Acer();
        newUser.userName = userName; // 昵称
        newUser.gander = gander; // 性别
        newUser.introdution = introdution; // 个人简介
        newUser.ImgUrl = ImgUrl; // 头像
        // console.log('ImgUrl',newUser.ImgUrl);
        const saveUsers = await repository.findOne({where:{session:cookie.account}});
        await repository.update(saveUsers, {userName: newUser.userName,gander:newUser.gander,introdution:newUser.introdution});
        if(newUser.ImgUrl==null){
            res.render('userCenter', {
                saveUsers: saveUsers
            });
        }else {
            await repository.update(saveUsers, {ImgUrl:newUser.ImgUrl});
            res.render('userCenter', {
                saveUsers: saveUsers
            });
        }
        await repository.findOne({where:{session:cookie.account}});
        console.log('saveUsers',saveUsers);
        console.log('修改资料成功!!!')
    });
});
module.exports = router;
