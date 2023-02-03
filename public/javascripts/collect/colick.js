var modal = document.getElementById('isDialog');


// 获取内容
var captitle = document.getElementById('captitle');   //商品标题
var captext = document.getElementById('captext');     //商品描述
var Img = document.getElementById('Img');             //商品图片
var capmon = document.getElementById('capmon');       //商品价格

// 获取弹窗input
var button = document.getElementById('button');
var goodsName = document.getElementById('goodsName');    //商品标题
var explain = document.getElementById('explain');       //商品描述
var img = document.getElementById('img01');             //商品图片
var price = document.getElementById("price");           //商品价格

var captionText = document.getElementById("caption");

button.onclick = function(){
    modal.style.display = "block";
    // 商品路径
    img.src = Img.src;
    // 商品标题
    goodsName.value = captitle.value;
    // 商品描述
    explain.value = captext.value;
    // 商品价格
    price.value = capmon.value;

}

// 获取 <span> 元素，设置关闭按钮
var span = document.getElementsByClassName("close")[0];

// 当点击 (x), 关闭弹窗
span.onclick = function() {
    modal.style.display = "none";
}
// 打开加入购物车窗口
// modal.style.display = "block";
// modalImg.src = img.src;
// captionText.innerHTML = img.alt;

// 关闭加入购物车窗口
// $('.close,.cancel').click(function () {
//     // $('.isDialog').hide();
//     modal.style.display = "none";
// })


