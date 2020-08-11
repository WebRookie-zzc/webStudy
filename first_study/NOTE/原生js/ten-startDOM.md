# DOM

DOM -- > Document Object Model (文档对象模型)

DOM  能够操作HTML和XML (任何东西都操作不了css)(改变的只是HTML的行间样式，没有直接修改css文件)

先有的 XML -- XHTML -- HTML4.0 

xml的标签是自定义的，而html不行，现在json渐渐取代了xml

选项卡代码：

```html
<div class="wrapper">
    <button>111</button>
    <button>222</button>
    <button>333</button>
    <div class="content">111</div>
    <div class="content">222</div>
    <div class="content">333</div>
</div>
```

```css
.active {
    background-color: black;
    color : #fff;
}

.content {
    border : 2px solid #f40;
    width : 100px;
    height : 100px;
    display: none;
    text-align : center;
    margin-top : 10px;
}
```

```js
function changeButton() {
    var oBtn = document.getElementsByTagName('button');
	var oDiv = document.getElementsByClassName('content');
	var oBtnLen = oBtn.length;
	for(var i = 0; i < oBtnLen; i ++){
		(function (n) {
			oBtn[n].onclick = function () {
				for(var j = 0; j < oBtnLen;j++){
					oBtn[j].className = "";
					oDiv[j].style.display = "none";
				}
				this.classList.add("active");
				oDiv[n].style.display = 'block'; 
            }
		})(i);
	}
}

changeButton();
```

小物块的运动(定时器)

```js
var div = document.createElement("div");
document.body.appendChild(div);
div.style.width = "100px";
div.style.height = "100px";
div.style.position = 'absolute';
div.style.left = '0px';
div.style.backgroundColor = 'red';
var timer = setInterval(function (){
    div.style.left = parseInt(div.style.left) + 3 + 'px';
    if(parseInt(div.style.left) > 200) {
        clearInterval(timer);
    }
},30);

```

用键盘去调节小物体的位置

```js
var div = document.createElement('div');
document.body.appendChild(div);
div.style.position = 'absolute';
div.style.width = '100px';
div.style.height = '100px';
div.style.top = '10px';
div.style.left = '10px';
div.style.backgroundColor = '#f40';

document.onkeydown = function (e) {
    switch(e.which){
        case 37:
            div.style.left = parseInt(div.style.left) - 5 + "px";
            // console.log(div.style.left);
            break;
        case 38:
            div.style.top = parseInt(div.style.top) - 5 + "px";
            // console.log(2);
            break;
        case 39:
            div.style.left = parseInt(div.style.left) + 5 + "px";
            // console.log(3);
            break;
        case 40:
            div.style.top = parseInt(div.style.top) + 5 + "px";
            // console.log(4);
            break;
    }
}
```

注意，元素的css要用js来填，如果写到css中的话，js是读取不到的

做一个画板

```html
ul>li[image-date='0']*100
```

```css
* {
    margin : 0;
    padding : 0;
}
.wrapper {
    width : 100px;
    height : 100px;
    /* border : 1px solid red; */
    margin-top: 30px;
    margin-left : 30px;
}

li {
    list-style: none;
    width : 10px;
    height : 10px;
    border : 0.3px solid #000;
    float: left;
    box-sizing: border-box;
```

```js
var ul = document.getElementsByTagName('ul')[0];
ul.onmouseover = function (e) {
    var event = e || window.event;
    var target =  event.target || event.srcElement;

    target.style.backgroundColor = "rgb(0, 255," + target.getAttribute('image-date') + ")";
    target.setAttribute('image-date', parseInt(target.getAttribute('image-date')) + 6); 
}

var li = document.getElementsByTagName('li')[0];
```

## dom的基本基本操作

### 查

document代表整个文档，document就包含了html标签

- ```document.getElementById()[注意这里没有s]``` 这个获得的是一个元素，不是类数组，在IE8以下的浏览器，id不区分大小写，而且也返回匹配name属性的元素

- ```document.getElementsByTagName()[注意这里有s]```，这个是应用最广泛的，他返回的是一个类数组，他没有push方法
- ```document.getElementsByName()``` ,只有部分标签的name可以生效(表单，表单元素，img，iframe)
- ```document.getElementsByClassName()``` ,但是ie8和ie8以下的版本中是没有的，可以多个class写在一起
- ```document.querySelector()```,这个是css选择器，，他选择一个元素，选择元素就像css选择HTML中的元素一样（但是他没有时效性）
- ```document.querySelectorAll()``` ,这个也是css选择器，他选择符合条件的所有元素

但是最后，两个元素都是没有时效性的，所以我们在开发过程中不使用他们，除非我们想要一个副本。

```js
var divs = document.getElementsByTagName('div');
var qdivs = document.querySelectorAll('div');
console.log(divs);//HTMLCollection(3) [div, div, div]
console.log(qdivs);//NodeList(3) [div, div, div]
divs[1].remove();
console.log(divs);//HTMLCollection(2) [div, div]
console.log(qdivs);//NodeList(3) [div, div, div]
qdivs[0].remove()
console.log(divs);//HTMLCollection(1) [div]
console.log(qdivs);//NodeList(3) [div, div, div]
```

## 遍历节点树(所有的dom元素都具有这些方法)

- parentNode --- > 父节点(返回它的上一层的父元素) (最顶端的parentNode是  #document)(document.parentNode   ==== null)(这里不加括号)
- childNodes -- > 子节点们(不仅仅是元素节点，还有文本节点、属性节点、注释节点、document、documentFragments)
- firstChild -- > 第一个子节点
- lastChild -- > 最后一个子节点
- nextSibling -- > 下一个兄弟节点
- previousSibling -- > 前一个兄弟节点

## 元素节点的遍历(除了child都是ie9以下不兼容)

- parentElement -- > 返回父元素节点(顶端是html，document不是元素节点)
- children  -- > 下一层的子元素节点
- firstElementChild
- lastElementChild
- nextElementSibling
- previousElementSibling

节点的类型

- 文本节点  (nodeType返回的值，下面的数字都是) ---- 1
- 注释节点   ----- 2
- 元素节点  ------ 3
- 属性节点  ------ 8
- document  ----- 9
- DocumentFragment(文档碎片节点) ---- 11

## 节点的四个属性

- nodeName ： 元素的标签名，以大写形式表示，只读，不能更改,返回值是字符串的形式('#document'、 '#text'、'DIV'等) 
- nodeValue : 文本节点和注释节点的文本内容，可以读取也可以写入(可读写)
- nodeType ： 读取节点的类型，只读

用nodeType写一个子元素返回元素节点的函数

```html
<div>
    <strong></strong>
    <i><</i>
    <em></em>
</div>
```

```js
var div = document.getElementsByTagName('div')[0];

function returnChildElements (node) {
    var children = node.childNodes;
    var len = children.length;
    var temp = {
        length: 0,
        push : Array.prototype.push,
        splilce : Array.prototype.splice,
    }
    for(var i = 0; i < len; i ++){
        if(children[i].nodeType == 1){
            temp.push(children[i]);
        }
    }
    return temp;
}

console.log(returnChildElements(div));
```

- hasChildNodes()  --- > 判断有无子节点，返回值为boolean类型的数据

