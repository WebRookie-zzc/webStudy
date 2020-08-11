# css2

## 盒子模型

margin(盒子和外部的距离、外边距) border padding content(width 和 height)

对于margin，浏览器是以左侧和上侧的元素来当做墙

元素垂直水平居中的方法：

```html
<div class="out">
    <div class="in"></div>
</div>
```

```css
.out {
    width: 100px;
    height: 100px;
    padding: 20px;
}
.in{
    width: 100px;
    height: 100px;
}
```

两个盒子嵌套，将两个盒子长高设成相同的，同时给外面的盒子的四个padding设成相同的

(四个方向的都是像下面这样的顺序：例如：padding、border、margin)

- padding后面有四个值的时候，4个值得顺序是上右下左(按照顺时针的顺序)
- padding后面有三个值得时候，3个值分别代表上、左右、下(margin也是一样的)
- padding后面有两个值得时候，2个值代表，上下、左右

## 盒子模型的计算问题(计算盒子大小不看margin)

画远视图：

```html
<div class="wrapper">
    <div class="box">
        <div class="content1">
            <div class="content2">
                <div class="content3">
                    <div class="content4"></div>
                </div>
            </div>
        </div>
    </div>
</div>
```

```css
.content4{
    width: 10px;
    height: 10px;
    background-color: #fff;
}

.content3{
    width: 10px;
    height: 10px;
    background-color: #0f0;
    padding: 10px;
}

.content2{
    width: 30px;
    height: 30px;
    background-color: #fff;
    padding: 10px;
}

.content1{
    width: 50px;
    height: 50px;
    background-color: #0f0;
    padding: 10px;
}


.box{
    width: 70px;
    height: 70px;
    background-color: #fff;
    padding: 10px;
}


.wrapper{
    width: 90px;
    height: 90px;
    padding: 10px;
    background-color: #00ff00;
}
```

再补充个知识点：
body元素天生自带8px的margin(放在网页中没有设置position的元素，与浏览左侧和顶部的距离即使
body的8px的margin)

### 层模型(position)
position和left、right、top、bottom一起用

- absolute：若设置的是```top:100px```那么，是上边框和容器之间的距离是100px，同理，
如果是```right:100px```,是元素右边框和容器右边的距离是100px(定位很少选底，一般都选顶)
注意：absolute定位，会使元素脱离原来的层，跑到上一层去了，后面的元素就占用它的位置了(
absolute都是新的一层)

- relative：保留原来位置进行定位(后面的元素不会去占它定位前的位置)，虽然它也上到另一个层面去飘着
(\xk灵魂出窍)

#### (非常重要，因为以前从来没用到过)absolute是相对于最近的有position定位的父级元素(只要有position就可不管是不是absolute定位)

写个例子吧

他们用相同的HTML代码：

```html
<div class="wrapper">
    <div class="box">
        <div class="content"></div>
    </div>
</div>
```

当css代码为这个时

```css
* {
    padding: 0;
    margin: 0;
}

.content{
    width: 50px;
    height:50px;
    background-color: #ff0000;
    position: absolute;
    right: 50px;
}


.box{
    width: 100px;
    height: 100px;
    background-color: #0f0;
}


.wrapper{
    height: 200px;
    width: 200px;
    background-color: #00f;
}
```

红色的content会跑到两个容器的外面去，他会距离屏幕的右端(body元素)50px

当给.wrampper加上了position，那么最内层的div会跳出他的父级元素，距离他祖父级元素右侧(div.wrapper)50px

- relative相对于自己原来的位置进行定位，不管父级有没有定位

在开发的时候，用relative作为参照物，用absolute进行定位(有了定位才能用absolute)

- fixed定位(固定定位)(广告定位，不管滚动条怎么动，他都不动)

相对于文档居中和相对屏幕居中

对于相同的html

- 相对于文档居中(一开始相对于屏幕水平垂直居中，但它会随着滚动条的移动而移动)

```html
<div></div>
br*1000这里就不写了
```

```css
div{
    width: 100px;
    height: 100px;
    background-color: #f00;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -50px;
    margin-top: -50px;
}
```

- 相对于屏幕居中(视口)(始终相对于屏幕水平垂直居中，他会相对于滚动条的移动而移动)

只要将上面的absolute定位改为fix定位就可

z-index：z轴，0是默认值(注意：他只对position定位的元素有效果)

来个快捷键```div.circle$*5``


两栏布局：

左侧长度自适应(不设宽度)，用margin将右边的区域让出来

```css
* {
    margin: 0;
    padding: 0;
}


.right{
    width: 100px;
    height:100px;
    background-color: #ffcccc;
    position: absolute;
    right: 0;
    opacity: 0.5;
}


.left {
    background-color: #12f;
    margin-right: 100px;
    height: 100px;
}
```

```html
<div class="right"></div>
    <div class="left">fgkdslofgjkrdl;efgjeskldjfsdklfjsdkl</div>
```

文字不会随着margin进入内部被掩盖，注意这里要把right写到前面，如果left写到前面，那么右边的粉红色的区域就会待在第二行，不会到第一行里去