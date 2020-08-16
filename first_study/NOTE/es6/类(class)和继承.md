# class和继承

以前我们通过构造函数来构造对象

```js
function Person (name, age) {
    this.name = name;
    this.age = age;
    this.showName = function () {
        console.log(this.name);
    } 
}

new Person('Keegan', 18).showName();
```

es中类的语法:

```js
class Person{
    constructor(参数1,参数2, 参数3,......) {//constructor就是构造函数，在new的时候调用
        this.参数1 = 参数1;
        //......
        //ToDo
    }
}

var person = new Person(参数1,参数2, 参数3,......);
```

看例子： 

```js
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    showName() {
        console.log(this.name);
    }
    showAge() {
        console.log(this,age);
    }
}

new Person('Will', 18).showName();
```

class出来的Person也是个函数 ```console.log(typeof(Person)) --> function```

类种不加逗号

下面的代码让我更深层的理解  obj\[ prop \]

```js
let a = 'showName';
let b = "sex";
let c = 'showSex';
class Person {
    constructor(name, age, male) {
        this.name = name;
        this.age = age;
        this[b] = male;
    }
    [a] () {
        console.log(this.name);
    }
    [c] () {
        console.log(this.sex);
    } 
}

let person = new Person('Doug', 18, 'male');
person.showName();
person.showSex();
/**
 * Doug
    male
 */
/*
    访问的时候，我们通过person.a/b/c 是访问不到的，因为没有，要用person.sex/showSex
*/
```

注意： 类(class)没有预编译，必须先定义再使用

为什么下面的this不指向window（这个我是真的不知道了）

```js
class Person {
    constructor() {
        this.age = 18;
    }
    showAge () {
        console.log(this);
    }
}

let {showAge} = new Person();
showAge();//undefined
```

> 存取器属性定义为一个或两个与属性同名的函数，这个函数定义没有使用function关键字，而是使用get或set，也没有使用冒号将属性名和函数体分开，但函数体的结束和下一个方法之间有逗号隔开。

语法 ：

```js
get propertyName(){} //用来得到当前属性值得回调函数
set propertyName(){} //用来监视当前属性值变化的回调函数
```

> JavaScript调用setter方法，将赋值表达式右侧的值当作参数传入setter。从某种意义上来说，这个方法负责设置属性值，可以忽略该方法的返回值

看一个例子，get和set一般是用不到的

```js
class Demo {
    constructor(n) {
        this._num = n;
    }
    get num() {
        return this._num;
    }
    set num(n) {
        this._num = n;
    }
}

console.log(new Demo(1).num);
```

- 类身上的方法也叫静态方法，类来调用

```js
class Person {
    constructor() {}
    static demo () {
        console.log("This is the Static method of the class.");
    }
}

Person.demo();
//他创建出来的对象是没有demo方法的
```

Es6之前的继承

```js
function Person (name) {
    this.name = name;
}
Person.prototype.showName = function () {
    console.log(`名字为${this.name}`);
}

function Student(name, skill){
    Person.call(this, name);//继承属性
    this.skill = skill;
}
Student.prototype = new Person();//继承方法
```


Es6的继承

我们用extend来继承父类，子类的构造函数中必须是有 super() \[ 否则会报错 \] super 就是父类  super( ) 是父类的构造函数执行

```js
class Person{
    constructor(name) {
        this.name = name;
    }
}

class Student extends Person{
    constructor(name, skill){
        super (name);
        this.skill = skill;
    }
}

console.log(new Student('Emmett', 'study').skill);
```

当父类的子类的方法的名字相同的时候，子类的方法会覆盖父类的方法，为了使父类的方法不被覆盖，我们用super();将两个方法一起执行

```js
class Person{
    constructor(name) {
        this.name = name;
    }
    showName(){
        console.log("the class of parents");
    }
}

class Student extends Person{
    constructor(name, skill){
        super();
        this.skill = skill;
    }
    showName() {
        super.showName();//执行父元素里面的showName方法
        console.log("the class of son");
    }
}
new Student().showName();
```