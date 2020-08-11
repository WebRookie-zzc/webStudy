# try-catch  es5标准模式

语法

```js
try {

}catch(e){

}
```

防止我们报错，当报错的时候，不抛出错误，当try中的代码某一行出现错误时，try中报错行以后的代码都不会运行，但是try-catch结构之外的代码依然可以运行

看例子

```js
try {
    console.log('a');
    console.log(b);
    console.log('c');
} catch (e) {
    
}

console.log('d');
```

这里的输出结果是a和d，并不会输出c

当try中的代码没有错误时，catch中的代码不会执行。当出现错误时，错误是一个对象，错误会保存在catch穿进去的形参中(error对象)；

error对象有两个个属性： ```error.name``` ```error.message```

```js
try {
    console.log(a);
}catch(e) {
    console.log(e.name + " : " + e.message);
}
//ReferenceError : a is not defined
```

error.name的六种值对应的信息“

|错误名称|错误信息|
|:---:|:---:|
|EvalError|eval()的使用与定义不一致|
|RangeError|数值越界|
|ReferenceError|非法或不能是别的引用数值|
|SyntaxError|发生语法解析错误|
|TypeError|操作数类型错误|

## eval简介 whth语法

```eval("字符串")``` : 将内部的字符串解析代码运行

```js
eval("console.log('a')");
```

with可以改变作用域链，我们不使用with的原因： 因为with改变了原型链，过多消耗了资源，效率低。他可以使程序执行的非常慢

先看一段代码：

```js
with () {
    console.log("1");
    //当没有传递参数的时候，和普通的代码一样执行
}
```

with传递了参数(参数为对象)，他就会将传进去的对象作为作用域链的顶端(即在寻找元素的时候，先从穿进去的对象中找)

```js
var obj = {
    name : 'obj',
}

var name = "window";

function demo (){
    var name = "scope";
    with (obj){
        console.log(name);
    }
}

demo();
//这里输出的就是obj中的name(obj);
```

## es5严格模式

浏览器的内核是基于es3.0和es5.0新增方法使用的

es3.0和es5.0产生冲突时，在非严格模式下，按照3.0，在严格模式下按照5.0

严格模式的两种用法(开启严格模式)

- 全局严格模式 ： 在文档的逻辑开头加上  ```use strict```(前面不能有代码，但是可以有注释)
- 局部严格模式 ： 在函数的开头加上 ```use strict``` （推荐）

```js
function demo() {
    "use strict";
    // --函数体--
}
```

为什么要用字符串来开启严格模式而不用一个函数呢？？

如果通过函数来开启严格模式，会导致浏览器的兼容的兼容问题。我们用字符串，能够保证新版本的浏览器能够识别出来，而且旧版本的浏览器不会报错

> 严格模式不支持with、arguments.callee、func.caller，变量在赋值前必须声明，局部this必须被赋值(赋值什么就是什么)，拒绝重复属性和参数；

- 不支持with

```js
"use strict";
var obj = {
    name : 'obj',
}

var name = "window";

function demo (){
    var name = "scope";
    with (obj){
        console.log(name);
    }
}

demo();
//报错
```

- 不支持arguments.callee和func.caller

```js
function demo() {
    "use strict";
    console.log(arguments.callee);
}

demo();
//TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
```

```js
"use strict";
function demo() {}
demo.caller()
//TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
```

- 变量在赋值前必须声明

```js
"use strict";
var a = b = 1;
//ReferenceError: b is not defined
```

- 局部的this必须被赋值

先看代码：

```js
function demo () {
    "use strict";
    console.log(this);
}

demo();
//输出的值是undefined
//在非严格模式下，this默认指向的是window
```

```js
function demo () {
    "use strict";
    console.log(this);
}

demo();

new demo();//这里通过new以后this就是一个空对象了，就不是undefined了
```

赋值用call进行赋值

```js
function demo () {
    "use strict";
    console.log(this);
}

demo.call({});
```

比较一下严格模式和非严格模式下将原始值传递个this的结果

```js
function demo () {
    "use strict";
    console.log(this);
}

function text () {
    console.log(this);
}

demo.call(123);//123
text.call(123);//Number {123}  (这里是对象)
```

- 拒绝重复的参数

```js
function demo (name , name) {
    "use strict";
    console.log(name);
}
demo(1,2)
// SyntaxError: Duplicate parameter name not allowed in this context
```

然而在非严格模式下：

```js
function demo (name, name) {
    console.log(name);
}
demo(1);//undefined
demo(2,3);//3
```

- 拒绝重复的属性，但是现在还不会报错

```js
"use strict";
var obj  = {
    name : 1,
    name : 2,
}
console.log(obj.name);
//2
```

注意： 我们在开发过程中不允许用eval；他可能会改变作用域；
eval是魔鬼