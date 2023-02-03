var ul = document.getElementsByTagName('form');
ul[0].onclick = function (e) {
    var event = e || window.event;
    var tar = event.target || event.srcElement;
    //判断我们点击的节点名是否和li相等，如果相等，则提示我们
    if(tar.nodeName.toLowerCase()==='button'){
        const button = document.getElementsByTagName('button');
        // 获取每个li标签的下标
        const Index = $(button).index(tar);
        console.log('Index',Index);
        var quantity = document.querySelectorAll("#quantity");
        if(Index % 2==0){
            // console.log('quantity.value',quantity);
            if(quantity[Index / 2].value > 1){
                quantity[Index / 2].value = quantity[Index / 2].value - 1;
                // 存储img的路径
                localStorage.setItem("test1",JSON.stringify(quantity[Index / 2].value));
            }else {
                alert('不能再少啦！！');
            }
        }else {
            if (quantity[Index-1-((Index-1)/2)].value < 50){
                quantity[Index-1-((Index-1)/2)].value++;
            }else {
                alert('已经到极限啦！！');
            }
        }
    }
}