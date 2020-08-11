# dom继承树,dom基本操作


## 继承树

![继承树](../images/seventh.png)

Document是一个构造函数，但是我们不能new它,他留给系统自己调用的；
继承树就是原型链的继承关系

```js
Document.prototype.abc = 'abc';
console.log(document.abc);//abc
```

原型链继承关系：

```document ---> HTMLDocument.prototype  ---> Document.prototype```

dom元素的原型链的顶端也是Object的对象

## dom基本操作

![dom基本操作](../images/eighth.jpg)

选择div内部的span

```html
<div>
    <span></span>
</div>
<span><span>
```

```js
var div = document.getElementsByTagName('div')[0];
var span -= div.getElementsByTagName('span')[0];
```

补充一个知识：

getElementsByTagName("*");   -- > 选择所有的标签

```js
body = document.body;
head = document.head;
hyml = document.ducumentElement;
```

课堂作业

![课堂作业](../images/ninth.jpg)

- 1.

```js
var arr = [];
/**
 * 遍历元素节点树
*/
function getChildren(parent){
	
	console.log(
	
    arr.join("") + ( parent.nodeType != 3 ? parent.nodeName : parent.nodeValue )

    );
	var len = parent.childNodes.length;  
 
		if( len > 0 ){   
			arr.push( "\t" );  
				for( var i = 0; i < len; i++ ){  
					getChildren( parent.childNodes[i] );
		}
			arr.pop();  
			
	}
	
}
 
	getChildren(document);

```

- 2.

```js
/**
 * 返回元素往上n层的父级元素节点
 */
function returnParents (elem, n) {
    while(elem && n){
        elem = elem.parentElement;
        n --;
    }
    return elem;
}
```

- 3.

```js
/**
 * 返回第n个兄弟元素节点
 */
function rtnSibling(elem, n) {
	while(n) {
		if(n > 0 && elem) {
			elem = elem.nextElementSibling;
			n--;
		}else{
			elem = elem.previousElementSibling;
			n++;
		}
	}
	return elem;
}
```

- 4.

先说明一点 ：children返回的是子元素节点

```js
/**
 * 封装myChildren,来实现children的功能，来解决ie5的不兼容问题
 */
Element.prototype.myChildren = function () {
    var child = this.childNodes;
    var len = child.length;
    var count = 0;
    var temp = {
        lenth : 0,
        push : Array.prototype.push,
        splice : Array.prototype.splice,
    }
    for(var i = 0; i < len; i ++){
        if(child[i].nodeType == 1){
            temp[count] = child[i];
        }
    }
    return temp;
}
```

- 5.

hasChildren() 是判断是否有子元素节点

```js
/**
 * 封装myHasChildren,来实现children的功能，来解决ie5的不兼容问题
 */
Element.prototype.myHasChildren = function () {
    var child = this.childNodes;
    var len = child.length;
    for(var i = 0; i < len; i ++){
        if(child[i].nodeType == 1){
            return true;
        }
    }
    return false;
}
```

## 增加创建节点

- document.createElement('标签名') ： 创建一个元素节点
- document.createTextNode('文本')  ： 创建一个文本节点
- document.createComment()  : 创建一个注释节点
- document.createDocumentFragment()  ： 创建一个文档碎片节点

## 插入节点

- appendChild()
任何一个元素节点都有appendChild方法。就相当于push方法，放在元素中的最后.
但是appendChild是剪切操作

```html
<div></div>
<span></span>
```

```js
var div = document.getElementsByTagName('div')[0];
var span = document.getElementsByTagName('span')[0];

div.appendChild(span);
//这样原来的html结构就发生了改变
//变成了<div><span></span></div>
//就相当于将span剪切进去了
```

再来看一个例子

```html
<div></div>
<span></span>
```

```js
var text = document.createTextNode('莫问归期');
var div = document.getElementsByTagName('div')[0];
var span = document.getElementsByTagName('span')[0];

div.appendChild(text);
span.appendChild(text);
//只有span标签中有文字，div中没有文字(还是因为appendchild是剪切)
 ```

- insertBefore(a, b)  insert a before b

```html
<div>
    <span></span>
</div>
```

```js
var div = document.getElementsByTagName('div')[0];
var span = document.getElementsByTagName('span')[0];
var strong  = document.createElement('strong');
div.insertBefore(strong, span);
/*
*<div><strong><span></span></strong></div>
*/
```

## 删

- parent.removeChild()  -- > 删除子节点
- child.remove()

## 替换

- parent.replaceChlid(new, orige)


Element节点上的一些属性

- innerHTML
- innerText  (老版本火狐中没有)   有一个效果一样的   textContent

这两个会覆盖原来的结构，innnerText赋值时，会覆盖所有内容

Element节点上的一些方法

- setAttribute(a,b)  改变一个属性值
- getAttribute(a)   获取一个属性值

这两个只能是获取和改变行间属性

element.className  element.id

## 课后作业

![课后作业](../images/tenth.png)

- 1.

```js
/**
 * 根据insertBefore，写insertAfter
 */

 Element.prototype.insertAfter = function (elema, elemb) {
    var nextBrother = elemb.nextElementSibling;
    if(nextBrother){
        this.insertBefore(elema, nextBrother); 
    }else{
        this.appendChild(elema);
    }
 }
```

- 2.

```js
/**
 * 将目标节点内部的节点逆序
 */

function reverse (elem) {
    var children = elem.children;
    var oldArr = [];
    var len = children.length;
    for(var i = 0; i < len; i++) {
        oldArr.push(children[i]);
    }
    var newArr = oldArr.reverse();
    elem.innerHTML = '';
    for(var n = 0; n < len; n ++){
        elem.appendChild(newArr[n]);
    }
}
```

用appendChild实现剪切效果(html已知)

```html
<div>
    <span></span>
    <p></p>
    <i></i>
</div>
```

```js
/**
 * 将目标节点内部的节点逆序
 */
var div = document.getElementsByTagName('div')[0];
var span = document.getElementsByTagName('span')[0];
var i = document.getElementsByTagName('i')[0];
var p = document.getElementsByTagName('p')[0];

div.appendChild(p);
div.appendChild(span);
```