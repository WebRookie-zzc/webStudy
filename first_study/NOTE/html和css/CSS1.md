# CSS1

先介绍一下浏览器：

主流浏览器要占有市场份额，关键是要有自己独立的内核

浏览器分为shell部分(浏览器最导航栏的部分等)和内核部分(识别代码和操作代码运行)

主流浏览器及其内核

|浏览器|内核|
|:---:|:---:|
|IE|trident|
|Firefox|gecko|
|Google Chrome|webkit / blink|
|Safari|webkit|

浏览器在下载执行代码时，他是下载一行执行一行而不是全下载完在执行

当有引入的css代码时，则HTML和css同时下载

计算机中的异步，是两件事同时干，同步是先干一件事，再去干另一件事

id只能是一一对应的关系，而class可以写多个,多个class值用空格隔开，而不是再写一个class

```<div class="one two"```

通配符选择器：选择所有的标签

```css
*{
    background-color: #999999;
}
```

权重：
!important > 行间样式 > id > class > 标签选择器 > 通配符选择器

class选择器和属性选择器是并齐的，谁在后面就显示谁的样式，后面的会覆盖前面的

属性选择器：【属性名=属性值】属性值可以不写

```css
[type = 'password']{
    background-color: #999999;
}
```

!important这样用
```css
#id{
    background-color: green!important;
}
```

## css 权重(非常重要)

|选择器|权重值|
|:---:|:---:|
|!important|Infinity(正无穷)|
|行间样式|1000|
|id|100|
|class/属性选择器/伪类选择器|10|
|标签选择器/伪元素选择器|1|
|通配符选择器|0|

注意:里面的1000、 100等数字，都是256进制的数字


父子选择器/派生选择器(父子选择器不一定都要是标签组成的)

```css
div span{/*div下面的所有span都会遵循下面的样式，不管套了几层*/
    color: #fff;
}
.css span{
    color:#f12;
}
```

直接子元素选择器:他会选择所有儿子辈的标签，而不会去选择孙子辈的(比较下面的代码)

下面两个html用同一个css代码：

```css
div > em{/*这个就是直接子元素选择器*/
    color: #f12;
}
```

```html
<div>
    <em>1111</em>
    <em>2222</em>
<!--1111和2222的颜色都会变成红色-->
</div>
```

```html
<div>
    <em>1111</em>
    <span><em>2222</em></span>
<!--只有1111会变成红色-->
</div>
```

浏览器遍历父子选择器的顺序是从右向左的

并列选择器

```css
div.demo{
    /*并列选择器，多个条件不加空格*/
}
div#demo{color:#000}
div[class="demo"]{}
```

### 权重问题的计算

将写在同一行的选择器的权重，按照上面的表格相加(注意是256进制)，得到的权重值再去比较

看下面的例子：

```html
<div class="classDiv" id="idDiv">
<p class="classP" id="idP">1</p>
</div>
```

```css
#idDiv p{
/*他的权重值为100 + 1 */
    color: red;
}
.classDiv .classP{
/*他的权重值为10 + 10*/
    color: green;
}
/*因为上面的权重大，所以最后字的颜色是红色*/
```

分组选择器(多个不同的标共用一套css代码)

例：

```css
em,
strong,
div.classDiv{
    color: red;
}
```

浏览器默认的字体大小是16px

字体的设置设置的是字体的高度，而不是高度和宽度都设置，有的字体本来就是细长的

font-weight的值：lighter normal bold bolder 100 -- 900的整百数

注意：有的时候加到更粗的代码不好使，他取决于浏览器里的字体包，字体包里没有更粗的样式，他就显示不出来

斜体：```font-style:italic``

开发设置颜色的时候严禁使用red green等颜色的单词

颜色代码的解释  

例 #ff4400  两位两位的看，前两位是红色的饱和程度，中间两位是绿色的饱和程度，最后面两位是蓝色的饱和程度，他们都用两位十六进制的数字来表示

如果代码的每两位都是重复的，就可以写成3位  #fff 就是  #ffffff   #f40就是淘宝红

颜色函数  rab(255,255,255) 括号里放的是十进制数

透明色是transparent

仿写一个微信发消息后的气泡

```html
<div class="long"></div>
<div class="san"></div>
```

```css
div.long{
    width: 200px;
    height: 50px;
    background-color: #00ff00;
    float: left;
}

div.san{
    width: 0;
    height: 0;
    border: 10px solid #00ff00;
    float: left;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-top-color: transparent;
    position: relative;
    top: 10px;
}
```

注意，border相交的地方是平分的，所以，将宽高设为0，一边的边框就是一个三角形

文字对齐方式：```text-align:center left right```

```line-height``` 行高，每一行文本所占的高度，他不影响字体大小，他影响字体间距

单行文字在容器中水平和垂直都居中

```css
p{
    font-size: 12px;
    text-align: center;
    line-height: 12px;
}
```

国际通用的单行文字垂直居中的方法，让文本高度等于字体的字号大小

首行缩进 ```text-indent:2em``` 缩进两个文本的单位

px、em单位讲解：

- px 叫像素，一个像素只能显示一种颜色，屏幕是由一个个非常小的像素格组成的(分辨率是指每英寸所能容纳的垂直像素点数)
px是相对单位，因为一个像素点可以这么大，也可以那么大

- em 也是相对单位 有一个公式```1em = 1 * 该容器的font-size大小```

浏览器的默认字体的长和宽是相同的，所以可以用```font-indent:2em;```来首行缩进两个字
1.2倍行高就可以写成```line-height:1.2em;```

\<del\>标签是禁止使用的，因为css不好他调试，所以HTML不能掺杂css元素

```text-deceration:line-through```还有none(原来有线将其变为没有线的)、underline、overline(上划线)

```cursor:pointer;``` help，有好多，不用记，现用现查  

伪类选择器：

```a:hover{}```

伪类权重是10  :hover的权重是10，前面的标签选择器也是10,因为a：hover的权重比a的权重大，所以鼠标移入的时候会展现hover中的样式

#### 行级元素和块级元素

- 行级(内联)元素：内容决定元素的位置,可以通过css改变大小：span strong em a del 
- 块级元素:div p h1 ul li ol address

设置图片大小时，只设置宽，高就会等比例缩放，只设置高，宽就会等比例缩放

- 行级块元素：内容决定大小，可以通过css改变宽高

他们三种元素完全是由一个css属性控制的

```css
span{display: inline;}
div{display: block;}
image{display: inline-block;}
```

凡是带有inline或者inline-block,将图片堆在一起时，图片之间是有空隙的，所以，只要将img标签之间的回车删掉就好了(代码需要压缩
再传到服务器上，压缩需要用一个字母代替标签，然后就是去空格去回车，所以，不要用margin-left
:0 来解决图片之间间隙的问题)

先写css代码，再写html代码(即，先写功能)

看例子：

```css
.red {
    background-color: red;
}
.green {
    background-color: green;
}
.size1{
    width: 100px;
    height: 100px;
}
.size2{
    width:200px;
    height: 200px;
}
```

```html
<div class="red size1"></div>
<div class="red size2"></div>
```

这样就会有很多种组合(先定义功能，再选配功能)

标签选择器的作用：初始化标签

通配选择器：(初始化所有标签)