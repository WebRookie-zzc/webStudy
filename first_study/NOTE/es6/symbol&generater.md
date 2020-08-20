# symbol & generater

## symbol

Es6 又新增了一种数据类型  --> Symbol (我们在平时很少用到symbol)

Symbol 是不能new的 （Symbol 不是构造函数）

```js
let syml = Symbol('aaa');
console.log(syml);//Symbol(aaa)
```

- symbol() 返回的是一个唯一值 可以作为一个key或一些唯一或者私有的东西；
- symbol 是一个单独的数据类型， symbol 就是基本类型，不能在拆分；

如果 symbol 作为 key 的时候，for in 循环是循环不出它的， 因为他是私有的

```js
let symbol = Symbol('c');
let json = {
    a : 'a',
    b : 'b',
    [symbol] : 'c'
}

for(let item in json){//item就是指后面的value值
    console.log(item);//a b
}
```

我们来补充一下for in 和 for of 的区别

最直接的区别就是:

for in遍历的是数组的索引（即键名），而for of遍历的是数组元素值。

for in的一些缺陷:

索引是字符串型的数字，因而不能直接进行几何运算
遍历顺序可能不是实际的内部顺序
for in会遍历数组所有的可枚举属性，包括原型。例如的原型方法method和name属性
故而一般用for in遍历对象而不用来遍历数组

 这也就是for of存在的意义了,for of 不遍历method和name,适合用来遍历数组

 那for of有缺点吗? 当然有了:

```for of不支持普通对象```，想遍历对象的属性，可以用for in循环, 或内建的Object.keys()方法：

Object.keys(myObject)获取对象的实例属性组成的数组，不包括原型方法和属性

总结来说:

- for of 遍历数组
- for in 遍历对象

## generator 函数

生成器，解决异步深层嵌套的问题

加一个 * 就变成了generator函数（ *的两边有没有空格都可以）generator 一般都配合着 yield 使用（迭代器）

执行这个函数返回的是一个遍历器对象

每次调用next()方法，内部执行就从函数头部或上一次停下的地方开始执行，直到遇到下一个yield语句为止。

但如果next()方法带有参数，则这个参数会被当做上一条yield语句的返回值。

```js
function * generate () {
    yield 'I';
    yield 'am';
    yield "hot chicken";
}

let g1 = generate();

console.log(g1.next());
console.log(g1.next());
console.log(g1.next());
console.log(g1.next());
/**
 * { value: 'I', done: false }
{ value: 'am', done: false }
{ value: 'hot chicken', done: false }
{ value: undefined, done: true }
 */
```

当中间有 return next 的值就是undefined了

```js
function * generate () {
    yield 'I';
    return 'am';
    yield "hot chicken";
}

let g1 = generate();

console.log(g1.next());
console.log(g1.next());
console.log(g1.next());

/**
 * { value: 'I', done: false }
{ value: 'am', done: true }
{ value: undefined, done: true }
 */
```

上面的是手动调用迭代，我们还可以用for循环进行自动的迭代， 但是return后面的内容不会被迭代

```js
function * generate () {
    yield 'I';
    yield 'am';
    yield 'hot';
    return 'chicken';

}

let g1 = generate();

for (let val of g1) {
    console.log(val);
}

/**
 * I
am
hot
 */
```

还可以用解构对应yield对应的值

```js
function * generate () {
    yield 'I';
    yield 'am';
    yield 'hot';
    return 'chicken';

}

let g1 = generate();

let [a,b,c,d] = g1;
console.log(a,b,c,d);/**I am hot undefined ,*/
```

通过axios获取数据

```js
axios
.get('http://127.0.0.1:5500/ajax_geted_content/ajax1.txt')
.then(res => {
    console.log(res.data);
})
```

上面的就是 用generator 和 axios 的简单例子  --》 获取githug中我的信息

