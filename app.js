var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var Enter = require('./routes/Enter');
var main = require('./routes/main');
var forget = require('./routes/forget');
var left = require('./routes/left');
var right = require('./routes/right');
var bannerList = require('./routes/bannerList');
var addBanner = require('./routes/addBanner');
var like = require('./routes/like');
var del = require('./routes/del');
var publishDel = require('./routes/publish-del');
var register = require('./routes/register')
var car = require('./routes/car');
var CarBuy = require('./routes/CarBuy');
var collect = require('./routes/collect');
var shoprow = require('./routes/shoprow');
var News = require('./routes/News');
var NewPage = require('./routes/NewPage');
var tieNew = require('./routes/tieNew');
var gallery = require('./routes/gallery');
var works = require('./routes/works');
var Western = require('./routes/Western');
var Chinese = require('./routes/Chinese');
var userWorks = require('./routes/userWorks');
var comment = require('./routes/comment');
// var commentOne = require('./routes/commentOne');
var order = require('./routes/order');
var userCollect = require('./routes/userCollect');
var colleNav = require('./routes/colleNav');
var publish = require('./routes/publish');
var userCenter = require('./routes/userCenter');
var Whistory = require('./routes/Whistory');
var Chistory = require('./routes/Chistory');
var outlogin = require('./routes/outlogin');
var buy = require('./routes/buy');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//使用页面
app.use('/index', indexRouter);
//登录页面
app.use('/Enter', Enter);
//忘记密码页面
app.use('/forget', forget);
//注册
app.use('/register', register);
//用户中心
app.use('/main', main);
//左侧
app.use('/left', left);
//右侧
app.use('/right', right);
//我的作品banner图
app.use('/bannerList', bannerList);
//上传banner图
app.use('/addBanner',addBanner);
//删除操作
app.use('/del',del);
app.use('/publish-del',publishDel);
//搜索功能
app.use('/like',like);
//西方美术史
app.use('/Whistory',Whistory);
//国内美术史
app.use('/Chistory',Chistory);
//新闻资讯主页
app.use('/News',News);
//新闻资讯主页  新闻
app.use('/NewPage',NewPage);
//新闻资讯主页  新闻条则
app.use('/tieNew',tieNew);
//新闻资讯主页  展讯
app.use('/gallery',gallery);
//画品展示
app.use('/works',works);
//西方画作展示
app.use('/Western',Western);
//国内画作展示
app.use('/Chinese',Chinese);
//原创画作展示
app.use('/userWorks',userWorks);
//发送评论
app.use('/comment',comment);
//发送评论
// app.use('/comment',commentOne);
//收藏中心
app.use('/collect', collect);
// 收藏详情
app.use('/shoprow', shoprow);
//我的收藏
app.use('/userCollect', userCollect);
//我的电子收藏
app.use('/car', car);
//我的电子收藏
app.use('/buy', buy);
//我的电子收藏
app.use('/CarBuy', CarBuy);
//我的订单
app.use('/order', order);
//用户中心
app.use('/userCenter', userCenter);
//我的收藏导航栏
app.use('/colleNav', colleNav);
//我发布的
app.use('/publish', publish);
//退出账号
app.use('/outlogin', outlogin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
    // throw err;
});
//process.env.PORT = 200; //修改端口号

module.exports = app;
