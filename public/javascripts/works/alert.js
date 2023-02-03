//手风琴效果
    // 获取所有.item元素
    let items=document.querySelectorAll('.item');

    // 设置选中态样式
    function setActive(){
        // 遍历所有.item元素，移出active样式
        items.forEach((item)=>{
            item.classList.remove('active');
        })
        // 为当前选中项添加active样式
        this.classList.add('active');
    }
    // 遍历所有.item元素，分别为其设置点击事件
    items.forEach((item)=>{
        item.addEventListener('click',setActive);
    })

//图片弹窗效果
    // 获取弹窗
    const modal = document.getElementById('myModal');
    // 获取图片插入到弹窗 - 使用 "alt" 属性作为文本部分的内容
    var img = document.getElementsByClassName('myImg');
    // console.log('img', img);
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");

    document.getElementById("parentUl").addEventListener("click", displayDate);
    function displayDate (ev) {
        var target = ev.target || ev.srcElement;
        // 获取img的target
        if (target.nodeName.toLowerCase() == 'img') {
            console.log('target', target)
            modal.style.display = "block";
            modalImg.src = target.src;
            captionText.innerHTML = target.alt;
            return ev;
        }
    }
    // 获取 <span> 元素，设置关闭按钮
    var span = document.getElementsByClassName("close");
    // 当点击 (x), 关闭弹窗
    span.onclick = function () {
        modal.style.display = "none";
    }

