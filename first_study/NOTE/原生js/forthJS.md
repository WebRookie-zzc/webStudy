# 对象

对象的属性和方法

方法就是写在对象中的函数

还是看例子吧：

```javascript
var mrDeng = {
    name : "mrDeng",
    age : 38,
    sex : 'male',
    heath : 100,
    smoke : function () {
        console.log("i am smoking!!");
        this.heath --;
        return mrDeng.heath;
    },
    drink : function () {
        console.log("i am drinking!");
        this.heath++;
        return mrDeng.heath;
    }
}

var result1 = mrDeng.smoke();
var result2 = mrDeng.drink();

console.log(result1);
console.log(result2)
```

在对象的函数中如果要使用该对象中的属性值，也需要用 ```对象名.属性名``` 的形式来获取,也可以用this.属性名指代这个对象本身

#### 对象属性的增、删、改、查。

注意：当一个变量未声明就去访问，浏览器会报错，一个对象的属性未声明就去访问他会返回undefined,他不会报错

增加属性 ```mrdeng.wife = 'wife1'```
删除属性 ```delete mrdeng.wife```

再来看一个例子：

```javascript
var mrDeng = {
    name : "mrDeng",
    prepareWife : "wife1",
    girlFriend : "wife2",
    wife : "",
    getMarried : function () {
        this.wife = this.prepareWife
        console.log("wife : " + this.wife);
    },
    divorce : function () {
        this.wife = "";
        this.prepareWife = this.girlFriend;
        console.log("wife : " + this.wife);
    },
    changeGirlFriend : function (someone) {
        this.girlFriend = someone;
        console.log("girl friend : " + this.girlFriend);
    }
}

mrDeng.getMarried();
mrDeng.divorce();
mrDeng.changeGirlFriend('wife3');
mrDeng.getMarried();

/*
输出结果：
wife : wife1
wife : 
girl friend : wife3
wife : wife2
*/
```

#### 对象的创建方法

 1. ```var a = {};``` plainObject  对象字面量/对象直接量
 2. 构造函数：
 - 1\)系统自带的构造函数 ```var a = new Object()```  这个和对象字面量没有任何区别
 - 2\)自己自定义的构造函数

为了理解自定义的构造函数，下面展示一个构造车对象的一个构造函数:

```javascript
function MakeCar(color){
    this.name = "宝马";
    this.height = 1400;
    this.long = 1000;
    this.health = 100;
    this.color = color;
    this.run = function () {
        this.health --;
        console.log(this.health);
    }
}

var car1 = new MakeCar('red');
console.log("the color of this car is " + car1.color);
car1.run();
car1.run();
/*
执行结果：
the color of this car is red
99
98
*/
```

构造函数和普通的函数的写法完全一样，为了便于区分，构造函数采用大驼峰命名法(和小驼峰相比就是多了一个首字母大写)，普通函数采用小驼峰命名法。
但是在调用构造函数来生成对象的时候，需要在构造函数前面加上一个new关键字;
多次调用同一构造函数生成的多个对象是独立的。

下面也可以造个人:

```javascript
function MakeStudents(name,age,sex){
     this.name = name;
     this.age = age;
     this.sex = sex;
     this.grade = 2020;
}

var student1 = new MakeStudents("张三",18,"male");
```

构造函数的内部原理：(new 函数的过程)

1.在函数体前面隐式的加上 ```var this = {}```
2.执行 ```this.XXX = xxx```
3.隐式的返回this对象

(把上面的代码copy过来，隐式的我用单行注释表示)

```javascript
function MakeStudents(name, age, sex){
     //var this = {};
     this.name = name;
     this.age = age;
     this.sex = sex;
     this.grade = 2020;
     //return this
}

var student1 = new MakeStudents("张三",18,"male");
```

下面捣个乱，改一下上面的代码，我们使用显式的返回：

```javascript
function MakeStudents(name, age, sex){
     //var this = {};
     this.name = name;
     this.age = age;
     this.sex = sex;
     this.grade = 2020;
     return {};
     //return this
}

var student1 = new MakeStudents("张三",18,"male");
//这里的student1就变成了空对象，因为显式返回的就是空对象
```

但是如果返回的是原始值(number boolean string等类型的值得时候)，那么他返回的还是this对象

```javascript
function MakeStudents(name, age, sex){
     //var this = {};
     this.name = name;
     this.age = age;
     this.sex = sex;
     this.grade = 2020;
     return 123;
     //return this
}

var student1 = new MakeStudents("张三",18,"male");
//这里返回的还是this对象
```

所以捣乱可以,只有显式返回的也是对象类型的元素的时候才产生影响

属性值和方法只有对象才有，原始值是没有属性值和方法的

### 包装类

先拓展个小知识：

数字，字符串，布尔类型，他们都有原始值和对象两种类型(像数字，就有数字类型和数字对象类型)

还是看代码：

```javascript
var num = new Number(123);
console.log(num);//输出对象
console.log(typeof num)//object
var a = num * 2;
console.log(typeof a);//number
```

对于new出来的数字对象，也可以往里面添加属性和方法。若数字对象参与计算，那么得出来的结果是数字类型的。undefined和null就不能有自己属性和方法。

```javascript
var str = new String('abcd');
var bol = new Boolean(true);
```

再来看一眼原始值的字符串(要解决的问题已经写在了代码的注释中)

```javascript
var str = 'abcd';
console.log(str.length);//原始值没有属性，为什么还可以调用length属性？

str.a = '123';//这里为什么不报错？
console.log(str.a);//为什么这里输出undefined？
```

这里就是包装类干的工作了：

带着问题再来看一个新的代码：

```javascript

var num = 4;
num.len = 3;
console.log(num.len);
//这里输出的还是undefined
```

下面通过上面的代码详细解释包装类干的活：

```text
当执行到第二行代码的时候，包装类会自动的创建一个对象 new Number(4) 然后再将len的属性添进去 Number(4).len = 3
当第二行执行结束的时候，这个对象就会被销毁  delete
当执行第三行代码的时候，包装类有又会创建一个新的独立的对象 new Number(4) 然后访问对象中没有声明的属性，返回undefined，执行完第三行代码，
这个新建的对象又会被销毁
```

再来看一道特别经典的题；

数组可以通过下面的代码进行截断;
```javascript

var Arr = [1,2,3,4];

Arr.length = 2;

console.log(Arr)
//输出[1,2]
```

那么，判断下面代码的输出结果

```javascript
var str = 'hello';
str.length = 2;
console.log(str);
console.log(str.length);
/*
hello
5
*/
```

解释：

```text
在执行第二行代码的时候，也会创建一个对象 new String('hello').length = 2; 然后销毁 delete
执行到最以后一行的时候，也会创建一个对象
```

再补充一个知识点：

原本的this都是指向全局的window，除非有new关键字，this才指向一个新建的空对象

包装类和闭包综合的代码;

```javascript
function Person(name, age, sex){
    var a = 0;
    this.name = name;
    this.age = age;
    this.sex = sex;
    function sss(){
        a ++;
        console.log(a);
    }
    this.say = sss;
}

person1 = new Person();
person1.say();
person1.say();
person2 = new Person();
person2.say();
/*
执行结果是
1
2
1
*/
```

来看一个视觉上很迷惑的代码:

```javascript
var x = 1; y = z = 0;
function add(n) {
        return n = n + 1;
}

y = add(x);

function add(n) {
    return n = n + 3;
}

z = add(x);

console.log(x, y, z);
```

```text
return n = n + 1; 是 将n+1的值赋给n  然后再返回n
对于两个同名的函数，在预编译的时候下面的add函数就会覆盖上面的add函数，所以，不管他们的位置，执行的都是下面的函数。
没有对x执行任何操作，所以x的值还是1
所以返回值是1 4 4
```

再来补充一个小知识点：

```parseInt(3,0);```   这一行代码对于不同的浏览器他返回值不同：有的就返回前面的数，有的返回NaN

在来看一年百度的题：

```javascript
function demo(a,b,c){
    arguments[2] = 10;
    console.log(c);
//输出结果是 10
}
demo(1,2,3);
```

```javascript
function demo(a, b, c){
    c = 10;
    console.log(arguments[2]);
//输出的结果是10
}
demo(1,2,3);
```


