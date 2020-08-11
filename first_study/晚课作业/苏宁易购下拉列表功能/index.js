var down1 = document.getElementsByClassName('down1')[0];
var temp = document.getElementsByClassName('temp')[0];
var li1 = document.getElementsByTagName('li')[0];
var timer = null;
var timer2 = null;
var temp2 = document.getElementsByClassName('temp2')[0];
var down2 = document.getElementsByClassName('down2')[0];
var li2 = document.getElementsByTagName('li')[1];

temp.onmouseenter = function () {
    clearInterval(timer);
    clearInterval(timer2);
    temp.classList.add('active');
    down1.style.display = 'block';
    setTimeout(function (){
        li1.classList.add('first');
    },10)
}
temp.onmouseleave = function () {
    timer = setTimeout(function () {
        rem();
    },50);
    down1.onmouseenter = function () {
        clearInterval(timer);
    }
}

down1.onmouseleave = function (){
   rem();
}

function rem () {
    temp.classList.remove('active');
    li1.classList.remove('first');
    time2 = setTimeout(function () {
        down1.style.display = 'none';
    }, 300);
}

temp2.onmouseenter = function () {
    clearInterval(timer);
    clearInterval(timer2);
    temp.classList.add('active');
    down2.style.display = 'block';
    setTimeout(function (){
        li2.classList.add('first');
    },10)
}
temp.onmouseleave = function () {
    timer = setTimeout(function () {
        rem1();
    },50);
    down2.onmouseenter = function () {
        clearInterval(timer);
    }
}

down2.onmouseleave = function (){
   rem1();
}

function rem1() {
    temp2.classList.remove('active');
    li2.classList.remove('first');
    time2 = setTimeout(function () {
        down2.style.display = 'none';
    }, 300);
}