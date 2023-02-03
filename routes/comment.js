var express = require('express');
var router = express.Router();
var {centerWork} = require('../src/entity/centerWork');
var {comment} = require('../src/entity/comment');
var {Acer} = require('../src/entity/acer');
var {getManager} = require( "typeorm");


/* GET home page. */
router.get('/', async function(req, res, next) {
    const id = req.query;
    const workRepository = getManager().getRepository(centerWork);//用户作品表
    const acerRepository = getManager().getRepository(Acer);//用户信息表
    const commentRepository = getManager().getRepository(comment);//评论表
    const userCenter = await workRepository.findOne({where:{id:id.id}});//当前作品
    const commentCenter = await commentRepository.find({where:{WorkId:userCenter.id}});//当前作品下的评论
    const acerCenter = await acerRepository.findOne({where:{userNum:userCenter.WorkId}});//当前作品的账号信息
    const lengthCenter = await workRepository.find({where:{WorkId:acerCenter.userNum}});//当前作品下的评论

    var data = [];
    for( var i=0;i<commentCenter.length;i++){
        const userdata = await acerRepository.findOne({where:{userNum:commentCenter[i].UserNum}});
        let obj = {}
        obj["item"] = userdata.ImgUrl // Look at this
        obj["itemDesc"] = userdata.userName
        data.push(obj);
    }
    console.log('userCenter',data)

    res.render('comment',{
        comment:commentCenter,
        user:userCenter,
        Leg:lengthCenter.length,
        acer:acerCenter,
        userData:data
    });
});

router.post('/',  async function (req, res, next,) {
    var id = req.query;
    console.log('id',id);
    const cookie = req.cookies;
    const workRepository = getManager().getRepository(centerWork);//用户作品表
    const acerRepository = getManager().getRepository(Acer);//用户信息表
    const commentRepository = getManager().getRepository(comment);//评论表
    const userCenter = await workRepository.findOne({where:{id:id.id}});//当前作品
    const userFind = await acerRepository.findOne({where:{session:cookie.account}});//当前登录用户

    if(userFind != null && cookie.account != null){
        /**
         * Created by jacksoft on 17/4/26.
         */
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

        var sysDate = new Date().Format('yyyy-MM-dd'); // 生成日期
        var createDate = new Date().Format(' hh:mm:ss'); // 生成时间

        const {content} =req.body;
        console.log('userFind',userFind);
        let newComment = new comment();
        newComment.WorkId = userCenter.id;
        newComment.UserNum = userFind.userNum;
        newComment.IsUserNum = userCenter.WorkId;
        newComment.contain = content;
        newComment.date = sysDate;
        newComment.time = createDate;
        await commentRepository.save(newComment);
        const WorkCenter = await workRepository.findOne({where:{id:id.id}});//当前作品
        const commentCenter = await commentRepository.find({where:{WorkId:userCenter.id}});//当前作品下的评论
        const acerCenter = await acerRepository.findOne({where:{userNum:userCenter.WorkId}});//当前作品的账号信息
        const lengthCenter = await workRepository.find({where:{WorkId:acerCenter.userNum}});//当前作品下的评论
        var data = [];
        for( var i=0;i<commentCenter.length;i++){
            const userdata = await acerRepository.findOne({where:{userNum:commentCenter[i].UserNum}});
            let obj = {}
            obj["item"] = userdata.ImgUrl // Look at this
            obj["itemDesc"] = userdata.userName
            data.push(obj);
        }
        console.log('userCenter',data)

        res.render('comment',{
            comment:commentCenter,
            user:WorkCenter,
            Leg:lengthCenter.length,
            acer:acerCenter,
            userData:data
        });
        console.log('发布成功！！！')
    }else {
        res.render('Enter');
        console.log('发布失败！！！')
        // res.send('发布失败！！！');
    }

});
module.exports = router;