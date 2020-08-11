# 正则表达式

![正则作用](../images/sixteenth.png)

![1](../images/seventeenth.png)

正则表达式时一个规则对象

## 创建方式

- 第一种字面量

```js
var reg = /abc/gmi;
var str = "abcd";
console.log(reg.test(reg));
//true
```

- 第二种通过new的方式

```js
var reg = new RegExp("abcd", "igm");
var str = "abcd";
console.log(reg.test(reg));
```

正则表达式也是引用值，在传递的时候传递的是引用值(因为他是对象)

可以用new的方法复制一份完全相同的但又独立的正则表达式对象

```js
var reg1 = /abc/igm;
var reg2 = new RegExp(reg1);
```

```js
var reg = /^a/;//^a表示开头的a
```

但是如果将new去掉，传递的就是引用值了

```js
ar reg1 = /abc/igm;
var reg2 = RegExp(reg1);
```

## 修饰符(就是上面的igm，也就是属性)

- i ： 忽略大小写
- g : 执行全局的匹配(正常情况下，匹配到第一个就返回，并且不再向后匹配，如果加上了这个属性，那么会接着向后匹配，找到所有符合的字符串)

```js
var str = 'abfsoabikfab';
var rep = /ab/g;
console.log(str.match(rep));
//输出的是一个数组
```

- m ： 执行多行匹配

```js
var reg = /^a/g;
var str = 'abcd\nad';
str.match(reg);
//这个只有一个，因为还没有多行匹配的功能
```

```js
var reg = /^a/gm;
var str = 'abcd\nad';
str.match(reg);
//这样就会匹配两个a，因为换行后的a也是开头的了
```

- rep.text(str) : 正则表达式的方法
- str.match(rep) : 字符串的方法

![方括号](../images/eighteenth.png)

一个方括号代表一位，里面填的就是区间\[ abcd \] \[ 1234567890 \]

[ 0-9a-zA-Z ]  == [ 0-9A-z ]

正则表达式的或是 |  而不是 ||

```js
var reg = /(abc) | (bcd)/g;
//这个匹配abc或者是bcd
```

## 元字符

![元字符](../images/nineteenth.png)

- \w === [ 0-9A-z_ ]
- \W === [ ^\w ]
- \s 空白字符 (换行(\n)换页(\f)回车(\r)制表(\t)垂直制表符(\v) 空格)   \s == [ \n\f\r\t\v  ]

注意： 在//之间添加空格，那可真是空格，真能匹配空格

- \b : 单词边界
- \B : 非单词边界

```js
var rep = /\babc\b/;
var str = 'abc cde jkl';
rep.text(str);//true
```

```js
var rep = /\babc\B/;
var str = 'abccde jkl';
rep.text(str);//true
```

- \t : 他匹配的是\t 不是按一下tab键产生的4个空格

```js
var reg = /\t/g;
var str1 = 'abcd    abcd';
var str2 = 'abcd\tabcd';
reg.text(str1);//fasle
reg.text(str2);//true
```

- . === [ ^\r\n ]

## 量词

![量词](../images/twentieth.png)

```js
var rep = /\w*/g;
var str = 'abc';
console.log(str.match(rep));
//['abc',""];
```

上面的代码为什么会多出来一个空串呢？
因为当匹配完abc后，又匹配了一个0个字符的字符串

再来个例子来理解

```js
var rep = /\d*/g;
var str = 'abcd';
console.log(str.match(rep));
//输出的结果是四个空串["", "", "", "", ""]
```

正则表达式有一个规则，叫贪婪匹配原则

(网上找的，下面两行不是js语言)

String str="abcaxc";

Patter p="ab*c";

贪婪匹配：正则表达式一般趋向于最大长度匹配，也就是所谓的贪婪匹配。如上面使用模式p匹配字符串str，结果就是匹配到：abcaxc(ab*c)。

下面的js代码也能体现贪婪匹配原则(能5个就不3个)

```js
var rep = /a{3,5}/g;
var str = 'aaaaaaaaaaaaa'(13个a);
console.log(str.match(rep));
//['aaaaa','aaaaa','aaa'];
```

- ^a  以a开头
- b$ yib结尾

一个开头和一个结尾符，能够限制一个字符串

看一道阿里巴巴的题：

写一个正则表达式，检测字符串的首尾是否含有数字(首有，或者尾有就行)

```js
var rep = /^\d|\d$/;
```

首尾都含有数字

```js
var rep = /^\d[\s\S]\d$/;
```

## RegExp 的方法和属性

![正则的方法和属性](../images/twenty-first.png)

加上了括号就是子表达式，子表达式可以存储第一个匹配的字符，我们用\1提取里面的字符(反向引用)

所以，我们匹配四个相同的字符(AAAA式的字符串)

```js
var rep = /(\w)\1\1\1/g;
```

匹配AABB式的字符串

```js
var rep = /(\w)\1(\w)\2/g;
```

![str方法](../images/twenty-second.png)

将AABB式的字符串替换成BBAA式

```js
var rep = /(\w)\1(\w)\2/g;
var str = 'aabb';
console.log(str.replace(rep, '$2$2$1$1'));
```

$1表示前面rep中的第一个子表达式匹配的值

replace的第二个也可以填函数，函数有参数：第一个是全局，后面的是子表达式的值

上面的代码也可以写成

```js
var rep = /(\w)\1(\w)\2/g;
var str = 'aabb';
console.log(str.replace(rep, function (a, $1, $2) {
    return $2 + $2 + $1 + $1;
  }));
```

我们看一个应用：将‘the-first-name’换成小驼峰式

```js
var rep = /-(\w)/g;
var str = 'the-first-name';
console.log(str.replace(rep, function (a, $1) {
    return $1.toUpperCase();
}))
```

正向预查(正向断言)

```js
var str = 'abaaafg';
var reg = /a(?=b)/g;
```

(?=b) 表示，选择a后面是b的字符串，但是b不会被选出来，b只参与限定
(?!b) 后面不是b

注意，在量词的后面加上一个'？'，就会变成非贪婪匹配了

```js
var rep = /a+?/g;
```

连成一片的字符串去重

```js
var str = 'aaaaabbbbccc';
var rep = /(\w)*/g;
console.log(str.replace(rep, '$1'))
```

将100000000变成 10,000,000,000(极难)

```js
var str = '100000000000';
var rep = /(?=(\B)(\d{3})+$)/g;
console.log(str.replace(rep, ','));
```