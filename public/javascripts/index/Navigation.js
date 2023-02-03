
//获取导航栏(.nav)到顶部(.header)距离
var ntop =$(".nav").offset().top;//offset() 方法设置或返回被选元素相对于文档的偏移坐标。

//获取导航栏高度
var nheight =$(".nav").outerHeight();//outerHeight()返回nav的外部高度

//监听向下滑动了多少
var scrollheight = 0;
$(window).scroll(function (){//scroll对元素滚动的次数进行计数
    scrollheight = $(this).scrollTop();//scrollTop()返回 <div> 元素的垂直滚动条位置：
    var nav = document.getElementById('nav');
    //判断是否需要固定导航栏
    if(scrollheight > ntop){
        //改变导航栏的position
        $(".nav").css({"position":"fixed","width":"100%","top":"0", "background":"white","z-index":"10"});
        //改变内容的上外边距（.container
        $(".container").css({ });
    }
    else{
        $(".nav").css({"position":"static"});
        $(".container").css({"margin":"0"});
    }
});







