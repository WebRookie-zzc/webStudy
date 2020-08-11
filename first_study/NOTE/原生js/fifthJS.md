# 原型 原型链  call/apply

### 原型的定义

原型是function对象的一个属性，它定义了构造函数制造出的对象的公共祖先。
通过该构造函数产生的对象。可以继承该原型的属性和方法。原型也是对象。

```javascript
function Person() {}
Person.prototype.name = 'hello';
Person.prototype.say = function() {
    console.log('hehe');
}
var person1 =new Person();
console.log(person1.name);
person1.say();
var person2 =new Person();
console.log(person2.name);
person2.say();
```

```text
Person.prototype就是函数原型
他也是个对象  Person.prototype = {}  -- > 他就相当与祖先
然后添加上name的属性
在函数原型上添加的属性，根据这个函数创建出来的对象都会有这个属性(都会继承这个属性)
```

当对象的属性和原型的属性相同的时候，用的是对象自己的属性

```javascript

function Person(){
    this.Lastname = 'b';
}

Person.prototype.Lastname = 'a';

var person = new Person();
console.log(person.Lastname);
//输出的值是b而不是a
```

原型的第一个应用可以用来提取共有属性

简化下面的代码：

```javascript

function Car(color, owner) {
                       this.carName = "BMW";
                       this.ownerName = owner;
                       this.height = 1400;
                       this.long = 4900;
                       this.color = color;
}

var car1 = new Car('red', 'laodeng');
```

利用原型继承进行简化,这样就不用每次都去执行给那些公有属性进行赋值了：

```javascript
Car.prototype.carName = "BMW";
Car.prototype.height = 1400;
Car.prototype.long = 4900
function Car(color, owner) {
    this.ownerName = owner;
    this.color = color;
}

var car1 = new Car('red', 'laodeng');
```

要想改变原型中的值，是不能通过new出来的新对象对原型进行修改(产生的子代不能够修改他的祖先)。
要想改，只能通过赋值的方式进行修改  ```Car.prototype.carName= "name";```

看一下下面的代码：

```javascript

function Person(name) {
    this.name = name;
}

Person.prototype.Lastname = 'deng';

var person1 = new Person('none');

person1.Lastname = 'Jame';
//这里是向这个对象中，添加一个属性，没有修改到原型中的内容；
console.log(person1.Lastname);
console.log(Person.prototype.Lastname);
/*
Jame
deng
*/
```

补充一个小知识：

当删除对象中一个不存在的属性时，浏览器不会报错，而是返回true，要想删除原型中的属性，也不能通过由他产生的子代对象删除。

```javascript
delete person.Lastname;
//这样是删不掉原型的
delete Person.prototype.Lastname;
//这样就删掉了
```

下面的代码可以继续简化：

```javascript
Car.prototype.carName = "BMW";
Car.prototype.height = 1400;
Car.prototype.long = 4900
function Car(color, owner) {
    this.ownerName = owner;
    this.color = color;
}

var car1 = new Car('red', 'laodeng');
```

就是将prototype写成对象的形式进行简化：

```javascript
Car.prototype = {
    carName : "BMW",
    long : 4900,
    height : 1300,
}
function Car(color, owner) {
    this.ownerName = owner;
    this.color = color;
}

var car1 = new Car('red', 'laodeng');
```

子代对象可以通过constructor去查看他的构造函数(构造器)(看看是那个函数构造了他)；
constructor 隐式写在原型中的属性

```javascript
function Person() {}

var person1 = new Person();

console.log(person1.constructor);
//输出的就是上面的Person函数
```

我们也可以人为的修改constructor的值，这样就会产生混乱，对象就找不到他的构造函数了；( --- >  看代码)

```javascript
function Person() {}

function Mess (){}

var person1 = new Person();

console.log(person1.constructor);

Person.prototype.constructor = Mess;

console.log(person1.constructor);
//这里返回的就是Mess函数了
```

再来说一个小知识：(命名)

如果不希望同事访问到自己的变量，那么命名的时候就这样命名(_变量名) ```var _abc = 'abc'```

而像这样前后都有两个下划线的属性，是系统写的，不希望我们去更改，但也可以更改。
比如要学习的 ```__proto__```

拿自定义构造函数举例子：

```javascript
function Person() {
// var this = {
//      __proto__ : Person.prototype;
// }
}

Person.prototype = {
    name : "Jame",
}

var obj = {
    name: 'John',
};

var person1 = new Person();
console.log(person1.name);//这里输出的值是Jame

person1.__proto__ = obj;
console.log(person1.name);//这里输出的值是John
```

(任何一个对象都具有prototype属性)\

比较一下下面的代码：

```javascript
Person.prototype.name = 'a';
function Person() {
    //var this = {
    //      __proto__ : Person.prototype,
    //}
}

Person.prototype.name = 'b';
var person1 = new Person();
console.log(person1.name);
//这里输出的是b
```

```javascript

Person.prototype.name = 'a';
function Person() {
    //var this = {
    //      __proto__ : Person.prototype,
    //}
}

var person1 = new Person();

Person.prototype = {
    name : 'b',
}
console.log(person1.name);
//这里输出的值是a
```

```text
解释一下:
这个就是引用值得传递
person1 对象中的proto属性存着原来的Person.prototype的地址
当重写Prototype时，prototype又会指向另一个空间，
但是proto属性中存的还是旧的地址，所以，输出的就是a

用代码表示就是：
Person.prototype = {name : "a"}
__proto__ = Person.prototype;
Person.prototype = {name : "b"}
这个时候__proto__ 中存的还是 {name : "a"}的地址
```

再来看一个代码：

```javascript
Person.prototype.name = 'a';
function Person() {
    //var this = {
    //      __proto__ : Person.prototype,
    //}
}

Person.prototype = {
    name : 'b',
}

var person1 = new Person();

console.log(person1.name);
//这里的输出结果是b
/*
如果先更改prototype，再创建对象，由于原来的prototype没有元素指向它，(原来有新建的对象指向他)，所以带着a的对象就被清理掉了
*/
```

### 原型链

Object.\_\_proto\_\_是所有对象的原型链的末端

就像下面的代码，利用构造函数创建出来的新对象又作为下一个新对象的__proto__,这样在寻找属性的时候就会一层一层的往上找

```javascript
Person.prototype.Lastname = 'Deng';
function Person() {
    this.name  = 'xuMing';
}
var person = new Person();
Father.prototype = person;
function Father() {
    this.hobby = 'smoke';
}
var father = new Father();
Son.prototype = father;
function Son() {
    this.eat = 'apple';
}
var son = new Son();
console.log(son.Lastname);
//这样输出的结果是Deng
```

对于引用值，后代是可以修改父辈的元素的：

```javascript
function Father() {
    this.money = {
        card1 : 'first',
    }
}
var father = new Father();
Son.prototype = father;
function Son() {
}
var son = new Son();
son.money.card2 = "second";
console.log(son);
//这样son中的money中就添加上了card2的属性
```

再来看一下下面的代码：

```js
function Father(){
    this.num = 100;
}
var father = new Father();

function Son(){}

var son = new Son();
son.num ++;
console.log(father.num);
//这里输出100，因为他不能修改父类的原始值
console.log(son.num);
//这里输出101
//这里就相当于给son对象添加了一个num属性

//就相当于这样的代码 ： son.num = father.num + 1;
```

再来看一个好玩的代码：(请问下面的代码输出了什么？？)

```js
Person.prototype = {
    name : 'a',
    sayName : function (){
        console.log(this.name);
    }
}
function Person(){}

var person = new Person();

Son.prototype = person;
function Son() {
    this.name = 'b';
}

var son = new Son();

son.sayName();
//这里输出的是b
```

下面来解释一下：

调用函数的方法时，this的指向：
谁调用这个方法就指向谁。
在上面的代码中，Son调用，所以this指向的是Son而不是输出a

再来看一个一模一样的代码：

```js
Person.prototype = {
    weight : 100,
    eat : function () {
        this.weight ++;
    }
}
function Person(){}

var person = new Person();
person.eat();
console.log(person.weight);//100
console.log(Person.prototype.weight);//101
//这个也是从person对象中新增了一个weight属性
```

接下来我们再重新理解一下对象字面量

```js
var obj1 = {}
var obj2 = new Object();//这两个是完全相同的
//这就相当于他的构造函数是Object
//obj2.__proto__ ----> Object.prototype
```

也可以通过 ```var obj = Object.creat(原型)``` 来创建对象

```js
var obj1 = {};
var obj2 = Object.creat(obj1);
console.log(obj2.prototype);
//这样obj1就是obj2的原型了
```

看一个阿里巴巴考的知识点：

绝大多数对象最终都会继承自 Object.prototype(不是所有的对象都会继承它)；

Object.creat() 方法括号中必须有对象或者是null，当括号中写null的时候，他就不继承Object.prototype了

```js
var obj = Object.create(null);
console.log(obj);
//这里输出的对象中是没有__proto__属性的
obj.__proto__ = {
    name : '123',
}
console.log(obj.name);
//这里输出的值仍然是undefined
```

自己添加的__proto__，系统是不认识的

再补充一点：toString是Object的方法，但是undefined和null他们没有这个方法。
因为undefined不是对象，他也没有包装类。(数字类型创建包装类，他会一层一层访问原型，然后最后访问到终端的toString方法)

注意不能这样写: ```123.toString()``` 因为数学的小数点优先级是最高的，浏览器会将123.识别成浮点型的数字，他不会优先识别为对象调用,最终浏览器会报错。所以这样写 ```var num = 123; num.toString()```

方法属性的重写：

Object/Number/Array/Boolean/String.toString()

Object 和 Number等都有toSting方法，他俩的这个方法不同，也就是说系统将Number中的toString方法重写了

toSting方法就是将他们变成字符串

举个栗子：

```js
var obj = new Object(null);

var obj = {};

obj.toString = function (){
    return 'be replaced'
}

console.log(obj.toString());
//这里输出的是  be replaced
```

document.write()隐式的调用了toString()方法；还是看例子；

```js
var obj1 = {};
var obj2 = Object.create(null);
docuemnt.write(obj1.toString());//这里能正常输出对象
document.write(obj2.toString());//这里报错，因为obj2没有原型，也就没有toString方法
```

```js

var obj = Object.create(null);
obj.toStirng = function (){
    return 'be replaced';
}
document.write(obj.toStirng());
//这样在浏览器中显示的就不是对象了，他显示就是  be replaced
```


```js

var num = 123;

console.log(num.toString());

Number.prototype.toString = function () {
    return 'be replaced';
}

console.log(num.toString());
//这里输出还是123
```

下面来介绍一个js精度不准的且无法解决的bug：

猜一猜  ```console.log(0.14 * 100);```的输出结果。   这里的输出的结果是 14.000000000000002，有一个极小的偏差。

所以js应该避免小数操作。所以，介绍下面两个方法；```Math.ceil()向上取整。 123.0001 -- > 124``` ```Math.floor()向下取整 123.99999 ---> 123```

由上面的知识，我们写一个程序，生成10个 1 - 99 的随机数(Math.random()随机生成 0-1 开区间的数)

所以像下面这样写就是有问题的：

```js
for(var i = 0; i<10; i++){
    var num = Math.random().toFixed(2)*100;
    console.log(num);
}
//有的时候就会输出像28.999999999999996的数
```

更正上面的代码；

```js
for(var i = 0; i<10; i++){
    var num = Math.floor(Math.random().toFixed(2)*100);
    console.log(num);
}
```

js可以计算数字的范围， 小数点前16位，小数点后16位

#### call/apply (小知识点但是笔试和面试必考)

call和apply作用： 改变this的指向(借用别人的函数，实现自己的功能)
不同点：他们传参方式不同，call传递的是一个个的参数，apply传递只能是一个参数列表(arguments)
(五八同城的考试题：call和apply的作用和不同点)

当调用一个函数时，```demo()``` 和  ```demo.call()``` 是相同的

先看例子：

```javascript
function Person(name,age) {
    this.name = name;
    this.age = age;
}
var obj = {};
Person.call(obj, 'deng',100);
console.log(obj);
```

```text
call中的参数，第一个是想让this指向的对象，后面的参数是函数自带的参数
执行函数的时候，就相当于执行下面的代码
obj.name = 'deng';
obj.age = 100;
所以，当代码执行完以后，obj中就多了name和age属性
```

可以在一个构造函数中，去利用其他的构造函数来生成自己的对象

看例子：

```js

function Wheel(wheelSize, style) {
    this.wheelSize = wheelSize;
    this.style = style;
}

function Sit(sitSize, sitColor) {
    this.sitColor = sitColor;
    this.sitSize = sitSize;
}

function Car(wheelSize, style, sitSize, sitColor){
    Wheel.call(this, wheelSize, style);
    Sit.call(this, sitSize, sitColor);
    //这里的this就都是值Car的this
}

var car1 = new Car(1900, '真皮', 4900, 'red');
console.log(car1);
```

再来看看apply

```js
function Person(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
}

function Student(name, age, sex, grade) {
    Person.apply(this, [name,age,sex]);
    this.grade = grade;
}

var student = new Student('deng', 100, 'male', 2020);
console.log(student);
```