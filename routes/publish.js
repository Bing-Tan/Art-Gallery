var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
const path = require("path");
var {Acer} = require('../src/entity/acer');
var {userGoods} = require('../src/entity/userGoods');
var {getManager} = require( "typeorm");

/* GET home page. */
router.get('/', async function(req, res, next) {
    const cookie = req.cookies;//获取cookie值
    const userRepository = getManager().getRepository(Acer);
    const saveUsers = await userRepository.findOne({where:{session:cookie.account}});
    const repository = getManager().getRepository(userGoods);
    const rawData = await repository.find({where:{sellerId:saveUsers.userNum}});
    console.log('rawData', rawData);
    // console.log('newGoods', newGoods);
    res.render('publish', {
        rawData:rawData,
        userdata:saveUsers
    });
});

router.post('/',async function (req, res, next){
    const cookie = req.cookies;//获取cookie值
    const userRepository = getManager().getRepository(Acer);
    const saveUsers = await userRepository.findOne({where:{session:cookie.account}});
    console.log('saveUsers',saveUsers);
    const repository = getManager().getRepository(userGoods);/*获取储存库*/
    // const saveUsers = await userRepository.find({where:{session:cookie.account}});
    // const filePath = path.join("../images/upload");
    // console.log("filePath",filePath)
    var form = new multiparty.Form();
    // //上传的图片需要保存某一个目录，目录必须存在
    form.uploadDir = ('./public/images/imgs');

    form.parse(req,async function (err,fields,files){
        //     //获取用户输入的内容
        var goodsName = fields.goodsName[0];//名称
        var Explain = fields.Explain[0];//描述
        var price = fields.price[0];//价格
        //     //获取上传图片的路径
        var goods =files.goods[0].path;
        console.log('files',files);
        // console.log( path.isAbsolute(ImgUrl));//判断路径为绝对还是相对
        //     //保存用户上传的内容
        let newGoods= new userGoods();
        newGoods.goodsName = goodsName; //名称
        newGoods.explain = Explain; //说明
        newGoods.price = price;//价格
        newGoods.goods = goods; //路径
        newGoods.sellerId = saveUsers.userNum;//账号
        // newGoods.date = createDate;//date
        // newGoods.time = createTime;//time
        // console.log('newWorks.ImgUrl',newWorks.ImgUrl)
        if( newGoods.goods != null){
            await repository.save(newGoods);
            // console.log('上传成功！！！！！！！！！！！！')
            const rawData = await repository.find({where:{sellerId:saveUsers.userNum}});
            console.log('rawdata',rawData);
            res.render('publish', {
                rawData:rawData,
                userdata:saveUsers
            });
        }else {
            const rawData = await repository.find({where:{sellerId:saveUsers.userNum}});
            res.render('publish', {
                rawData:rawData,
                userdata:saveUsers
            });
        }

    });
});
module.exports = router;