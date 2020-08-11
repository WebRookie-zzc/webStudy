# JS1

小知识：输入：

```javascript
var a = parseInt(window.prompt("请输入值"));
```

## 类型转换

隐形类型转换和显性类型转换

### 显性类型转换

- Number：转换为数字
- parseInt：转换为整型他后面有两个参数，第二个参数可以省略 ```var a = parseInt("123",16)```,第二个参数表示进制
默认值是10(上面的代码的意思是将16进制的123转换成十进制的数再赋值给a)，后面那个参数的取值范围为2-36 和 0
parseInt()是从数字位开始看，一直看非数字位截止 :比较下面的代码：

```javascript
var a = "123abc";
var b = parseInt(a);
var c = parseInt(a,16);
console.log(b,c);
//这里b的值是123，c的值是1194684(因为后面的abc会被解析成十六进制的数字)
```
- parseFloat()将数字转换成float，也是从数字位开始看，看到除了第一个小数点外的其他非数字位，他只有一个参数
- String():转换成字符串
- Boolean()：除了 "" 、 null、undefined、0、false、NAN转换成false外，其他的全部都转换成true
- toString(): 看下面的例子;但是null和undefined不能用toString方法；toString也可以进行进制转换；下面有例子

```javascript
var demo = 123;
var a = demo.toString();
console.log(a);
```

任何一个数据加上一个空字符串都能转换成字符串类型

```javascript
var demo = 123;
var a = demo.toString(16)//表示转换成十六进制的数
```

利用程序将二进制数(10101010)转换成十六进制的数：
利用parseInt和toString

```javascript
var num = 10101010;
var ten_number = parseInt(num,2);
var six_number = ten_number.toString(16)
console.log(six_number);
```

```javascript
console.log(Number(undefined));
//他的值是NAN
console.log(null);
//他的值是0
```

### 隐形类型转换

隐式类型转化内部调用的也是显式类型转换的方法

- isNAN(a)：返回值是true或者是false
内部过程：先调用Number(a),然后得出的值再和NAN作比较
- ++ -- + - ：当++ 等符号往变量前一放，就会自动调用Number将变量转换成number类型

```js
var a = +'abc';
console.log(a,typeof(a));
//a的值为NaN a的类型为number
```

- \+ 当+两侧有一个为 String类型的时候，就会+两侧就会调用String() ```var a = 1 + 'a';```
- \- * / % 两侧调用Number()类型转换
- && || ! 会调用Boolean()类型转换
- \> \< \>= <= 有数字的就会隐形类型转化成数字 字符串和字符串比的就是ASC码的大小了，字符串和数字相比较就转换成数字，数字优先
数字和不能转换成数字的字符串比较，不管是大于还是小于，返回的都是false
- == !=```1 == true; "1" == 1;的结果都是true```

看一下下面的代码，比较有趣:

```javascript
console.log(1000>100>10);
//返回的结果是false
```

因为1000>100 返回true true 转换成1 再和10比较

下面几行返回值都是false

```javascript
undefined > 0;
undefined < 0;
undefined == 0;
undefined === 0;

null > 0;
null < 0;
null == 0;
null === 0;

NaN == NaN //NaN不等于任何一个值
```

下面的代码的返回值是true：

```javascript
null == undefined;
```

区分一下 == 和 ===：
- == != 进行比较时进行了类型转换 ```1 == "1";返回值是true```
- === !== (绝对等于 绝对不等于) 不进行类型转换，数据类型不同一定返回false

将一个未声明的变量扔到typeof里面，不会报错，他的返回值是undefined

下面的代码有有意思了：

```javascript
typeof(a);//返回值是undefined
typeof(typeof(undefined))//返回值是string
typeof(typeof(a))//返回值是string
```

typeof()返回值得类型都是string

保留几位小数四舍五入：

```javascript
const a = 1.345656;
const b = a.toFixed(3);//保留3位有效数字
```