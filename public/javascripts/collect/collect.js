var Awap = document.getElementById('wrap');
var	Apic = document.getElementById('pic').getElementsByTagName('li');
var	Alist = document.getElementById('list').getElementsByTagName('li');
var	sum = 0;

// 自动播放图片
var item = setInterval(onload,3000);

// 鼠标扫到下标停止自动播放
Awap.onmouseover = function(){
	clearInterval(item);
}
//鼠标移开继续自动播放
Awap.onmouseout = function(){
	item = setInterval(onload,3000);
}

//遍历Alist的长度实现划过切换至对应的图片
for (var i = 0; i < Alist.length; i++) {
	Alist[i].onmouseover = function() {
		clearInterval(item);
		sum = this.innerText - 1;
		/*执行图片切换函数*/
		EachPic(sum);
	};
};

// 遍历图片函数
function onload (){
	if(++sum >= Apic.length){
		sum = 0;
	}
	EachPic( sum );
}

// 定义遍历图片切换函数
function EachPic(AIndex) {
	for (var i = 0; i < Apic.length; i++) {
		Apic[i].style.display = 'none';
		Alist[i].className = '';
	}
	Apic[AIndex].style.display = 'block';
	Alist[AIndex].className = 'on';
}
