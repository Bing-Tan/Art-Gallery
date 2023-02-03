var express = require('express');
var router = express.Router();
var {Acer} = require('../src/entity/acer');
var {getManager} = require( "typeorm");
var cp  = require('child_process');

router.get('/', function(req, res, next) {
    res.render('register');
});

router.post('/', async function (req ,res,next  ) {
    const {userNum, userName, userPwd, reuserPwd} = req.body;
    console.log('req.body', req.body);
    const repository = getManager().getRepository(Acer);/*获取储存库*/
    const doneUser = await repository.find({where: { userNum:userNum,userName:userName, userPwd:userPwd}});
    const findUser = await repository.find({ where: { userNum }});
    console.log( 'doneUser',doneUser);
    console.log('findUser', findUser);

    //弹窗
    var initApp = function() {//账户已存在弹窗
        cp.exec(
            'mshta "javascript:var sh=new ActiveXObject("WScript.Shell"); ' +
            'sh.Popup("账户已存在，请注册新的账号!", 10, "Title!", 64 );close()"')
    }
    var successLogin = function() {//注册成功弹窗
        cp.exec(
            'mshta "javascript:var sh=new ActiveXObject("WScript.Shell"); ' +
            'sh.Popup("注册成功!!!去登录吧!", 10, "Title!", 64 );close()"')
    }
    var error = function() {//密码不正确弹窗
        cp.exec(
            'mshta "javascript:var sh=new ActiveXObject("WScript.Shell"); ' +
            'sh.Popup("密码不匹配，注册失败!!!", 10, "Title!", 64 );close()"')
    }
    var repeat = function() {//密码不正确弹窗
        cp.exec(
            'mshta "javascript:var sh=new ActiveXObject("WScript.Shell"); ' +
            'sh.Popup("密码不能为空，注册失败!!!", 10, "Title!", 64 );close()"')
    }


        if (doneUser !== null && findUser.length > 0) {
            return initApp( );
            console.log('userName', userName);
        } else if(userPwd !== null && userName !== null){
                if ( userPwd === reuserPwd ) {
                    let newUser = new Acer();
                    newUser.userName = userName; // 昵称
                    newUser.userNum = userNum; // 手机号
                    newUser.userPwd = userPwd; // 密码
                    console.log(newUser)
                    await repository.save(newUser);
                    console.log('注册成功!!!去登录吧')
                    successLogin();
                } else {
                    console.log('密码不匹配，注册失败!!!!')
                    return error();
                }
            }else{
                return repeat();
        }
});
module.exports = router;