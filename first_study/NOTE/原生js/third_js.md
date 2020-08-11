# JS third

## 作用域精解

函数也是对象，他也有属性和属性值

有些属性我们是能够访问到的：

```javascript
function text() {}
text.name;
text.prototype;
```

有些属性是我们访问不到的： ```text.[[scope]]```  这个属性就是它的作用域  (很复杂)；他们仅供js引擎自己调用
\[scope\]就是我们所说的作用域，其中存储了执行期上下文的集合

函数每次执行时，对应的上下文都是独一无二的，所以，多次调用同一函数会导致创建多个执行期上下文
当函数执行完，他所产生的执行上下文就被销毁

执行期上下文就是AO 和 GO

作用域链：\[scope\]中所存储的执行期上下文对象集合，这个集合呈链式链接，我们把这种链接叫做作用域链。
在查找变量的时候，作用域链的顶端一次向下查找。

在哪个函数里面查找变量，就从哪个函数的作用域顶端去查找

下面将详细解释下面的代码：

```javascript
function a(){
    function b() {
        var b = 234;
    }
    var a = 123;
    b();
    console.log(a);
}

var glob = 100;
a();
```

当函数a被定义的时候：GO的地址就会存储在a.\[scope\]的 scope chain 中

![函数a被定义时](../images/first.png)

当函数a执行的时候，预编译产生的AO对象，会放在scope chain的顶端(0 和 1 都是索引)

![函数a在执行时](../images/second.png)

当函数b定义的时候，他的大环境就是函数a，b.\[scope\],所以他在定义的时候scope中存的就是函数的AO 和 GO

![函数b被定义的时](../images/third.png)

当函数b执行的时候，他所产生的AO对象就会放到b.\[scope\]的顶端

![函数b在执行时](../images/forth.png)

注意：这里面就相当于数组，他们传递的都是引用(地址)

再来看看他们是如何被销毁的(销毁的方式是砍线)

当函数b执行完的时候，他会销毁自己生成的AO，返回他被定义时的状态(b.\[scope\]中的函数a的AO 和 GO都不会被销毁)

当函数a执行完毕的时候哦，他也会销毁自己的AO，但是，他的AO中有\[function:b\],函数的AO被销毁，整个函数b也会被全部销毁，整个函数b将不复存在

## 闭包

还是先放代码：

```javascript
function a () {
    function b() {
        var bbb = 234;
        console.log(aaa);
    }
    var aaa = 124;
    return b;
}

var glob = 100;
var demo = a();
demo();
```

(b被保存到了外面，仍然可以访问a中的值)，内部的函数被保存到了外部，一定生成了闭包，AO运行完以后，想删除自己的AO对象都删除不掉，a的指向箭头删掉了，但是函数b被扔到了外面，
他的箭头删不掉，所以a函数的AO对象删不掉

看图：

函数a执行时

![函数a执行时](../images/fifth.png)

函数a执行完毕后

![函数a执行完毕后](../images/sixth.png)

判断下面的输出结果：

```js
function a() {
    var num = 100;
    function b() {
        num ++;
        console.log(num);
    }
    return b;
}

var demo = a();
demo();
demo();
//输出结果101  102
```

### 闭包的应用和危害
当内部函数被保存到外部时，就会形成闭包。闭包会导致原有的作用域链不被释放，
造成内存外泄(会占用不必要的内存)

闭包的作用：

- 实现公有变量：eg:函数累加器

```javascript

function add() {
    var count = 0;
    function demo(){
        count++;
        console.log(count);
    }
    return demo;
}

var counter = add();
counter();
counter();
counter();
counter();
//每执行一次函数，count就加一
```

- 可以做缓存(存储结构)：

```javascript
function demo() {
    var num = 100;
    function a() {
        num ++;
        console.log(num);
    }
    function b() {
        num --;
        console.log(num);
    }
    return [a , b];
}

var myArr = demo();
myArr[0]();
myArr[1]();
```

缓存一个简单应用，以后再看那些高级的应用

```javascript
function eater() {
    var food = "";
    //返回对象也生成了闭包
    return {
        eat: function () {
            console.log("i am  eating " + food);
            food = "";
        },
        push: function (myFood) {
            food = myFood;
        }
    }
}

var eater1 = eater();
eater1.push("banana");
eater1.eat();
//这里的food就相当于一个存储结构
```

- 可以实现封装，属性私有化

- 模块化开发，防止污染环境变量

### 立即执行函数

由于在全局中定义的函数只有当js执行完以后才得以释放，对于那些只执行一次的函数，他就占用了内存，所以我们用立即执行函数，在函数执行完一次后就将函数销毁。
立即执行函数和函数相同，可以传递参数，也可以有返回值。立即执行函数不需要调用，运行到这里就执行，他也不需要函数名

语法： ```(functuon (形参) {} (实参))```   ```(function (形参) {})(实参)```

例：

```javascript
var num = (function (a, b ,c) {
    return a + b + c;
}(1,2,3));

console.log(num);
```

只有表达式才能被执行符号(执行符号就是小括号)执行

```javascript
//像下面这样直接加小括号会报错，浏览器报语法错误(他叫函数声明，不是表达式)
function text() {
    console.log('a');
}()

text();//这样就可以执行，他就是表达式
//text就是函数引用

//函数表达式就能执行（这样就不用调用了，直接执行）
var demo = function () {
    console.log('b');
}()
```

被执行符号执行的表达式，会放弃原来的函数名，基本上也就成为了立即执行函数

看例子：

```javascript

var demo = function () {
    var a = 123;
}();

console.log(demo);
//这里的输出结果是undefined
```

当然函数声明也能转换成表达式：(用 + - ！ && || 将它变成表达式)

```javascript
//+ 换成 - 或者 ！ 是一样的
+ function demo () {
    console.log('a');
}();

console.log(demo);
//输出a以后就报错，demo is not defined
```

```javascript
true && function demo(){
    console.log('a');
}()

console.log(demo);
```

下面再来重新理解一下立即执行函数

小括号可以看成数学运算的符号，所以 ```(function demo (){})()``` 前面的小括号里面的东西就成为了表达式，就可以执行了，由于函数名没有啥意义，就省略了
```(function demo () {} ()``` 和上面的式子是一样的

来看一眼一年阿里巴巴的恶心试题：

```javascript
function demo(){
    var a = 123;
}()
//这样肯定会报错，因为()只能被解释成执行符号
```

```javascript
function demo(e,b,c,d){
    var a = 123;
}(1, 2, 3 ,4);
//这里就不会报错；,demo函数也没有执行

浏览器认为的是下面的代码：

function demo(e,b,c,d) {
  var a = 123;
}

(1,2,3,4);
```

再看一个诡异的代码：

```javascript
function demo(){
    var Arr = [];
    for(var i = 0; i < 10; i++){
        Arr[i] = function (){
            console.log(i);
        }
    }
    return Arr;
}

var myArr = demo();
for(var j = 0; j < 10; j++){
    //console.log(myArr[i]()) 一个十一个undefined
    myArr[j]();
}
```

上面的代码本应该输出0 1 2 --- > 9。但是却输出了是个10

解释：数组中十个函数用的都是demo函数的AO，当demo函数执行完的时候，i的值是10,所以每次打印的都是10

这个问题用立即执行函数解决

```javascript

function demo(){
    var Arr = [];
    for(var i = 0; i < 10; i++){
        (function (j){
            Arr[i] = function () {
                console.log(j);
            }
        }(i))
    }
    return Arr;
}

var myArr = demo();

for(var k = 0; k < 10; k++){
    myArr[k]();
}
```


十个独立的立即执行函数，他们的j是独立的，j都是存在他们中的AO中，(立即执行函数读到它就会被立即执行)

再来看看：DOM操作产生的闭包的问题

阿里巴巴的一道社考笔试题
题目：单击li时在控制台打印点击的a的索引

```html
<ul>
<li>a</li>
<li>a</li>
<li>a</li>
<li>a</li>
</ul>
```

首先展示一下错误的代码

```javascript
function demo() {
    var liCollection = document.getElementsByTagName('li');
    //此时liCollection是个数组，它里面存着四个li元素
    for(var i = 0; i < liCollection.length; i++){
        liCollection[i].onclick = function (){
            console.log(i);
        }
    }
}

demo();
```

上面的代码不管在浏览器中点击哪一个li标签，他都会输出4(原因就是闭包)，相当于外部的li用了函数内部的函数

解决方法只有立即执行函数

更正之后的代码：

```javascript
function demo() {
    var   liCollection = document.getElementsByTagName('li');
    for(var i = 0; i < liCollection.length; i++){
        (function (j) {
            liCollection[j].onclick = function (){
                console.log(j);
            }
        })(i)
    }
}

demo();
```

再来做一道题：

![第一道作业](../images/firstHoemwork.png)

```javascript
var str = window.prompt("请输入字符串");
var byte = 0;
function returnByte(str){
    for(var i = 1; i < str.length;i++){
        var temp = str.charCodeAt(i);
        if (temp <= 255) {
            byte++;
        }else if(temp > 255){
            byte += 2;
        }
    }
    return byte;
}

var result = returnByte(str);
console.log(result);
```

再来简化代码：

```javascript

var str = window.prompt("请输入字符串");
function returnByte(str){
    var len = str.length;
    for(var i = 0; i < len;i++){
        if(str.charCodeAt(i) > 255){
            len ++;
        }
    }
    return len;
}

var result = returnByte(str);
console.log(result);
```

#### 逗号运算符

``` var a = (1+1,2+2)```  从前往后依次计算，然后返回最后一个的执行结果

看一道2015年腾讯旗下微店的笔试题：

```javascript
var f = (
    function a(){
        return '1';
    },
    function b() {
        return 2;
}
)();

console.log(typeof f);
```

```text
这道题也比较简单，就是用的逗号运算符。
最前面括号中的逗号预算符，返回的是函数b，然后函数b链接后面的执行符号，
所以f的值是2，f的类型的是number
```

再看一道还是2015年的微店的题：

```javascript
var x = 1;
if(function f() {}){
    x += typeof(f);
}
console.log(x);
```

```text
下面来解释：
首先要懂，function f(){} 转换成Boolean类型的值是true
然后因为function f放在了括号里，变成了表达式，就相当于变成了立即执行函数。
经过了if那一行，f执行后，函数f就不存在了(GO中不存在f了)。
而对于没有声明的变量，typeof是不会报错的，他会返回undefined(string类型的undefined)
所以，x加上string类型的undefined，得到的结果是:1undefined
```