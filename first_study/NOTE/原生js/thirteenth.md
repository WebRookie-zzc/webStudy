# 事件  ---交互体验的核心

## 如何绑定事件处理函数

- element.onXXX = function () {} : 缺点 ： 一个元素的同一事件只能绑定一个事件处理函数，基本等于写在HTML的行间上 ```<div onclick = "console.log('a');">```  这个叫句柄的绑定方式，this指向的dom元素自己
- obj.addEventListener(事件类型(这里就不写on了), 处理函数, false) : 可以为一个事件绑定多个处理函数，this指向dom元素自己
```js
div.addEventListener('click', function () {
    console.log('a');
}, false);
```

当绑定的函数地址相同的时候，他只执行一次，来，看下面两段代码

```js
div.addEventListener('click',text, false);
div.addEventListener('click', text, false);
function text() {
    console.log("a");
}
//这里值输出一个a，因为他们处理函数的地址相同
```

```js
div.addEventListener('click', function () {
    console.log('a');
}, false);
iv.addEventListener('click', function () {
    console.log('a');
}, false);
//这里就会输出两个a
```

- IE独有的方法 obj.addEvent('on' + 事件类型 , 处理函数)；当绑定同一个相同地址的函数多次，他也会执行多次(这是和addEventListener不同的地方),this指向window

下面我们来看一道神马的笔试题，给每个li绑定事件，使得点击时输出他的索引

```html
<ul>
    <li>a</li>
    <li>a</li>
    <li>a</li>
    <li>a</li>
</ul>
```

```js
var lis = document.getElementsByTagName('li');
var len = lis.length;
for(var i = 0; i < len;i ++){
    (function(n) {
        lis[n].addEventListener('click', function () {
            console.log(n);
        }, false);
    })(i);
}
```

下面我们来看一下错误的代码

```js
var lis = document.getElementsByTagName('li');
var len = lis.length;
for(var i = 0; i < len;i ++){
    lis[i].addEventListener('click', function () {
        console.log(i);
    }, false);
}
//这个是由于闭包产生的问题，导致最后输出的值都是4
```

## 事件处理程序的运行环境

我们要解决IE浏览器attachEvent() 指向windwow的问题

```js
var div = docuemnt.getElementsByTagName('div')[0];

div.attachEvent('onclick', function () {
    handle.call(div);
}, false);

function handle () {
    this.name = 'name';
}
```

我们来封装一个addEvent(element, type, handle) 的方法，来实现兼容的问题

```js
/**
 * 绑定事件兼容函数
 * @param {object} elem 元素
 * @param {string} type 事件类型
 * @param {function} handler 事件的执行函数
 */
function addEvent (elem, type, handler) {
    if(elem.addEventListener){
        elem.addEventListener(type, handler, false);
    }else if(elem.attachEvent){
        elem.attachEvent(type, function () {
            handler.call(elem);
        });
    }else{
        elem['on' + type] = handler;
    }
}
```

## 解除事件处理程序

- obj.onclick = null;

只执行一次的事件

```js
div.onclick = function () {
    console.log(1);
    this.onclick = null;
}
```

- obj.removeEventListener(type, handle, false);

```js
div.addEventListener('click', text, false);
div.removeEventListener('click', text, false);
function text() {
    console.log('edf');
}
```

但是，如果绑定的是匿名函数，那么我们将解除不了了，下面的就没有办法解除

```js
div.addEventListener('click', function () {
    var a = 1;
}, false);
```

- obj.detachEvent('on' + type, handle)

使用什么方式添加的事件，就要用相对应的方法去解除事件，不能混用，看下面代码

```js
var div = document.getElementsByTagName('div')[0];
div.addEventListener('click', text, false);
function text () {
    console.log(1);
}
div.onclick = null;
```

## 事件处理模型 --- 事件冒泡、捕获(重点)

我们来看一下事件冒泡模型

```html
<div class="wrapper">
        <div class="content">
            <div class="box"></div>
        </div>
    </div>
```

```css
* {
    margin: 0;
    padding: 0;
}

.wrapper {
    width : 300px;
    height : 300px;
    background-color: #f00;
}

.content {
    width : 200px;
    height : 200px;
    background-color: #0f0;
}

.box {
    width : 100px;
    height : 100px;
    background-color: #00f;
}
```

```js
var wrapper = document.getElementsByClassName('wrapper')[0];
var content = document.getElementsByClassName('content')[0];
var box = document.getElementsByClassName('box')[0];

wrapper.addEventListener('click', function () {
    console.log('wrapper');
}, false);
content.addEventListener('click', function () {
    console.log('content');
}, false);
box.addEventListener('click', function () {
    console.log('box');
}, false);
```

当点击最内层的时候，输出```box content wrapper``` ,点击第二层的时候，输出 ```content wrapper``` ，当点击最外层的时候，输出 ```wrapper```

 - 事件冒泡的定义 : 结构上嵌套关系的元素，会存在事件冒泡的功能，即同一事件，自子元素冒泡向父元素。(自底向上)。就是子元素也会有父元素的事件

- 事件捕获模型 ： IE没有事件捕获

将上面的代码中的false变成true就成了事件捕获

```js
var wrapper = document.getElementsByClassName('wrapper')[0];
var content = document.getElementsByClassName('content')[0];
var box = document.getElementsByClassName('box')[0];

wrapper.addEventListener('click', function () {
    console.log('wrapper');
}, true);
content.addEventListener('click', function () {
    console.log('content');
}, true);
box.addEventListener('click', function () {
    console.log('box');
}, true);
```

当点击最外层的时候， ```wrapper```当点击倒数第二层时候 输出 ```wrapper content``` 当点击最内层的时候 ```wrapper content box```

- 事件捕获定义 ： 结构上嵌套关系的元素，会存在事件捕获功能

若冒泡和捕获同时存在，先捕获，后冒泡

focus、blur、change、submit、reset、select等事件不冒泡

## 取消冒泡和阻止默认事件

### 取消冒泡

- W3C标准 ： event.stopPropagation();   下面的e是一个事件对象

```js
var div = document.getElemntByTagName('div')[0];
docuemnt.addEventListener('click', function () {console.log('你闲的?')}, false);
div.addEventListener('click', function (e) {
    div.style.backgroundColor = '#f40';
    e.stopPropagation();//这一行就是取消冒泡
}, false);
```

- IE独有的(现在Google也实现了) event.cancleBubble = true;

我们封装一个取消冒泡的函数stopBubble(event)

```js
/**
 * 取消冒泡的兼容函数
 * @param {object} event 事件对象
 */
function stopBubble (event) {
    if(event.stopPropagation){
        event.stopPropagation();
    }else{
        event.cancelBubble = true;
    }
}
```

### 阻止默认事件

右键出菜单事件  ： contextmenu

```js
document.contextmenu = function () {
    console.log('a');
    //右键呼出菜单的同时在控制台打印a
}
```

- return false : 只有用句柄的方式绑定的默认事件才管用

```js
document.contextmemu = function {
    console.log('a');
    return false;
}
//这样写右击的时候就只打印a，不会呼出菜单
```
- event.preventDefault() : W3C标准，ie9以下不兼容

```js
document.contextmenu = function (e) {
    console.log('a');
    e.preventDefault();
}
```

- event.returnValue = false  兼容IE

```js
document.contextmenu = function (e) {
    console.log('a');
    e.returnValue = false;
}
```

我们写一个阻止默认事件的兼容函数 cancleHandler(event)

```js
/**
 * 清除默认事件的兼容函数
 * @param {object} event 事件对象
 */
function cancleHandler (event) {
    if(event.preventDefault){
        event.preventDefault();
    }else{
        event.returnValue = false;
    }
}
```

a标签的默认事件，刷新页面或者是跳到顶部

```html
<a href="https:www.baidu.com"></a>
```

```js
var a = document.getElementByTagName('a')[0];
a.onclick = function () {
    return false;
}
```

这样，a标签就会失去所有的功能，即使写了href也不会跳转，也不会刷新页面，也不会返回页面的顶端

但是我们在实际开发中不用这样麻烦，我们写在行间,下面这样写也会使得a标签失去所有功能

```html
<a href="javascript:void(0)"> </a>
或者是
<a href="javascript:void(false)"> </a>
```

## 事件对象(事件源对象)

- event || window.event : 在非ie9以下的浏览器，都可以捕获并打包成event，但是在ie9以下，打包的事件对象在window.event中、

所以我们做个兼容 

```js
div.onclick = function (e) {
    var event = e || window.event;
}
```

### 事件源对象

事件源对象就是有多层嵌套时，是谁触发了这个对象

- target (火狐上只有这个)
- srcElement (ie只有这个)

兼容处理  ``` var target = e.target || e.scrElement

## 事件委托

利用事件冒泡和事件源对象进行处理

看个例子：

单击时输出li中文本

```html
<ul>
        <li>1ef</li>
        <li>2ef</li>
        <li>37f</li>
</ul>
```

来看一个非事件委托的野蛮解法，多转几圈能转到明天

```js
var lis = document.getElementsByTagName('li');
var len = lis.length;
for(var i = 0; i < len; i ++) {
    lis[i].addEventListener('click', function () {
        console.log(this.innerText);
    }, false);
}
```

下面我们利用事件委托来写

```js
var ul = document.getElementsByTagName('ul')[0];
ul.onclick = function (e) {
    var event = e || window.event;
    var target = event.target || event.srcElement;
    console.log(target.innerText);
}
```

拖拽元素的函数

```js
function drag (elem) {
    elem.addEventListener('mousedown', function (e){
        function text (e) {
            elem.style.left = e.pageX - disX + 'px';
            elem.style.top = e.pageY - disY + 'px'; 
            // console.log(1);
        }
        var disX,disY;
        // console.log(1)
        disX = e.pageX - parseInt(elem.style.left);
        disY = e.pageY - parseInt(elem.style.top);
        document.addEventListener('mousemove', text, false);
        document.addEventListener('mouseup', function () {
            // console.log(1);
            document.removeEventListener('mousemove',text, false);
        }, false);
    }, false);
}

var div = document.getElementsByTagName('div')[0];
drag(div);
```

```js
var div = document.getElementsByTagName('div')[0];
div.onmousedown = function (e) {
    var disX,disY;
    disX = e.pageX - parseInt(div.style.left);
    disY = e.pageY - parseInt(div.style.top);
    document.onmousemove = function (e) {
        div.style.left = e.pageX - disX + 'px';
        div.style.top = e.pageY - disY + 'px';
    };
    document.onmouseup = function () {
        document.onmousemove = null;
    }
}
```

## 事件分类

### 鼠标事件

- click   : 他比较迟缓，click = mousedown + mouseup
- mousedown
- mousemove
- mouseup
- contextmenu
- mouseover (mouseenter) : 前面的老，括号里的新
- mouseout (mouseleave) ： 前面的老，括号里的新

通过e.button 来判断点击的是左键(0),滚动轮(1),右键(2)

注意 ： click事件只能监听鼠标左键，不能监听鼠标右键，mouseenter和mouseleave可以监听左右键和滚轮

下面我们解决click和mousedown冲突的问题(用事件差来解决)

```js
var firstTime = 0;
var lastTime = 0;
var div = document.getElementsByTagName('div')[0];

div.onmousedown = function () {
    firstTime = new Date().getTime();
}
div.onmouseup = function () {
    lastTime = new Date().getTime();
}
div.onclick = function () {
    if (lastTime - firstTime < 300){
        console.log('click')
    }
}
```

能拖拽的a标签(下面是错误的js代码，问题未解决)

```html
<a></a>
```

```css
* {
    margin: 0;
    padding: 0;
}

a {
    display : block;
    width : 100px;
    height : 100px;
    font-size : 30px;
    line-height: 100px;
    background-color: #f40;
    text-align : center;
    text-decoration: none;
    font-family: "楷体";
}
```

```js
var a = document.getElementsByTagName('div')[0];
var firstTime = 0;
var lastTime = 0;
var disX,disY;
var key = true;


a.onmousedown = function (e) {
    firstTime = new Date().getTime();
    disX = e.pageX - parseInt(a.style.left);
    disY = e.pageY - parseInt(a.style.top);
    document.onmousemove = function (e) {
        a.style.left = e.pageX - disX + 'px';
        a.style.top = e.pageY - disY + 'px';
    }
    document.onmouseup = function () {
        lastTime = new Date().getTime();
        document.onmousemove = null;
    }
}

a.onclick = function () {
    if(lastTime - firstTime > 200){
        return false;
    }
}
```

### 键盘事件

- keydown
- keypress
- keyup

keypress !!!!!!!!!= keydown + keyup(不等于)

触发顺序： keypress > keydown > keyup

键盘事件按住了可以连续触发

keydown不管键盘敲得是什么字符， 他的charCode都是0，而keypress的charCode的值为敲下字符的ASCII码；
keydown可以检测除了fu键所有的按键，但是keypress只能检测字符类按键；

按谁输出谁：

```js
document.onkeypress = function (e) {
    console.log(String.fromCharCode(e.charCode));
}
```

### 文本类操作事件

- input ： 输入框中的内容发生变化时，触发该事件(输入或者删除时都会触发)
- change ： (聚焦)  --- 内容改变  --- 失去焦点 ： 失去焦点并且内容改变的时候才会触发  (他对比的是聚焦前和失去焦点后的内容)
- focus ： 聚焦
- blur ： 失去焦点

```html
<input value="请输入内容" style="color : #999">
```

```js
var input = document.getElementsByTagName('input')[0];

input.onfocus = function () {
    if(this.value == "请输入内容"){
        this.value = "";
        this.style.color = '#424242'
    }
}

input.onblur = function () {
    if(this.value == ""){
        this.value =  "请输入内容";
        this.style.color = '#999';
    }
}
```

### 窗体类操作事件(window上的事件)

- scrool ： 滚动条一滚动事件就触发

IE6没有fixed定位，我们写个js用absolute兼容ie

```js
var div = document.getElementsByTagName('div')[0];
var top1 = parseInt(div.style.top);
window.onscroll = function () {
    div.style.top = top1 + window.pageYOffset + 'px'; 
}
```

- load ： 整个页面加载完成的时候触发，主程序千万不能放到load里面

HTML和css是同时加载的；
HTML -- > domTree(二叉树)；
css  -- > cssTree;
两个树又会合并成一个renderTree，然后才开始渲染页面

若有一个图片，他看到img标签就挂到domTree上了，而不是将图片加载完才放到domTree上，他会开启一个新的线程去加载图片；
```<img src="xxx.solarge!!">```

我们将script标签放到最下面，当domTree完成后，就可以执行script，但是，如果我们写上了```window.onload = function () {}``` ，里面的内容是等renderTree加载完，并且所有的图片，文字信息全部加载完毕后才执行onload里面的代码

二级菜单：(有空当做晚课作业吧)

```js

```