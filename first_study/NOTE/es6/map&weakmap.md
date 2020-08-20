# map & weakmap

## map 

map 也是一种对象。一般的对象只能用字符串作为键(key)， 但是map也可以用任何类型的值作为键（可以是数组或者是对象）

通过 ```new Map()``` 来定义， 通过set（key， value） 来设置值；通过```map.get(key)``` 来获取值
通过 ```map.delete(key)``` 来删除某一对键值对； 通过 ```map.clear()``` 来清空map；
通过 ```map.has(key)``` 来判断是否有这个键

```js
let map = new Map();
let obj = {
    a : 1,
    b : 2
}
map.set(obj, 'first');
console.log(map);//Map { { a: 1, b: 2 } => 'first' }
console.log(map.get(obj));//first
```

当然，这里我们用的作为键的对象是一个引用值，将一个对象内容相同，但是引用值不同的值穿传递进去，是得不到对应的值得

```js
let map = new Map();
let obj = {
    a : 1,
    b : 2
}
let obj2 = {
    a : 1,
    b : 2
}
map.set(obj, 'first');
console.log(map);//Map { { a: 1, b: 2 } => 'first' }
console.log(map.get(obj2));//undefined
```

循环：

```js

for(let [key, value] of map){} //这一行和下一行是相同的
for(let [key, value] of map.enteies()){};

for(let key of map.keys()){};
for(let key of map.values()){};

map.forEach((value, key) => {//注意，第一个是value 第二个参数才是key
    console.log(value, key);
})
```

## weakmap 

它的key只能是对象（基本类型的也不行）