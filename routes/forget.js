var express = require('express');
var router = express.Router();
var {Acer} = require('../src/entity/acer');
var {getManager} = require( "typeorm");
var cp  = require('child_process');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('forget');
});

router.post('/', async function (req ,res,next  ) {
    const {userNum, userName, userPwd, reuserPwd} = req.body;
    console.log('req.body',req.body);
    const repository = getManager().getRepository(Acer);/*获取储存库*/
    const allUser = await repository.findOne({where: { userNum:userNum}});
    console.log('allUser',allUser);

    //弹窗
    var initApp = function() {//账户不存在弹窗
        cp.exec(
            'mshta "javascript:var sh=new ActiveXObject("WScript.Shell"); ' +
            'sh.Popup("账户不存在，请先注册账号!", 10, "Title!", 64 );close()"')
    }
    var successLogin = function() {//修改成功弹窗
        cp.exec(
            'mshta "javascript:var sh=new ActiveXObject("WScript.Shell"); ' +
            'sh.Popup("修改成功!!!去登录吧!", 10, "Title!", 64 );close()"')
    }
    var error = function() {//修改密码失败弹窗
        cp.exec(
            'mshta "javascript:var sh=new ActiveXObject("WScript.Shell"); ' +
            'sh.Popup("密码不匹配，修改密码失败!!!!!", 10, "Title!", 64 );close()"')
    }

    if ( allUser == null ) {
        initApp();
        console.log('账号不存在!!!')
        console.log('userName', userName);
    } else {
        if ( userPwd == reuserPwd ) {
            let newUser = new Acer();
            newUser.userPwd = userPwd; // 密码
            console.log('newUser',newUser);
            await repository.update(allUser, {userPwd: newUser.userPwd});
            console.log('updata allUser',allUser);
            console.log('修改成功!!!去登录吧')
            successLogin();
            return  res.render('Enter');
        } else {
            console.log('密码不匹配，修改密码失败!!!!')
            return error();
        }
    }
});
module.exports = router;
