# async & await  //  set & weakset

我是根据一篇[简书](https://www.jianshu.com/p/4e91c4be2843)的文章学习的

async和await是用来处理异步的。即你需要异步像同步一样执行，需要异步返回结果之后，再往下依据结果继续执行。
async 是“异步”的简写，而 await 可以认为是 async wait 的简写。
async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成。

async 函数会返回一个 Promise 对象。

在最外层不能用 await 获取其返回值的情况下，使用 then() 链来处理这个 Promise 对象。

当 async 函数没有返回值时，返回 Promise.resolve(undefined);

await只能放在async函数内部使用

await 用于一个异步操作之前，表示要“等待”这个异步操作的返回值。
await 也可以用于一个同步的值。

如果它等到的不是一个 Promise 对象，那 await 表达式的运算结果就是它等到的东西。
如果它等到的是一个 Promise 对象，await 就会阻塞后面的代码，等着 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果。

await他只会阻碍函数内部的代码，不会阻碍函数外部的代码

两秒后输出2倍的值：

```js
function getDouble (num) {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(2*num);
        },2000);
    })
}

async function textResult () {
    console.log("内部调用前");
    let result = await getDouble(10);
    console.log(result);
    console.log('内部调用后');
}

console.log("外部调用前");
textResult();
console.log("外部调用后");

// --- 依次输出
// 外部调用前
// 内部调用前
// 外部调用后
// --- 2s 之后输出
// 20
// 内部调用后
```

当我们去掉await后的输出结果是一次性输出的，结果为:

```text
外部调用前
内部调用前
Promise { <pending> }
内部调用后
外部调用后
```

用 async 标识的函数，这个函数不是异步执行的，这个标识说明里面有异步代码

注意 ： 只要await后的promise对象变成了reject状态，那么函数就会中断执行

## set 

ES6 新增了一个数据结构 set  set 和数据差不多， 但是set里面不能有重复相同的数据

语法 ：

```js
let setArr = new Set(['a', 'b', 'c'， 'a']);//通过new 的方式差创建，传递进去一个数组，如果传递进去的数组里面有重复的，他会自动的去重
```

set 里面的一些方法和属性

- set.add() 添加元素
- set.delet() 删除元素
- set.has() 判断是否含有某元素 返回值是布尔值、
- set.clear() 将整个set清空
还有一个属性

- set.size : 他没有length属性， 取而代之的是size 属性， 也是他的长度

不能用new Array(set) 的方式将set转化成array，可以用 Array.from(set)

```js
let set = new Set([1,2,3]);
console.log(set);

let arr = Array.from(set);
console.log(arr);//[1,2,3]
```

我们可以用for of 来遍历set

```js
let arr = [1,2,3,4,5];
let set = new Set(arr);
for(let val of set){
    console.log(val);
}
```

set没有索引之说，不能通过set【i】 来获得他的值

我们也可以用foreach来遍历他

```js
let set = new Set(['a', 'b', 'c', 'd']);
set.forEach((value) => {
    console.log(value);
})
```

也可以用拓展运算符来将set转换成数组

```js
let set = new Set(['a', 'b', 'c', 'd']);
let newArr = [...set];
console.log(newArr);
```



# WeakSet

1. *WeakSet*结构与*Set*类似，也是不重复的值的集合。
2. *WeakSet*与Set有两个区别
  * 首先，*WeakSet*的成员只能是对象，而不能是其他类型的值.
  * 其次，*WeakSet*中的对象都是弱引用，即垃圾回收机制不考虑*WeakSet*对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于*WeakSet*之中。这个特点意味着，无法引用*WeakSet*的成员，因此*WeakSet*是不可遍历的。
3. 作为构造函数，*WeakSet*可以接受一个数组或类似数组的对象作为参数。（实际上，任何具有*iterable*接口的对象，都可以作为*WeakSet*的参数。）该数组的所有成员，都会自动成为*WeakSet*实例对象的成员。

WeakSet没有size属性，没有办法遍历它的成员。WeakSet不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保存成员的存在，很可能刚刚遍历结束，成员就取不到了。WeakSet的一个用处，是储存DOM节点，而不用担心这些节点从文档移除时，会引发内存泄漏。
