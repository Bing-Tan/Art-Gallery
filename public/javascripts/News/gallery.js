//3D选项卡
window.onload = function(){
    var obtn = document.getElementsByTagName("li");
    var oElec = document.getElementsByClassName("card");

    var i = 0;

    for(i = 0;i < obtn.length;i++){
        obtn[i].index = i;//记录索引值
        obtn[i].onclick = function(){
            for(var j = 0;j < obtn.length;j++){
                obtn[j].className = "";
                oElec[j].style.display = 'none';
            }
            this.className = "active";
            oElec[this.index].style.display = "block";
        };
    }
};