var express = require('express');
var router = express.Router();
var {Acer} = require('../src/entity/acer');
var {getManager} = require( "typeorm");
var random = require('string-random');
var cp  = require('child_process');

router.get('/', function(req, res, next) {
    res.render('Enter');
});


/* GET home page. */
router.post('/', async function (req ,res,next  ){
    const { userNum, userPwd, cookie } = req.body;
    console.log('admin', userNum, userPwd, cookie);
    const userRepository = getManager().getRepository(Acer);
    const saveUsers = await userRepository.findOne({ where: { userNum:userNum }});
    console.log('saveUsers', saveUsers)
    const data = { isLogin: false ,interviewer:null};

    //弹窗
    var initApp = function() {//未注册弹窗
        cp.exec(
            'mshta "javascript:var sh=new ActiveXObject("WScript.Shell"); ' +
            'sh.Popup("你还未注册，请先注册!", 10, "Title!", 64 );close()"')
    }
    var successLogin = function() {//成功登录弹窗
        cp.exec(
            'mshta "javascript:var sh=new ActiveXObject("WScript.Shell"); ' +
            'sh.Popup("登录成功!", 10, "Title!", 64 );close()"')
    }
    var error = function() {//密码账号错误弹窗
        cp.exec(
            'mshta "javascript:var sh=new ActiveXObject("WScript.Shell"); ' +
            'sh.Popup("账号或密码错误!", 10, "Title!", 64 );close()"')
    }
    var loginIng = function() {//已登录状态弹窗
        cp.exec(
            'mshta "javascript:var sh=new ActiveXObject("WScript.Shell"); ' +
            'sh.Popup("您已处于登录状态!", 10, "Title!", 64 );close()"')
    }


    //判断结果
    if ( (!saveUsers || !saveUsers.userPwd) && !cookie) {
        initApp();
        return res.render('register');
    } else if (saveUsers && !cookie) {
        if (userPwd === saveUsers.userPwd) {
            // 设置20位数的 session 随机数，同时和查找到的用户信息一并存进数据库中
            const session = random(16);
            console.log(session);
            saveUsers.session = session;
            await userRepository.save(saveUsers)
            // 设置cookie //res.cookie(名称,值,{配置信息})
            res.cookie("account",session,{maxAge: 900000, httpOnly: true});
            console.log(req.signedCookies);
            //  localStorage/cookie
            data.isLogin = true;
            data.interviewer = saveUsers.interviewer;
            // successLogin();
            res.render('virification');
        } else {
            error();
        }
    } else if (!saveUsers && cookie) {
        const findCookieUser = await userRepository.findOne({ where: { session: cookie.account }});
        const identity = findCookieUser.interviewer;
        if (findCookieUser) {
            data.isLogin = true;
            data.interviewer = identity;
            loginIng();
        }
    }
});

module.exports = router;
