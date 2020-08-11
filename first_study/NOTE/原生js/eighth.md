# 数组

## 数组的定义方式

```var arr = [];```   ```var arr = new Array(1,2,3,4,);```

疏松数组 ：  ```var arr = [1,2,3,,,,4,5];  console.log(arr.length);//这里输出的是8，空出来的部分补充undefined```

我们用的数组的方法都是来自 Arrat.prototype  上的

当只传一个参数的时候，第一种定义方式和第二种定义方式就不同了,第二种方式传一个参数就会被作为数组的长度

```js
var arr1 = [10];
var arr2 = new Array(10);//创建一个长度为10的空数组

console.log(arr1);
console.log(arr2);

//[10]
//[undefined * 10]
```

但是，如果写成这样就会报错  ```var arr = new Array(10.2);```

构造数组的方法只有这两种

## 数组的读和写

js中的数组很松散，不会像其他语言一样那么容易报错，因为js的数组是基于对象的。

看代码：

```js
var arr = [];
console.log(arr[10]);
//虽然第11位没有值，但是它不会报错，他会返回undefined

arr[10] = 'abc';
console.log(arr[10]);//输出'abc'

console.log(arr.length)//11(给第十一个元素赋值，就会将空数组撑大)
```

## 数组常用的方法

- 改变原数组的方法

> push : 在数组的末尾添加数据，可以添加任意类型的数据，可以添加任意个数的数据

```js
var arr = [];
arr.push(1,2,3,43,4);
console.log(arr);
```

模拟系统的push方法

```js
Array.prototype.mypush = function () {
    for(var i = 0; i < arguments.length; i++) {
        this[this.length] = arguments[i];
    }
    return this.length;
}
```

> pop : 将数组的最后一位删除并将其返回出来  他里面没有参数，传了也白传

```js
var arr = [1, 2, 3];
var num = arr.pop();
console.log(num);//3
console.log(arr);//[1, 2]
```

> shift : 从数组的最前面删除一个数据，并将其返回
> unshift : 从数组的最前面添加元素，并且可以传递多个元素


```js
var arr =  [1,2,3];
var num  = arr.shift();
console.log(num);//1
console.log(arr);//[2, 3]
```

```js
var arr  = [1,2,3];
arr.unshift(4,5);
console.log(arr);
//[4,5,1,2,3]
```

> concat : 连接多个数组的方法

```arr.concat(arr1[,arr2, arr3, arr4 ........])```  注意：  不能用arr1 + arr2 ,这样相加得出来的结果是字符串类型的数据

> reverse : 将数组内的元素逆转

> splice : 删除特定元素，并将其返回(以数组的形式返回，当只有一个元素的时候，返回的也是数组)，并且在切口处添加元素

```arr.splice(切走元素的起始索引,要切走的长度(这里长度可以是0),要添加进去的元素{这里可以传递任意个数的参数}) ```

```js
var arr = [1,1,2,2,3,3];
var num = arr.splice(0,3,0,0,0);
console.log(num);//[1,1,2]
console.log(arr);//[0,0,0,2,3,3];
```

```js
var arr = [1,2,3];
arr.splice(3, 0, 5, 6);
console.log(arr);
//[1,2,3,5,6]
```

可以用负数来截取最后的位置

```js
var arr = [1,2,3];
num = arr.splice(-1,1);
console.log(num);
//3
```

```js
var arr = [];
arr[-3] = 0;
console.log(arr);
console.log(arr.length);
//['-3' : 1]
//0
```

> sort :  升序重新排列数组中的元素(他是把数组里面的元素全部作为字符串，然后逐位比较ASCII码，这就导致了 10 小于 9的问题)

```js
var arr = [2,1,3];
arr.sort();
console.log(arr);
//[1,2,3]

如果想要降序排列
那么：
arr.sort().reverse();
```

下面出现的问题

```js
var arr = [1,2,3,10];
arr.sort()
//[ 1, 10, 2, 3 ]
```

为了解决这个问题，sort方法就给我们提供了一个接口

```arr.sort(function () {})``` 这里不是立即执行函数，系统帮我们调用；
写成 ```function text() {}; arr.sort(text())``` 是一样的；

注意： 

- 1. sort里面的函数必须传递两个形参
- 2. 当返回值是正数的时候，将两个参数互换位置，当返回值是负数的时候，两数保持原来的位置不变。
- 3. 当系统执行时，会给我们调用这个函数，将数组中的元素按照顺序两两传入函数中

 将数组升序排列

```js
var arr = [1,2,3,10,4];
arr.sort(function (a, b){
    if(a>b){
        return 1;
    }else{
        return -1;
    }
});
```

简化代码：

```js
var arr = [1,2,3,10,4];
arr.sort(function (a, b){
    return a - b;//a-b是升序
    //return b - a;   b-a是降序
});
```

看一道阿里巴巴的题：

随机打乱一个有序的数组

```js
var arr = [1,2,3,4,5,6,7,8];
arr.sort(function (){
    return Math.random() - 0.5;
});
console.log(arr);
```

看一个应用：按age的大小排列对象

```js
var zhnang = {
    name : 'zhang'
}

var deng = {
    name : 'deng',
    age : 30,
};

var zhang = {
    name : 'zhang',
    age : 20
}

var cheng = {
    name : 'cheng',
    age : 18,
}

var arr = [deng, zhang, cheng];
arr.sort(function (a, b){
    return a.age - b.age;
});

console.log(arr);
}
```

再来来看一个应用：按字符串的长度来排序字符串数组

```js
var arr = ['adsfdsfsd','fsd','zhiahivjsdkjfgk','sf'];
arr.sort(function (a, b){
    return a.length - b.length;
});
console.log(arr);
```

再来一个：按字符串的字节数来排序

```js
function codeSize (str) {
    var num = str.length;
    for(var i = 0; i < str.length;i++){
        if(str.charCodeAt(i) > 255){
            num ++;
        }
    }
    return num;
}

function codeSort(arr){
    arr.sort(function (a, b){
        return codeSize(a) - codeSize(b);
    })
}
```

- concat ： 不能改变原数组

```js
var arr1 = [1,2,3];
var arr2 = [4,5,6];
var arr3 = arr1.concat(arr2);
console.log(arr1);
console.log(arr2);
console.log(arr3);
/*
[ 1, 2, 3 ]
[ 4, 5, 6 ]
[ 1, 2, 3, 4, 5, 6 ]
*/
```
- toString() : 将数组中的元素和中间的逗号连成字符串

```js
var arr = [1,2,3];
console.log(arr.toString());
//"1,2,3"
```

- slice (与splice相近但是又不同) : 截取数组，但是它不会改变原数组

slice 可以他填入0 1 2个参数;slilce(开始截取元素的索引值(包括他)， 结束截取的索引值(不包括他))

```js
var arr = [1,2,3,4];
var newArr = arr.slice(1,3);
console.log(newArr);
//[2,3]
```

- join("") : 将数组内的每一个元素按照传进的字符串进行连接,他传进的参数是字符串类型的，即使是原始值，也会转换成字符串类型的(也可以传空字符串，但是如果不传参数的时候，他是用逗号链接的)

```js
var arr = [1,2,3,4];
console.log(arr.join("-"));
//1-2-3-4
```

```js
var arr = [1,2,3];
console.log(arr.join(0));
//102030
```

- split() :他是字符串的方法，和join方法是可逆的，split是将字符串按照特定的字符拆分成数组，拆分后的数组的每一位都是字符串类型的

```js
var str = "1-2-3-4";
var arr = str.split("-");
console.log(arr);
//[1,2,3,4]
```


## 类数组

类数组长得像数组，但是它不具有数组的方法(如arguments)

下面的代码就会报错，因为arguments吗，没有push方法

```js
function demo(a,b,c) {
    arguments.push(4);
}
//这样的代码就会报错
```

类数组是对象，符合类数组的要求：
属性要为索引属性，必须有length属性，最好加上push方法。
当对象加上splilce方法以后，他就长得和数组一样了，看起来就不像对象的形式了

```js
var obj = {
    "0" : 'a',
    "1" : 'b',
    "2" : 'c',
    "length" : 3,
    "push" : Array.prototype.push,
    "splice" : Array.prototype.splice,
}
```

类数组的关键点在length上

来一道阿里巴巴出的变态题：

```js
var obj = {
    "2" : 'a',
    "3" : "b",
    length : 2,
    push : Array.prototype.push,
}

obj.push('c');
obj.push("d");

//问最后的obj是长什么样子的
```

首先我们要了解push方法

```js
Array.prototype.mypush = function () {
    for(var i = 0; i < arguments.length; i++) {
        this[this.length] = arguments[i];
    }
    return this.length;
}
```

```text
第一个push的时候 obj[2(这里是length)] = 'c' 然后length自增1,变为3
第二个push的时候 Obj[3] = 'd' , 然后length再自赠1.变成4
```

所以最后的结果是

```js
obj = {
    2 : 'c',
    3 : 'd',
    length : 4,
    push : Array.prototype.push,
}
```

封装type作业

```js
function type(elem) {
    if(elem === null){
        return 'null';
    }else if(typeof elem == 'object'){
        return Object.prototype.toString().call(elem);
    }else{
        return typeof elem;
    }
}
```
数组去重作业

```js
Array.prototype.unique = function () {
    var arr = [];
        len = this.length;
        obj = {};
    for(var i = 0; i < len;i++){
        if(!obj[this[i]]){
            obj[this[i]] = true;
            arr.push(this[i]);
        }
    }
    return arr;
}

var arr = [1,2,23,3,4,4,5,5,5,5,5,5]
console.log(arr.unique());
```

这里开始简单的复习

对象和数组中的元素都可以被delete删除

```js
var obj = {
    name : 'first'
}

delete obj.name;

console.log(obj.name);
//undefined
```

```js
var arr = [1,2,3];
delete arr[1];
console.log(arr);
//[ 1, <1 empty item>, 3 ]
```

但是，在window对象中，一旦进行了var操作，这种属性叫不可配置属性，不可配置属性是delete不掉的

```js
var num = 123;
delete num;
console.log(num);
//123
```

```js
window.num = 123;
delete window.num;
console.log(window.num);
//undefined
```

函数中的this默认的是window

```js
function demo() {
    console.log(this);
    //这里返回的是window对象
}
```

将一个构造函数引入到另一个构造函数中

```js
function Person(name, sex) {
    this.name = 'deng';
    this.sex = 'male';
}

function Student(name, sex, grade) {
    Person.call(this, name, sex);
     this.grade = grade;
}
```

闭包的形成不仅仅是将函数返回

```js
var obj = {};
function a(){
    function b() {}
    obj.fun = b;
}
//这里也形成了闭包(将函数b保存了出去)
```

通过闭包形成私有化变量

```js
function Demo() {
    var money = 100;
    this.name = 'demo';
    this.makeMoney = function () {
        money ++;
        return money;
    };
    this.payment = function () {
        money --;
        return money;
    }
}

var demo = new Demo();
console.log(demo.money);//undefined
console.log(demo.makeMoney());//101
```

继承函数(也是私有化变量的应用)

```js




```

空数组也不等于空数组，因为他们比较的是引用地址，他们的地址肯定不同

再来复习一下预编译

```js
function demo (a) {
    var a = 123;
    function a () {
        console.log('1');
    }
    a();
}
demo(1);
//这里的代码会报错，会报错：a不是函数
```

看一道2017的微店的笔试题

```js
var result = (function (x) {
    delete x;
    return x;
})(1);
console.log(result);
//1
```

因为形参和var x 一样，他们都不能被delete掉

再看一道：

```js
var h = function a() {
    return 23;
}
console.log(a());
//error : a is not defined
```

类指的是构造函数

```js
/**
 * 
 * 字符串去重
 * 
 */

 String.prototype.unique = function () {
     var obj = {};
     var len = this.length;
     var str = "";
     for(var i = 0; i < len; i ++){
        if(!obj[this[i]]){
            obj[this[i]] = true;
            str = str + this[i];
        }
     }
     return str;
 }

 var str = 'aaaaaabbbbb';
 var newStr = str.unique();
 console.log(newStr);
 ```