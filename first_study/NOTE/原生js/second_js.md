# JS2

## 函数

代码重复冗余，叫做偶合，写代码要做到高内聚弱偶合

### 函数的定义

函数定义的两种方法：函数声明，函数表达式

```javascript
function 变量名(参数) {代码体;return 0;}
```

函数名的命名也是驼峰命名法(小驼峰原则，第一个首字母小写)

解释性语言不可能输出地址

命名函数表示和匿名函数(也叫函数表达式)表达式：

```javascript
/*命名函数表达式*/
var text = function abc(){console.log(1)}

/*匿名函数表达式*/
var text1 = function() {console.log(2)}
```

若采用命名函数表达式，那么：调用的时候，也只能用text(),如果用abc()，浏览器会显示abc is not defined;
但是 ```console.log(text.name)的值为abc```，如果采用的是匿名函数表达式，text1.name  的值就是text1

函数形参和实参的数量可以不同：

看例子：

形参多，实参少：

```javascript
function text(a,b,c ) {
  console.log(a,b,c);
}
text(1,2);
//输出的值为12undefined
```

形参少，实参多;

```javascript
function text(a,b) {
  console.log(a,b);
}
text(1,2,3);
//输出的值为12(多出来的就不管了)
```

参数列表：
- 形参列表： 形参列表的长度 ```函数名.length```
- 实参列表： 实参列表都存储在arguments数组中，可以通过for循环来遍历

下面的代码比较形参和实参的数量的多少：

```javascript
function demo(a,b,c){
    if (demo.length > arguments.length){
    console.log("形参多了");    
}else if(demo.length < arguments.length){
    console.log("形参多了")
}
else{
    console.log("数量相同")
}
}
demo(1,2,null,undefined);
```

未知个数的数字求和：

```javascript
function sum(){
    var some = 0;
    for(var i = 0; i < arguments.length;i++){
        some = some + arguments[i];
    }
    console.log(some);
}

sum(1,2,1,1,1,1,1);
```

改变形参，arguments里面的值也会随之改变，盖面arguments里面的值，形参对应的值也随之改变：看代码

```javascript
function demo(a,b) {    
    a = 2;
    console.log(arguments[0]);
    arguments[1] = 3;
    console.log(b)
}
demo(1,1);
//输出a的值是2
//输出b的值为3
```

上面的代码要注意：

arguments\[0\] 和 a是两个不同的变量，但是内部有一个映射规则，一个改变，另一个也会跟着改变;
但是有特殊情况，当形参比实参多的时候么多出来的形参和arguments中的元素不映射，看下面例子：

```javascript
function demo(a,b){
    b = 2;
    console.log(arguments[1]);
}
demo(1);
//因为这里不映射，所以输出的结果是undefined。因为arguments中的长度是1，就不会再将b填进去，所以,没有映射关系。
```

当数组超过索引的时候输出的是undefined：看代码

```javascript
var arr = [1,2];
console.log(arr[2]);
//这里输出的是undefined
```

终止函数:return 如果不加，程序在执行的时候也会自动加上return;函数中的switch可以用return终止

字符串也能够像数组一样从中一位一位的拿出来，要用到charAt()方法：看下面代码：
JavaScript字符串的底层是基于数组的

```javascript
var str = '12';
console.log(str.charAt(0));//输出1
console.log(str[0]);//输出1
console.log(str.charAt(1));//输出2
console.log(str[1]);//输出2 和上面的代码是等效的
```

函数作用域：

在函数里面可以访问修改函数外面的内容，函数外部的内容不能访问函数内部的内容，互相嵌套的函数，内层函数能够访问到外层函数定义的变量

#### 预编译()

JS执行三部曲：语法分析(先大致扫描一下全文，看看有没有语法错误，如果有语法错误，那么一行js代码都不执行)、
预编译、解释执行(解释一行执行一行)

函数声明整体提升，变量 声明提升(相当于var a;提升，但是赋值的过程没有提升)

注意：函数声明可以提升，函数表达式不能提升

还是看例子：

```js
demo();

function demo() {
  console.log('a');
}

//函数使用在函数定义之前，函数能够正常执行
```

```js
console.log(a);

var a = 'a';

//这里不会报错，但是输出a的值是undefined
//就相当于下面注释起来的代码  变量  声明提升
/*
var a;
console.log(a);
a = 'a';
*/
```

暗示全局变量：未经声明的变量直接进行赋值，浏览器不会报错，他属于全局对象，归window对象所属 ```a = 10; 可以这样访问(console.log(a))也可以这样访问console.log(window.a)```

全局对象是window，window就是全局的域

全局上的任何变量，即使声明的变量，也归window所有，一切全局变量都是window的属性，变量定义在全局上，就相当于在window上挂了一个属性

下面一个瞎搞的代码，想想应该会输出什么：

```js
console.log(a);

function a(){
    var a = 1;
}

var a = 2;
/*请问第一行代码输出的值是多少？*/
//[Function: a]
```

注意：连续赋值会导致中间变量未经过声明就直接赋值，他们属于全局变量。还是看下面的例子

```javascript
function demo(){
    var a = b = 123;
}

demo();
console.log(b);
```

调用函数之后还可以访问到b，但是访问不到a;调用函数之前a和b都是访问不到的

先看例子再讲解预编译：(想一想每一个console.log的结果)(有覆盖的问题)

```javascript
function fn(a) {
  
function fn(a){
    console.log(a);

    var a = 123;
    console.log(a);

    function a(){}
    console.log(a);

    var b = function () {}
    console.log(b);

    function d() {}
}

fn(1);
}
```

##### 函数体系的预编译发生在函数执行的前一刻

但是预编译不只发生在函数体系内，他还发生在全局

预编译的四步曲：

- 1.创建AO对象
- 2.找形参和变量声明，将变量和形参名作为AO对象的属性名，他们的值为undefined
- 3.将实参值和形参相统一
- 4.在函数体中找到函数声明，值赋予函数体；

下面分析上面代码:

```text
1.创建AO对象
AO{}
2.找形参和变量声明，将变量和形参名作为AO对象的属性名，他们的值为undefined
AO{
    a: undefined,
    b: undefined,
}
注意:function是函数声明不是变量声明，而 b = function(){}属于函数表达式，不是函数声明
3.将实参值和形参相统一
AO{
    a: 1,(因为下面的fn(1))
    b: undefined,
}
4.在函数体中找到函数声明，值赋予函数体
AO{
    a: function a(){},
    b: undefined,
    d: function d() {},
}

预编译结束，开始执行函数体：
1.第一行要输出的a要从AO对象中取出，所以输出function a(){}
2.第二行给a赋值，修改AO对象中a的值
AO{
    a: 123,
    b: undefined,
    d: function d() {},
}
3.第三行输出a的值123
4.第四行在预编译中已经看过，就不再执行了
5.第五行输出AO中a的值123
6.第六行将function () {}放入AO中
AO{
    a: 123,
    b: function () {},
    d: function d() {},
}
```

全局中的预编译和函数体系的预编译差不多，全局中创建的对象是GO(global object)对象,window就是GO对象(他们是同一对象的两个名字)

全局的预编译发生在全局执行的前一刻

还是分析下面的代码(分析GO 和 AO)：(js是单线程，函数执行完才继续执行函数下面的代码)

```js
console.log(text);
function text(text){
    console.log(text);
    var text = 234;
    console.log(text);
    function text(){}
    console.log(text);
}

text(1);
var text = 123;
```

```text
函数执行前的AO和GO
GO{
    text:function text( {
    //--skip--   
    }
}
AO{
    text:function text(){}
}

AO 和 GO 中的text函数不同
函数中最后一行输出的是函数内部定义的text函数,当要访问的值在AO中有，就从AO中取，当
AO中没有的时候，才去GO中访问，取值
```

还是看例子：

```js
global = 100;
function demo() {
    console.log(global);
    global = 200;
    console.log(global);
    var global = 300;
}

demo();
var global;
```

第一个输出的是undefined，因为有变量 声明提前，AO中有global，所以从AO拿。

预编译的过程是不看if等代码的，还是看下面的例子：

```javascript
function demo() {
    console.log(b);
    if(a){
        var b = 100;
    }
    console.log(b)
    c = 234;
    console.log(c);
}

var a;
demo()
```

在预编译的时候，if else中的变量声明都会被拿出来被赋值为undefined,预编译的时候也不会看return
第一个第二个他们都会输出undefined 

看两道前几年的百度公司的笔试题：

```javascript
function bar(){
    return foo;
    foo = 10;
    function foo() {
    }
    var foo = 11;
}

console.log(bar());//先看题，答案一会给
```


```javascript
console.log(bar());

function bar() {
    foo = 10;
    function foo() {

    }
    var foo = 11;
    return foo;
}
```

```text
下面来解释上面的笔试试题：

第一道：
在预编译的时候，不看return，所以在AO对象中foo存的值就是function foo(){}
在执行函数的时候，return的值就是function foo(){}

第二道：
因为函数提前了，所以，输出的都是函数执行完的返回值，11
```

if中是不允许进行函数定义的

看下面的例题，判断是否可以打印出来：

```js
if(typeof(a) && -true + (+undefined) + ""){
    console.log("判断这里是否能输出");
}
```

```text
解析：typeof返回一个字符串类型的undefined
-true === 1   (+undefined) === NaN   ---->右边是字符串类型的NaN
两个非空字符串，所以逻辑运算返回的值是true
```

```js
if(11 + "11" * 2 === 33){
    console.log("判断这里面能否输出");
}
//能输出，乘号两边都要转换成数字类型
```

```js

!!" " + !!"" - !!false || document.write("判断这里能否输出")
//这里是不能输出的，因为 逻辑或和逻辑与也具有短路的特性。空格字符串(不是空字符串)的非是false
```
注意：document.write()没有返回值，他的值为false

逻辑运算符的优先级高于赋值运算符

````javascript
//判断window.foo 的值：

window.foo || (window.foo = "bar")

console.log(window.foo);
//过程：程序运行时,先看括号里面的  然后再看前面的
````

若写成下面这样，就会报错：

```js
window.foo || window.foo = "bar";
//因为逻辑或的优先级要高于赋值号，所以先执行前面的逻辑或运算
```