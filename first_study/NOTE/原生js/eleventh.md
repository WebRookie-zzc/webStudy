# 日期对象、定时器

Date()是系统写好的构造函数  ```var date = new Date();```

date不是实时的，他保存就是它出生那一刻的时间

- Date() --> 返回现在的日期和时间  ```console.log(Date())```
- getDate() -- 返回今天是多少号(1~31) ```var date = new Date();console.log(date.getDate());```
- getDay() -- 返回今天是周几(0~6)(周日是0)
- getMonth()  -- 返回的是第几个月(一月是0)
- getFullYear() -- 返回是哪一年

不写了，看图吧

![date对象方法](../images/eleven.png)

咀常用的方法  就是  getTime()

计算机的纪元时间  1970.1.1

计算程序执行的毫秒数

```js
var firstTime = new Date().getTime();
var a  = 1 ;
for(var i = 0; i < 10000; i++){
    console.log(i);
}
var lastTime = new Date().getTime();
console.log(lastTime - firstTime);
```

![data对象](..//images//twelve.png)

定时打印内容

```js
var date = new Date();
date.setMinutes(45);
date.setSeconds(0);
var timer = setInterval(function () {
    if(new Date().getTime() - date.getTime() > 1000){
        console.log("成功运行");
        clearInterval(timer);
    }
}, 1000);
```

闹钟：

```html
 <audio src="../music/旧梦一场 (DJ沈念).flac" loop autoplay></audio>

<div class="wrapper">
    正常运行中：<br/>
    距离响铃还有<b>1</b>时<b>30</b>分<b>0</b>秒
</div>
```

```js
var date = new Date();
date.setTime(14);
date.setMinutes(30);
date.setSeconds(0);
var audio = document.getElementsByTagName('audio')[0];
var hour = document.getElementsByTagName('b')[0];
var min = document.getElementsByTagName('b')[1];
var sec = document.getElementsByTagName('b')[2];
houre = 1;
mine = 20;
sece = 0;
// console.log("正常运行中");

var timer1 = setInterval(function () {
    if(new Date().getTime() - date.getTime() > 1000){
        audio.setAttribute('autoplay', 'autoplay');
        clearInterval(timer1);
    }
}, 1000)

var timer2 = setInterval(function () {
    if(houre === 0){
        clearInterval(timer);
    }
    if(sece == 0){
        if(mine == 0){
            mine = 60;
            houre --;
        }
        sece = 60;6
        mine --;
    }
    sece --;
    hour.innerHTML = houre;
    min.innerHTML = mine;
    sec.innerHTML = sece;
}, 1000);
```

封装函数，打印年月日时分秒

```js
/**
 * 封装函数，打印年月日时分秒
 */
function printDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var temp = '';
    temp = year + "年" + (month+1) + "月" + (day+1) + "日" + "\n" + hour + ":" + min + ":" + sec;
    console.log(temp);
}
printDate();
```

## js 定时器

不能通过改变变量去影响定时器

```js
var time = 1000;
setInterval(function () {

}, time);

time = 2000;
```

函数体不间断的执行，但是time的值他只读取一次，所以定时器一直是1000ms执行一次

但是定时器是十分不准的

我们用程序来了看一下

```js
var firstTime = new Date().getTime();
setInterval(function () {
    var secondTime = new Date().getTime()
    console.log(secondTime - firstTime);
    firstTime = secondTime;
},1000);
```

> setInterval的回调函数并不是到时后立即执行,而是等系统计算资源空闲下来后才会执行.而下一次触发时间则是在setInterval回调函数执行完毕之后才开始计时,所以如果setInterval内执行的计算过于耗时,或者有其他耗时任务在执行,setInterval的计时会越来越不准,延迟很厉害.

先来简单解释一下：js引擎是单线程的，定时器是每隔1000ms将片段放到队列的后面，并不知道什么时候执行

setInterval() 是有返回值的，他的返回值作为唯一标识，供我们清楚用

一般是第几个定时器，他的唯一标识就是数字几(从1开始)

```js
setInterval(function () {
    clearInterval(1);
}, 1000);
这样也能清除定时器
```

- setTimeout(function () {}, 1000);
推迟1000ms后再执行，并且只执行一次

- clearTimeout()

setTimeout和setinterval的唯一标识是不重合的，他们会逐一罗列

这四个函数都是window上的方法，所以他们内部的函数的this都指向window

注意：

可以将可执行代码放在字符串中：

```setIntreval("console.log('a');", 1000)```

课堂作业：

一分钟停止定时器，并在HTML页面中显示(html,和css以及题目已经写好)

```html
<body>
    minutes : <input type="text" value="0"><br><br>
    seconds : <input type="text" value="0">
    <script src="../js/js.js"></script>
</body>
```

```css
body {
    font-size : 20px;
    font-weight: bold;
}

input {
    font-size : 22px;
    color :#f40;
    text-align: right;
    font-weight: bold;
    border : 4px solid #0ff;
    outline: none;
    padding-right: 10px;
}
```

```js
var min = document.getElementsByTagName('input')[0];
var sec = document.getElementsByTagName('input')[1];

var timer = setInterval(function () {
    if(sec.value == 59) {
        sec.value = -1;
        min.value++;
    }
    sec.value++;
    if(min.value == 3){
        clearInterval(timer);
    }
} , 1000);
```

## dom操作的补充

### 查看滚动条的移动距离 

- window.pageXOffset/pageYOffset : 查看滚动条的滚动距离(没有括号)，ie9以上才可用

IE8及以下，有的是document.body.scroolLeft/Top,或者是document.documentElement.scroolLeft/Top但是低版本的ie很混乱，有的ie浏览器有前面的属性，有的浏览器有后面的属性，所以我们对ie的解决方法是两者相加

我们封装一个自己的库getScroolOffset

```js
/**
 * 获取滚动条滑动的距离，返回一个对象
 */

 function getScroolOffset() {
     if(window.pageXOffset){
         return {
             X : window.pageXOffset,
             Y : window.pageYOffset,
         }
     }else{
         return {
             X : document.body.scrollLeft,
             Y : document.body.scrollTop,
         }
     }
 }
```

### 获取可视窗口的尺寸

- window.innerWidth
- window.innerHeight

上面两个属性ie8及以下不兼容

在HTML中，加上< doctype html >就是标准模式，没有它就是怪异/混杂模式。怪异模式是为了向后兼容，用ie7浏览时，依然按照ie6来渲染它

不同的浏览器都不太一样，Google能兼容前面的5个大版本，一般情况下不用启用怪异模式

- document.documentElement.clientWidht/Height  : 在标准模式下，任何浏览器都能够兼容
- document.body.clientWidth/Height : 适用于怪异模式的浏览器

封装兼容性 getViewportOffset，获取可视窗口的属性

我们可以用document.compatMode(compat是兼容的意思),来判断是否是标准模式。标准模式返回"CSS1Compat"，怪异模式显示"backCompat"

```js
 /**
  * 获取可视窗口的属性
  */
 function getViewportOffset() {
     if(window.innerWidth){
         return {
             w : window.innerWidth,
             h: window.innerHeight,
         }
     }else{
         if(document.compatMode === "BackCompat"){
             return {
                 w : document.body.clientWidth,
                 h : document.body.clientHeight,
             }
         }else{
             return {
                 w : document.documentElement.clientWidth,
                 h: document.documentElement.clientHeight,
             }
         }
     }
 }
```

### 查看元素的几何尺寸

- getBoundingClientRect() es5的新方法，我们用不到，兼容性很好，但是他返回的结果不是实时的

### 查看元素尺寸

- dom.offsetWidth(视觉上的尺寸，不能仅仅是context)
- dom.offsetHeight

### 查看元素位置

- dom.ofdfsetLeft(这两个属性求的是相对于有定位父级的位置)，他不管自己是否有定位
- dom.offsetTop

返回有定位的最近的父级

- dom.setParent

作业;

求元素相对于文档的坐标

```js
/**
 * 求元素相对于文档的位置
 */
function rtnDocumentPosition (elem) {
    var X = 0;
    var Y = 0;
    while(!elem.offsetParent){
        X += elem.offsetLeft;
        Y += elem.offsetTop;
        elem = elem.offsetParent;
    }
    return {
        x : X,
        y : Y,
    }
}
```

### 让滚动条滚动一定距离

下面三个方法都是window上的方法

- scroll(x,y) scrollTo(x,y)\[ 这两个方法是一样的 \]  : 移动到

- scrollBy(x，y) ： 累加滚动距离  : 填负数可以向上滚动

利用这个知识可以写一个自动阅读

先来可一个错误的代码

```js
var btn = document.getElementsByClassName('btn')[0];
var key = true;

btn.onclick = function () {
    if(key){
        btn.innerHTML = 'Stop';
        var start = setInterval(function () {
            window.scrollBy(0,10);
            // console.log(start);
        }, 100);
        key = false;
    }else{
        // console.log(start);
        btn.innerHTML = "Start";
        clearInterval(start);
        key = true;
    }
}
```

当再次点击按钮的时候,产生的两个不同的函数,所以,并不能清楚上一个定时器(因为是两个不同的作用域)，所以，将定时器放在全局中即可，将start前面的var去掉即可

## 脚本化CSS

dom.style 只能读取行间样式的，写在css文件中是读取不到的；
如果碰到float等关键字，我们写成cssFloat；
复合属性尽量拆写(如 border ： 1px solid black)；（老版本必须拆写）；
写入的值必须是字符串的形式

除了style方法，再也没有方法往里面写入值了

- getComputedStyle(element,null)\[ prop \]  第二个null可以获取伪元素的样式表

获取元素显示的所有css属性，没有设置的都显示的是默认值；这个是只读的；
他返回的都是绝对值，(%/em ---- > px)

获取伪元素样式表的唯一方法

```html
<div></div>
```

```css
div::after {
    content : "";
    width : 50px;
    height : 50px;
    background-color : #f40;
}

div {
    width : 100px;
    height : 100px;
    background-color : #0f0;
}
```


```js
var div = document.getElementsByTagName('div')[0];
console.log(window.getComputedStyle(div,'after').width);
```

那我们怎么改变伪元素呢？

还是上面的代码，当我们点击父级的div的时候，让伪元素的背景颜色变成黄色： 写两个class通过改变class来改变伪元素

css上加上

```css
.demo::after {
    background-color : yellow;
}
```

```js
div.onclick = function () {
    div.className = "demo";
}
```

