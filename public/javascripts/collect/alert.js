

    // 获取商品标题
    const shop = document.getElementsByClassName("work");
    // 获取商品价格
    const price = document.getElementsByClassName("price");
    // 获取商品图
    const img = document.getElementsByTagName('img');

    // const cookie =
    console.log('cookie',document.cookie.account);
    // 获取父级元素
    document.getElementById("parentUl").addEventListener("click", displayDate);
    function displayDate (ev) {
        // var e = ev || window.event;
        // 获取target
        var target = ev.target || ev.srcElement;
        // nodeName获取body的节点名，toLowerCase()将字符串转换成小写
        if (target.nodeName.toLowerCase() === 'span') {
            window.open('/shoprow');//跳转页面
            const button = document.getElementsByTagName('span');
            // 获取每个li标签的下标
            const Index = $(button).index(target);
            console.log('Index',Index);

            // 存储img的路径
            localStorage.setItem("test1",JSON.stringify(img[Index].src));
            console.log('showCode1',localStorage.getItem('test1'));
            // 存储img的alt
            localStorage.setItem("test2",JSON.stringify(img[Index].alt));
            // 存储商品标题
            localStorage.setItem("test3",JSON.stringify(shop[Index-14].innerHTML));
            // console.log('test',Index+1);
            // 存储商品价格
            localStorage.setItem("test4",JSON.stringify(price[Index-14].innerHTML));
            console.log('localStorage',JSON.parse(localStorage.getItem('test4')));
        }
    }


