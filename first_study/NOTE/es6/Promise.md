# promise 

他为了解决异步回调的问题，传统方式用函数回调，和事件驱动

一般和ajax一起用

语法：

```js
let promise = new Promise(function (resolve, reject) {
    //resolve : 问题解决
    //reject : 问题没有解决
})

promise.then(success, fail);
```

```js
let a = 1;
let promise = new Promise((resolve, reject) => {
    if(a === 1){
        resolve('success');
    }else{
        reject('fail');
    }
})
promise.then((res) => {
    console.log(res);
}, err => {
    console.log(err);
})
```

当箭头函数只有一个形参时，不用加小括号

- 当你的箭头函数仅有一个参数的时候，可以省略掉括号。
- 当你的函数仅有一个表达式的时候，可以省略{}和return

```js
let a = 1;
let promise = new Promise((resolve, reject) => {
    if(a === 1){
        resolve(() => {
            console.log(a+1);
        });
    }else{
        reject('fail');
    }
})
promise.then((res) => {
    res();
}, err => {
    console.log(err);
})
```

resolve 括号中的内容传给 res 参数，reject 括号中的内容传递给 err 参数

then 函数返回的还是promise 还可以继续用 . 调用，可以用catch()来捕获错误

```js
//和上面的代码效果相同
promise.then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})
```

在开发中我们经常这样写

```js
new Promise((resolve, reject) => {

})   //这里没有分号
.then(res => {})  //这里也没有分号
.catch(err => {})
```

- Promise.resolve(传递一个参数) : 将参数转成一个promise对象， 并且是处在resolve状态
- Promise.reject(传递一个参数) : 将参数转成一个promise对象， 并且是处在reject状态

```js
let promise = Promise.resolve(() => 'aaa')
.then(res => {
    console.log(res());
})
//aaa
```

- Promise.all([p1,p2 ....]) : 将promise对象打包（注意是以数组的形式传递进方法），打包后，仍然是promise对象，仍可以用then方法，返回的结果也是已数组的形式返回

```js
let promise1 = Promise.resolve('success1');
let promise2 = Promise.resolve('success2');
let promise3 = Promise.resolve('success3');

Promise.all([promise1,promise2,promise3])
.then(res => {
    console.log(res);//[ 'success1', 'success2', 'success3' ]
})
```

```js
let promise1 = Promise.resolve('success1');
let promise2 = Promise.resolve('success2');
let promise3 = Promise.resolve('success3');

Promise.all([promise1,promise2,promise3])
.then(([res1, res2, res3]) => {
    console.log(res1, res2, res3);//success1 success2 success3 success3
})
```

注意： 用 all ， 必须保证所有的 promise 都是resolve状态

下面的代码我也搞不清楚

```js
let promise1 = Promise.reject('fail1');
let promise2 = Promise.reject('fail2');
let promise3 = Promise.reject('fail3');

Promise.all([promise1,promise2,promise3])
.catch(([res1, res2, res3,res4,res5,res6]) => {
    console.log(res1, res2, res3,res4,res5,res6);//f a i l 1 undefined
})
```

- Promise.race() : 和 all 类似， [race只要有一个是 resolve 就行] --> 掐面这个是错的， 不管对错，他就返回第一个值

模拟用户登录，以及获取个人信息

```js
let login = (resolve, reject) => {
    resolve({data:'xxx', message:'登录成功', state : 'xxx',token : 'qqqqq'});
    reject({data:'xxx', message:"登录失败", state:'xxx'});
}

let getInfo = (resolve, reject) => {
    resolve({data:'xxx', message:"获取用户信息成功", state : "xxx"});
    reject({data:'xxx', message:"获取用户信息失败", state : "xxx"})
}

new Promise(login)
.then(res => {
    console.log('登录成功');
    console.log(res);
    return new Promise(getInfo);
})
.then(res => {
    console.log('获取用户信息成功');
    console.log(res);
})
```

- finally() 方法返回一个Promise。在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。这为在Promise是否成功完成后都需要执行的代码提供了一种方式。

这避免了同样的语句需要在then()和catch()中各写一次的情况。