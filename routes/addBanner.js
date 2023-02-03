var express = require('express');
var multiparty = require('multiparty');
const path = require("path");
var router = express.Router();
var {centerWork} = require('../src/entity/centerWork');
var {Acer} = require('../src/entity/acer');
var {getManager} = require( "typeorm");

/* GET home page. */
router.post('/',async function (req, res, next){
    const cookie = req.cookies;//获取cookie值
    const userRepository = getManager().getRepository(Acer);
    const saveUsers = await userRepository.findOne({where:{session:cookie.account}});

    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    var createDate = new Date().Format('yyyy-MM-dd');//设置生成日期
    var createTime = new Date().Format('hh:mm:ss');//设置生成时间
    console.log('date',createDate);

    const repository = getManager().getRepository(centerWork);/*获取储存库*/
    const filePath = path.join("../images/upload");
    console.log("filePath",filePath)
    var form = new multiparty.Form();
    // //上传的图片需要保存某一个目录，目录必须存在
    form.uploadDir = ('./public/images/imgs');

    form.parse(req,async function (err,fields,files){
    //     //获取用户输入的内容
        var worksName = fields.worksName[0];//名称
        var kind = fields.kind[0];//画种
        var Explain = fields.Explain[0];//说明
    //     //获取上传图片的路径
        var ImgUrl =files.ImgUrl[0].path;
        console.log('files',files);
        console.log( path.isAbsolute(ImgUrl));//判断路径为绝对还是相对
    //     //保存用户上传的内容
        let newWorks= new centerWork();
        newWorks.worksName = worksName; //名称
        newWorks.Explain = Explain; //说明
        newWorks.kind = kind;//画种
        newWorks.ImgUrl = ImgUrl; //路径
        newWorks.WorkId = saveUsers.userNum;//账号
        newWorks.date = createDate;//date
        newWorks.time = createTime;//time
        console.log('newWorks.ImgUrl',newWorks.ImgUrl)
        if( newWorks.ImgUrl != null){
            await repository.save(newWorks);
            // console.log('上传成功！！！！！！！！！！！！')
            const rawData = await repository.find({where:{WorkId:saveUsers.userNum}});
            res.render('bannerList', {
                rawData:rawData,
                userdata:saveUsers
            });
        }else {
            const rawData = await repository.find({where:{WorkId:saveUsers.userNum}});
            res.render('bannerList', {
                rawData:rawData,
                userdata:saveUsers
            });
        }

    });
});
module.exports = router;