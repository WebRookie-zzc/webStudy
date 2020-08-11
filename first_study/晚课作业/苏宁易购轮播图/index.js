/*获取元素*/
var bannder = document.getElementById('bannder');
var lis = document.getElementsByTagName('li');
var spans = document.getElementsByTagName('span');
var len = lis.length;
var leftBtn = document.getElementsByClassName('leftBtn')[0];
var rightBtn = document.getElementsByClassName('rightBtn')[0];
var ln = 0; //上一个的页码数
var cn = 0; //现在的页码数

/*小圆点特效*/
for(var i = 0; i < len; i ++){
    spans[i].index = i;
    spans[i].onmouseover = function () {
        cn = this.index;
        change();
    }
}

function change() {
        spans[cn].className = lis[cn].className = 'active';
        spans[ln].className = lis[ln].className = '';
        ln = cn;
}

/*两侧按钮特效*/

leftBtn.onclick = function () {
    cn --;
    if(cn<0){
        cn = len-1;
    }
    change();
}

rightBtn.onclick = function () {
    cn++;
    if(cn > len - 1){
        cn = 0;
    }
    change();
}

/*轮播效果*/

var timer = setInterval(rightBtn.onclick,3000);

bannder.onmouseover = function () {
    clearInterval(timer);
    leftBtn.style.display = rightBtn.style.display =  'block';
}

bannder.onmouseleave = function () {
    timer = setInterval(rightBtn.onclick,3000);
    leftBtn.style.display = rightBtn.style.display =  'none';
}