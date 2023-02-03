// 获取img路径
var img = JSON.parse(localStorage.getItem('test1'));
console.log('img',img);
// 获取img的alt
var Alt = JSON.parse(localStorage.getItem('test2'));
// 获取商品标题
var shop = JSON.parse(localStorage.getItem('test3'));
// 获取商品价格
var price = JSON.parse(localStorage.getItem('test4'));

//获取到页面上
document.title = shop;
document.getElementById("Img").src = img;
document.getElementById('captext').value = Alt;
document.getElementById('captitle').value = shop;
document.getElementById('capmon').value = price;
console.log('test',JSON.parse(localStorage.getItem('test3')));
console.log('shop',document.getElementsByName('goodsName').value );

