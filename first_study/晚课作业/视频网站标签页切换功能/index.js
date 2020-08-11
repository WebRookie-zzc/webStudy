var oUl = document.getElementsByTagName('ul')[0];
var temple = '';
var len = list.length;
var index = 0;

function init() {
    render();
    autoPlay(index);
}

function render(){
    for(var i = 0; i < len; i ++){
        temple += `
        <li>
        <span>${list[i].name}</span>
        ${list[i].message}
        </li>
        `
    }
    oUl.innerHTML = temple;
}

function autoPlay(index) {
    var timer = setInterval(function () {
        // console.log(index);
        if(index >= len){index = 0}
        autoMove(index);
        changeImg(index);
        index ++;
    },2000)
    mouseOn(timer);
    mouseLeave(index);
}

function autoMove(index) {
    var oLi = document.getElementsByTagName('li');
        for(var i = 0; i < len; i ++) {
            oLi[i].className = '';
        }
        oLi[index].classList.add('active');
}

function changeImg(index) {
    var oMain = document.getElementsByClassName('main')[0];
    oMain.style.backgroundImage = `url(${list[index].image})`
}

function mouseOn(timer) {
    var oLi = document.getElementsByTagName('li');
    var oMain = document.getElementsByClassName('main')[0];
    for(var j = 0; j < len; j ++){
        (function (n){
            oLi[j].onmouseenter = function () {
                // console.log(n);
                for(var a = 0; a < len; a ++) {
                    oLi[a].className = '';
                    // console.log(a);
                }
                oLi[n].classList.add('active');
                oMain.style.backgroundImage = `url(${list[n].image})`
                clearInterval(timer);
            }
        })(j)
    }
}

function mouseLeave(index) {
    var oLi = document.getElementsByTagName('li');
    for(var b = 0; b < len; b++){
        (function (c) {
        oLi[c].onmouseleave = function () {
            autoPlay(c+1)
        }
        })(b)
    }
}

init();