# CSS 第三个

## 两个经典的bug

- margin塌陷问题

父子嵌套的垂直方向的margin，父子元素是结合在一起的，他俩会取其中大的那个值
即子元素设置的margin小于父元素的margin，则子元素设置的这个margin
没有用，当父元素的margin小于子元素时，那么父元素的margin就变成了子元素的margin的大小
(子元素带着他爹跑)，子元素相对于父元素的margin始终是0

- 解决方法：

- 1) 给父元素加个border：1px solid black;(但这种方法不建议用)
- 2) BFC(block format context)(块级格式化上下文)的知识，大后期的知识，很难，这次就简单介绍

设置完BFC以后，能改变一个盒子里的语法规则

如何触发一个盒子的BFC？(改变父级的渲染规则，使其变为BFC)

有下面一个条件就可以触发

- position:absolute
- display: inline-block
- float:left/right
- overflow:hidden(溢出部分隐藏)

- margin合并问题

正常情况下，margin不能共用一块区域，但是当两个同级的兄弟元素上面的设置```margin-bottom```下面设置```margin-top```
时，他们之间上下的间距就是其中大的margin值

解决方法还是BFC，将其中一个或者全部用一个触发BFC的 div装起来

- margin塌陷解决时，将其父级变为BFC，没有添加html
- margin合并解决时，需要添加一层html(不建议这样用)，这个bug解决方法是用数学方法去解决(多写点像素)(开发的时候不解决)

### 浮动模型

- float:left/right(产生的问题很多)

浮动元素产生了浮动流，所有产生浮动流的元素，块级元素看不到他们，产生了BFC的元素和文本类属性(带有display:inline的都是文本类属性、img也能看到它)的元素以及为文本类元素能看到他们。
没有设置bfc的父级可能包不住浮动元素的子级


父级包不住浮动元素的解决办法：

下面是没解决之前的代码：

```html
<div class="wrapper">
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
</div>
```

```css
.box{
    float: left;
    width: 100px;
    height: 100px;
    background-color: #000;
}
```

可以将父级设为BFC

```css
.box{
    width: 100px;
    height: 100px;
    background-color: black;
    float: left;
}

.wrapper{
    border: 3px solid green;
    float: left;
}
```

清除浮动流的方法：往后面加一个(让最有一个逻辑元素清除浮动)```<p></p>``` ```p{clear:both}```
(这个在开发之中不能用，不能随便添加HTML结构)(clear清除浮动的2前提是设置clear的元素必须是块级元素)

```css
.box{
    width: 100px;
    height: 100px;
    background-color: black;
    float: left;
}

.wrapper{
    border: 3px solid green;
}

p{
    clear: both;
}
```

利用伪元素清除浮动

```css
.box{
    width: 100px;
    height: 100px;
    float: left;
    background-color: #990;
    margin-left: 10px;
}

.wrapper::after{
    content: "";
    display: block;
    clear: both;
}

.wrapper{
    border: 1px solid #000;
}
```

两个方法的区别：

第一个边框上下左右都包裹着内容，而第二个仅上下包着元素，这个父级元素独占一行

解释第一个的原因：
当元素设置了```position:absolute```或者```float:left/right```系统会自动将设置他们的元素变为```display:inline-block```


伪元素：

```span::before{content:} span::after{content:'''}```

伪元素天生就存在，我们通过css将其选中,content是必须要写的，即使后面没有内容，
伪元素和正常元素一样，可以设置位置，颜色，也可以改变inline-block

注意：伪元素天生是行级元素

报纸布局：让文字环绕图片 只要将图片设置为float即可

文字溢出处理，溢出用省略号表示(一出打点)

- 单行文本(三件套)

先阻止文字换行```white-space: nowrap;```
溢出部分隐藏```overfloat:hidden;```
溢出部分用小圆点表示```text-overflow:ellipsis```


- 多行文本(在移动端能实现)(比较麻烦，要用到css3)(一般多行的做截断【溢出部分隐藏】)

背景图片的设置：  

- 背景图片的引入： ```background-image:url('');```
- 背景图片大小的设置 ```background-size:200px 200px;``` 前面的是长(左右),后面的是宽
- 设置背景图片是否重复 ```background-repeaat:no-repeat;```
- 设置背景图片的位置 ```background-position:x坐标 y坐标```  (x y 也可以用center left bottom来表示 或者用百分数)
注意： ```background-position:50% 50% ;``` 表示图片水平和垂直都居中

当客户端的网速特别慢的时候，浏览器只加载HTML，不会加载css和js，所以，要想在这种情况下还要具有相应的功能，就不能像下面这样

```html
<div class="wrapper"><a href="#"></a></div>
```

```css
.wrapper{
    width: 140px;
    height: 90px;
    background-image: url("https://img.alicdn.com/tfs/TB1_uT8a5ERMeJjSspiXXbZLFXa-143-59.png");
    background-size: 140px  90px;
}

a{
    display: inline-block;
    height: 100%;
    width: 100%;
}
```

上面这样写代码，当css加载不出来的时候，他就失去了单击跳转的功能，下面这样写代码就可以使功能保留

```html
<div class="wrapper"><a href="#">淘宝首页</a></div>
```

```css
.wrapper{
    width: 140px;
    height: 90px;
    background-image: url("https://img.alicdn.com/tfs/TB1_uT8a5ERMeJjSspiXXbZLFXa-143-59.png");
    background-size: 140px  90px;
}

a{
    text-decoration: none;
    color: #424242;
    display: inline-block;
    height: 100%;
    width: 100%;
    text-indent: 140px;
    overflow: hidden;
    white-space: nowrap;
}
```

在html中写入文字，再给a标签加上三个属性： ```text-indent:容器的宽度(css正常执行的时候将文字供出去); overflow:hidden(让供出去的文字看补不到;white-space:nowrap(s使文字不换行);```

或者用品padding-top将容器撑开:

```html
<div class="wrapper"><a href="#">淘宝首页</a></div>
```

```css
.wrapper{
    width: 140px;
    height: 0;
    padding-top: 90px;
    background-image: url("https://img.alicdn.com/tfs/TB1_uT8a5ERMeJjSspiXXbZLFXa-143-59.png");
    background-size: 140px  90px;
}

a{
    text-decoration: none;
    color: #424242;
    display: inline-block;
    height: 100%;
    width: 100%;
    overflow: hidden;
}
```

关键代码  ```.wrapper{height:0;(将容器的高度设为0)} .wrapper a{overflow:hidden;(将被供出去的文字隐藏)}```

补充一个知识：

 - 行级元素只能套用好行级元素
 - 块级元素能够套用任何元素
 - a标签不能套用a标签 
 
 但是这其中有一个特例：p标签不能套用div标签，因为div会将p标签劈成两半
 
 在编辑器中这样写：
 
 ```html
<p><div></div></p>
```

但是在浏览器中展示的就是

```html
<p></p>
<div></div>
<p></p>
```

再补充一个知识：
拖动来改变两侧空白区域的大小，而中间内容区(内容区是居中的)的大小不变(例如淘宝页面)

```html
<div class="wrapper">
<div class="content"></div>
</div>
```

```css
.wrapper{
    height: 30px;
    background-color: #999999;
}

.wrapper .content{
    height: 30px;
    width: 1200px;
    margin: 0 auto;  /*这里的auto是关键代码*/  
}
```

文本元素总是底部对齐:

但是，设置宽高的(display:inline-block)span外面的元素，就不会和span底部对齐，而是和span元素内部文字的最后一行的文字的底部对齐，若设置了overfloat:hidden;
且溢出了，外部文字的位置在显示出来文本的底部对齐

这里也放代码：

```html
<span class="ib">加法快乐微积分快乐微积分我看了飞机额我看了飞机鄂温克逻辑非我看了飞机二级分开了</span>我草
```

```css
.ib{
    display: inline-block;
    width: 100px;
    height: 100px;
    background-color: #f40;
    overflow: hidden;
}
```

可以用 ```vertical-align``` 来调节文字垂直方向的位置,当它的值是正数的时候，将文字向屏幕的上方移动，但不会超过屏幕的顶端，设置的值是负数的时候，文字就会往下移动一定的像素

再加一个小知识：当写 ```background-image : url()```

图片也是用二进制数组成的，所以，当图片的大小比较小的时候，就可以图片的二进制表示。

三栏布局，中间自适应的代码：

```html
<div class="left"></div>
<div class="right"></div>
<div class="center"></div>
```

```css
.left{
    float: left;
    height: 300px;
    width: 100px;

}

.right{
    float: right;
    height: 300px;
    width: 100px;

}

.center{

    height: 300px;
    background-color: red;
    margin-left: 100px;
    margin-right: 100px;
}
```

一定要先写right，否则right就会被挤到下一行