# json、异步加载、时间线

## json

![json](../images/thirteenth.png)

json也是对象，但是他的属性名必须加双引号

JSON是一个静态类(和Math一样)，不用new构造

前后端通信通过json，传递的都是对象字符串

```js
var obj = {
    name : 'deng',
    age : 123
}
//obj就可以称作一个json
var str = JSON.stringify(obj);
console.log(str);//{"name":"deng","age":123}
console.log(JSON.parse(str));//这个返回的是对象，而不是字符串
```

- JSON.stringify() ;   json ---> string
- JSON.parse() ; string -- > json

## js加载时间线

domTree + cssTree = renderTree

dom元素的添加、删除,dom节点的宽高的变化，位置变化都会导致renderTree的重排(reflow)，所有的重排都是低效的；
我们在查看dom的宽高，位置时，也会导致重拍(因为浏览器要重排才能保证数据是实时的)

重绘(repaint) 他浪费的比较少，(改变背景颜色图片，字体颜色)(他不是重拍，他只改变一部分)

![时间线知识点](../images/fifteenth.png)

从js出生的那一刻(初始化js完成后)，记录的浏览器执行顺序

异步加载禁止使用document.write()原因： 他会把之前加载的文档流全部清空，在一定情况下有清楚文档流的功能

在整个文档加载完成后  和 异步加载js的文件中   能实现清空文档流的功能

```html
<div style="width: 100px; height: 100px; background-color: #f40;"></div>
    <script>
        document.write('a');
    </script>
<!-- 这样不会清空文档流，div和a都存在 -->
```

```html
<div style="width: 100px; height: 100px; background-color: #f40;"></div>
    <script>
        window.onload = function () {document.write('a')};
    </script>
这样文档流就会被清空，就连script标签也会被清除掉
```



## 异步加载js

js的下载和加载不是和HTML、css并行的，因为js会修改HTML和css(js是单线程的)

浏览器是先加载js文件的，js加载完成之后，HTML和css的Tree才开始构建

![异步加载js](../images/fourteenth.png)

不修改页面的js我们采用异步加载，像工具类的js，或者是存储数据的js

js异步加载的三种方案

- defer ： 但要等到Dom文档全部解析完才会被执行，只有ie9以下能用，这个可以将js代码写在script标签内部

```html
<head>
    <script src="tool.js" defer="defer"></script>
</head>
```

这样tool.js就会和HTML和css一同加载

- aysnc W3C标准 ： ie9以下不能用，他加载完就能运行，不用等Dom文档解析完，但是他只能用外部的js脚本

```html
<head>
    <script src="tool.js" aysnc="aysnc"></script>
</head>
```

- 创建script标签，插入到dom中，加载完毕后callBack

这种方法是最常用的一种方法，兼容性很好，也可以按需加载

```js
var script = document.createElement('script');
script.src = "myjstool/mytool1.js"//有了这一行代码，就会下载这个js，这样就实现了异步加载
document.head.appendChild(script);//到了这一行，才运行上面加载的js代码，第二行和第三行之间可以添加其他js代码
```

但是这个中间有一个小bug

```js
var script = document.createElement('script');
script.src = "myjstool/mytool1.js"
text();//text是tool.js上的函数
document.head.appendChild(script);
```

这个时候浏览器报错(text is not defined)，因为是异步加载，所以，执行到text这一行的时候，上面的js还没加载完成，所以会报错.

除了ie以外，script元素都有一个onload，就是当script加载完成的时候，才执行里面的代码、

```js
var script = document.createElement('script');
script.src = "myjstool/mytool1.js"
script.onload = function () {
    
}
document.head.appendChild(script);
```

ie有的是状态码(ajx后面也会学到)

我们写一个建兼容函数

```js
/**
 * 异步加载js
 * @param {string} url js路径
 * @param {function} callback 回调函数
 */
function loadScript (url, callback) {
    var script = document.createElement('script');
    if(script.readyState) {
        script.onreadystatechange = function () {//IE
            if(script.readyState == 'complete' || script.readyState == 'loaded') {
                callback();
            }
        }
    }else{
        script.onload = function () {
            callback();
        }
    }
    script.src = url;
}
```
我们要将src放到绑定事件的下面，因为如果绑定到上面，上面的下载可能瞬间完成，即还没有执行给script标签绑定事件的代码，状态码就已经固定了，就不会再触发了。

下面又一个小问题：

```js
/*我们引入了上面的loadScript*/
/*demo.js中有一个text的函数*/
loadScript('demo.js', text);
```

这样的代码会报错(text is not defined);因为传参发生在demo.js加载之前

我们的解决方法;

```js
loadScript('demo.js', function () {
    text();
})
```
