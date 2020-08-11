# 继承模式、命名空间、对象枚举

每个函数都具有原型，不仅仅构造函数

继承发展史：

- 1.传统形式 --> 原型链，继承了过多没用的属性

看代码：

```js
Father.prototype = {name:'Deng'};
function Father() {}
var father = new Father();
Son.prototype = father;
function Son() {}
var son = new Son();
console.log(son.name);
```

- 2.借用构造函数  1)不能继承借用构造函数的原型  2)每次构造函数都要多走一个函数
- 3.共享原型(现在经常用的继承方式)。共有原型就是就是用等号将两个原型连接起来。(多个构造函数公用一个原型)

看代码：

```js
Father.prototype = {name:'Deng'};
function Father() {}

function Son() {}

Son.prototype = Father.prototype;
var son = new Son();
console.log(son.name);
```

写一个继承函数：

```js
Father.prototype = {name:'Deng'};
function Father(){}
function Son(){}
function extend(Targer, Origin){
    Target.prototype = Origin.prototype;
}
extend(Son, Father);
```

一定要先继承再用：看下面的代码

```js
Father.prototype = {name:'Deng'};
function Father(){}
function Son(){}
function extend(Targer, Origin){
    Target.prototype = Origin.prototype;
}
var son = new Son();
extend(Son, Father);
console.log(son.name);
//这输出的就不是deng，因为son指向的还是原来的空间
```

但是如果个给son的prototype添加属性的时候，father的prototype也会跟着变化，因为他们指向的同一地址。

```js
Father.prototype = {name:'Deng'};
function Father(){}
function Son(){}
function extend(Target, Origin){
    Target.prototype = Origin.prototype;
}
extend(Son, Father);
Son.prototype.sex = 'male';
var father = new Father();
var son = new Son();
console.log(father.sex);
console.log(son.sex);
/*
male
male
*
```

- 4.为了解决这个问题就有了一个新的继承的方式，圣杯模式。中间添加一个构造函数作为中间值

```js
Father.prototype = {name : 'deng'};
function Father() {}
function F() {}
function Son() {}
F.prototype = new Father();
Son.prototype.sex = 'male';
var father = new Father();
var son = new Son();
console.log(son.sex);
console.log(father.sex);
console.log(son.constructor)//这里是Father而不是Son(下面有解释)
/*
male
undefined
*/
```

```text
只有原型才有constructor属性，一般的对象是没有的

son.__proto__ --> new F()  [这个new出来的对象是没有constructuor属性的，所以他会继续顺着原型链往上找]
--> Father.prototype.constructor，所以  --skip--
```

下面我们将功能分装，下面是圣杯模式的代码：

```js
Father.prototype = {lastName : 'deng'};
function Father() {}
function Son() {}
function extend(Taget, Origin) {
    function F() {}
    F.prototype = Origin.prototype;
    Taget.prototype = new F();
    Taget.prototype.constructor = Taget;
    Taget.prototype.uber = Origin.prototype;
    //这里是方便找到son真正继承的是谁
}
var father =new  Father();
var son = new Son();
Son.prototype.sex = 'male';
console.log(son.lastName);
console.log(son.sex);
console.log(father.sex);
console.log(son.constructor);
/**
*deng
*male
*undefined
*Son()
*/
```

闭包第三点应用：实现属性私有化：

```js
function Deng(name, wife) {
    var prepareWife = 'xiaozhang';
    this.name = name;
    this.wife = wife;
    this.divorce = function (){
        this.wife = prepareWife;//这里是没有this的
    }
    this.changePrepareWife = function (target){
        prepareWife = target;
    }
    this.sayPrepareWife = function (){
        console.log(prepareWife);
    }
}

var deng = new Deng('deng', 'xiaoliu');
deng.divorce();
console.log(deng.wife);
console.log(deng.prepareWife);
/*
xiaozhang
undefined(这里形成的闭包，prepareWifebewife被保存了出去)，但是又不能通过直接访问属性来访问它
*/
```

下面来看一下雅虎的库

```js
var inherit = (function () {
    function F () {}
    return function (Target, Origin){
        F.prototype = Origin.prototype;
        Target.prototype = F.prototype;
        Target.prototype.constructor = Target;
        Target.prototype.uber = Origin.prototype;
    }
}())
```

## 命名空间

管理变量，防止污染全局，适用于模块开发

不同的人写的js要放到同一个HTML文件中，不同的人如果用到了相同的变量，就产生了覆盖。

十年前解决的这个问题的方法：(org就是命名空间)

```js
var org = {
    department1 : {
        zhaizhichao : {
            ad : 'ex',
            qw : 'ex'
        },
        xuming : {

        }
    },
    department2 : {
        zhangsan:{

        },
        lisi : {

        }
    }
}

var zhaizhicaho = org.department1.zhaizhichao;
console.log(zhaizhicaho.ad);
```

现在通过闭包的方式解决

```javascript
var init = (function (){
    var name = 123;
    function callName(){
        console.log(name);
    }
    return function (){
        callName();
    }
})()

init();
```

下面模仿一下jQuery方法可以连续调用

```js
var deng = {
    smoke : function () {
        console.log('Smoking, too cool!!!');
        return this;
    },
    drink : function () {
        console.log('drinking, ye cool!');
        return this;
    },
    bet : function () {
        console.log('beting,cool');
        return this;
    }
}
deng.smoke().bet().drink();
```

访问属性的两种方法：  ```obj.name``` ```obj['name']```,后面那一种方法必须是字符串放到中括号中，但是当```obj.name```执行的时候，都会隐式的转换成 ```obj['name']```

```js
var deng = {
    wife1 : 'firstWife',
    wife2 : 'secondWife',
    wife3 : 'thirdWife',
    wife4 : 'fourthWife',
    callWife : function (num) {
        console.log(this['wife' + num])
    }
}

deng.callWife(4);
```

## 对象的枚举

用for in来遍历对象，for-in就只有遍历对象一个作用

先来看一个有问题的遍历代码：

```js
var obj = {
    name : 'deng',
    age : 18,
    sex : 'male',
    height : 170,
}

for(var prop in obj){
    console.log(obj.prop);
}
//这里输出四个undefined
```

再来看一个有问题的代码：

```js
var obj = {
    name : 'deng',
    age : 18,
    sex : 'male',
    height : 170,
    prop : 123,
}

for(var prop in obj){
    console.log(obj.prop);
}
//这里输出5个123
```

```text
这里来解释：
在循环中，在每一圈中，对象中的属性都会以字符串的形式传进prop中，即 obj.prop --->  obj['prop'],因为第一个代码中没有prop属性，所以会打印undefined，
正确代码是  console.log(obj[prop])。
```

但是，对于for-in方法，在遍历的时候，原型上的东西也会被拿出来,自己写的prototype会被拿出来，但是系统自带的prototype属性是不会被拿出来打印的

```js
var obj = {
    name : 'deng',
    __proto__ : {
        age : 18,
    },
}

for(var prop in obj){
    console.log(obj[prop]);
}
/*
deng
18
*/
```

用对象的hasOwnProperty(属性名的字符串的形式) ---> 判断是否为对象自己的属性  --> 返回值是Boolean类型的

```js
var obj = {
    name : 'deng',
    __proto__ : {
        age : 18,
    },
}

for(var prop in obj){
    if(obj.hasOwnProperty(prop)){
        console.log(obj[prop]);
    }    
}
/*
deng
*/
```

in操作符  ```  'height'   in  obj``` 判断obj对象是否具有height属性，他也返回Boolean类型

他和hasOWnProperty 的区别： hasOwnProperty只判断是否为它自己的，原型上的元素返回false，但是in 只要原型中有就会返回true

```js
function Demo() {}
var demo = new Demo();
console.log('toString' in demo) 
//true 
```
instanceof  ： ```A instanceof B```   判断A是不是B构造函数构造出来的
看A的原型链上是否有B的原型

看下面的代码

```js
function Person() {}
var person = new Person();
console.log(person instanceof Object);
//这里也输出true
```

用程序判断一个变量是对象还是数组：(有三种方法)

第一种 obj.constructor

第二种

```js
var demo = {};
var temp = (demo instanceof Array);
if(temp){
    console.log('数组');
}else{
    console.log('对象');
}
```

第三种 利用Object的toString方法

```js
var demo = [];
var result = Object.prototype.toString.call(demo);
if(result === '[object Array]'){
    console.log('array');
}else{
    console.log('object');
}
```

建议用toString，因为instanceof和constructor在跨域的时候，应该打印true的时候，有的时候他返回false