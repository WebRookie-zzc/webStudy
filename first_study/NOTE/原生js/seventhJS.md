# this、笔试真题讲解

先来看一道阿里巴巴的笔试题：

```js
function foo(){
    bar.apply(null, arguments);
}
function bar() {
    console.log(arguments)
}
foo(1,2,3,4,5);
//这里的输出结果是[1,2,3,4,5]
/*
解释一下第二行 bar.apply(null, arguments);
这里写了null，就不会再改变this指向
这里的代码就相当于  bar(arguments)
*/
```

看一道之前看过的题：

```js
var x  = 1;
if(function f () {}) {
    x += typeof(f);
    console.log(x);
}
//这里输出的值为字符类型的  1undefined
//因为将函数放到了括号里面，变成了立即执行函数，所以他的函数名就会被忽略，所以f中在预编译过程中存的是undefined
```

```js
var demo = (
    function f(){
        return 2;
    },
    function g(){
        return 1;
    }
)

console.log(typeof demo);
//这里输出的是g函数
```

我们可以写一下系统的isNaN方法(首先我们要先知道  NaN == NaN 的返回值是false(他连他自己都不认识))

```js
function myIsNaN (num) {
    var result = Number(num);
    if(String(result) == "NaN"){
        //这里要对result进行强制类型转换，因为NaN不等于任何值
        return true;
    }else{
        return false;
    }
}

console.log(myIsNaN('123'));
```

作比较，引用值比对的是地址：

```js
console.log({} == {});
//这里返回的是false(因为他们的地址不同)
```

```js
var obj1 = {};
var obj2 = obj1;
console.log(obj1 == obj2);
console.log(obj === obj2);
//这两个都是true
```

## this

- 1.函数预编译过程中this -- > window

下面是对预编译AO的补充

```js
function demo(c) {
    var a = 123;
    function b() {

    }
}
demo(1);
/*
AO {
    a : 123,
    b : function () {},
    c : 1,
    this : window,
    arguments : [1],
}

当有new dome(); 时，
然后会隐式  var this = demo.prototype;去覆盖this: window
*/
```

- 2.全局作用域里的this指向window

- 3.call/apply 可以改变函数运行this的指向

- 4.谁调用方法，this就指向谁

```js
var  obj {
    name : 'acb',
    fun : function () {
        console.log(this.name);
    }
}
obj.a();
//这里输出的是acb
/*
在预编译的时候,this指向window，但是由于是obj去调用，所以this就指向obj
*/
```

来看一道 阿里巴巴的关于this指向的压轴题

```js
var name = '222';
var  a = {
    name : '111',
    say : function () {
        console.log(this.name);
    }
}
var fun = a.say;
fun();
a.say();

var b = {
    name : '333',
    say: function (fun){
        fun();
    }
}
b.say(a.say);
b.say = a.say;
b.say();

/*
222
111
222
333
*/ 
```

下面开始讲解

第八行就相当于 ```var fun = function () {console.log(this.name)}``` 
就是将function拿到全局来执行，所以第九行输出的是222。
第十行就是对象a 去调用say方法，a调用的say方法，所以this指向a
第18行，就是在对象b的内部执行对象a中的say方法，并没有人调用它，所以他的指向是this，所以输出的结果是全局中的222

看一下下面的代码来理解一下

```js
var obj = {
    demo : function (){
        text();
    }
}

function text() {
   console.log(this); 
}

obj.demo();
//这里输出的是全局中的this
```

第19行，将a的say方法放到了b的say方法中

```js
var b  = {
    name : '333',
    say : function () {
        console.log(this.name);
    }
}
```

然后在20行b再调用这个更改后的方法，所以this指向的是b，输出的结果是‘333’

### arguments

```arguments.callee``` 返回他的函数引用值

```js
function demo () {
    var result = (arguments.callee == demo);
    console.log(result);//输出true
}
```

看一个具体的应用，应用在立即执行函数上

```js
var result = (function (num) {
    if (num === 1){
        return 1;
    }else{
        return num * arguments.callee(num - 1);
        //由于里脊执行函数找不到原来的函数名，所以用 arguments.callee来代替(他们是一样的)
    }
})(10)
console.log(result);
```

这样写也可以 

```js
var result = (function demo (num) {
    if (num === 1){
        return 1;
    }else{
        return num * demo(num - 1);
    }
})(10)

console.log(result);
```

```js
function demo () {
    console.log(arguments.callee);
    function text() {
        cosole.log(arguments.callee);
    }
    text();
}
demo();
//先输出demo然后输出text函数(第236行先输出)
```

``` fun.caller```

arguments没有这个属性，函数有，返回调用它的那个环境

```js
function demo(){
    text();
}
function text() {
    console.log(text.caller);
}
demo();
//这里输出的是demo函数
```

2017年用友的第一道题

```js
var foo = 1;
function print() {
    var  foo = 2;
    this.foo = 3;
    console.log(foo);
}
print();
```

函数内部的this也指向全局(GO) ,而AO中存的是2，所以，调用函数的时候就会输出2

看个变形：

比较下面两个的代码

```js
var foo = 123;
function print() {
    this.foo = 234;
    console.log(foo);
}
print();
//这里输出的是234;
因为函数中的this也是指向window的，所以执行函数的时候就相当与将全局中的foo变量更改了
```

```js
var foo = 123;
function print() {
// var this = Object.create(print.prototype);
    this.foo = 234;
    console.log(foo);
}
new print();
//这里有个隐式的this指向，但是函数的AO中没有foo，所以会打印GO的123；
```

再来看一道题： 

```js
var a = 5;
function text () {
    var a = 0;
    console.log(a);
    console.log(this.a );
    var a ;
    console.log(a);
}

//执行text() 的结果 ： 0  5  0
//执行new text() 的结果  ：  0   undefined  0
/*
在309行的var a;  这条语句在预编译的时候看，在执行的 时候就不会看他了，所以在310行的console.log(a),他输出的就不是undefined
*/
```

### 克隆(复制一份后，两者没有任何联系(即解决引用值传递的是引用地址的问题 ： 深度克隆))

浅层克隆(克隆原始值)

```js
var obj = {
    name : 'you',
    age : 123,
    sex : 'male',
}

var objClone = {};

function clone(origion, target){
    var target = target || {};
    //这里设置了一个容错，即用户不传target也可以
    for(var prop in origion){
        target[prop] = origion[prop];
    }
    return target;
}

clone(obj, objClone);
console.log(objClone);
```

但是对于下面的代码就不适用了

```js
var obj = {
    name : 'you',
    age : 123,
    sex : 'male',
    card : ['first', 'second', 'third']
}

var objClone = {};

function clone(origion, target){
    var target = target || {};
    for(var prop in origion){
        target[prop] = origion[prop];
    }
    return target;
}

clone(obj, objClone);
obj.card.push('forth');
console.log(objClone.card);
//这里输出的是['first', 'second', 'third' , 'forth']
```

for - in 不仅能遍历对象，还能遍历数组

```js
var arr = ['a', 'b', 'c', 'd'];
for(var prop in arr){
    //prop指的是索引
    console.log(arr[prop]);
}
```

深度克隆

```js
/**
 *
 *  深层克隆作业
 * 
 */

/**
 * 
 *  1.遍历对象
 *  2。判断是不是原始值
 *  3.判断对象类型(这里只考虑对象和数组)
 *  4.建立相对应的数组或对象
 *  5.递归
 * 
 */


var obj1 = {
    name : 'abc',
    num : [1,2,3,[1,2]],
};
var obj2 = {};

function deepClone(origin, target){
    var target = target || {};
    var toStr = Object.prototype.toString;
    var isObject = '[object Array]';

    for(var prop in origin){
        if(origin.hasOwnProperty(prop)){//这里排除对象原型上的属性值
            if(typeof(origin[prop]) == 'object' && origin[prop] !== null){
                if(toStr.call(origin[prop]) == isObject){
                    target[prop] = [];
                }else{
                    target[prop] = {};
                }
                deepClone(origin[prop], target[prop]);
            }else{
                target[prop] = origin[prop];
            }
        }
    }
    return target;
}

//执行并验证函数
deepClone(obj1, obj2);
console.log(obj2);

obj1.num[3].push(4);
console.log(obj2.num);
```

### 三目运算符

条件判断 ？ 是 ： 否   并且会返回值

```var num = 1 > 0 ? 1+1 : 2+2``` 执行完以后num的值是4  (简单的if)

看一道例题:

```js
var num = 1 > 0 ? ("10" > "9" ? 1 : 0) : 9;
//这道题的返回值是0
```

这里补充一个小知识点， 字符串中  “10” 是不大于 “9” 的，因为字符串的比较时一位一位比较ASCII码