# lessonOne

- 常用的编码字符集：
- gb2312 表示国家标准的第2312条(中国提出，所有的亚裔字符集都包括)(他只能识别简体中文不能识别繁体中文)
- gbk 是gb2312的字符集的加强版，包含繁体中文字符集。
- Unicode 叫万国码，所有国家的语言都能包括
- utf-8 是Unicode的一个升级版(他最通用的万国码)

## 解释 ```<html lang="en">```

他是告诉搜索引擎爬虫网站的内容

英文是en  中文是zh  德语是de 

```废话
百度搜索引擎是竞价排名  

排在首位的是点一次给百度30 - 50 元  范围是1 - 999元

百度还有个IP段锁定，同一ip在一段时间的多次点击都按一次。

百度大脑还会考察你的生物行为，是否是恶意的。如，你点进去没有看立马就关掉是不算的。

SEO:搜索引擎优化技术，写给爬虫看，也容易排在搜索结果的上面
```

下面是写给搜索引擎爬虫的

```html
<meta content="服装" name="keywords">
<meta content="这是一件非常好的服装" name="description">
```

div 和 span 进行分块，他们作为容器，容器还可以对内部的元素进行捆绑操作

下面开始干货：

编辑器中的空格\(回车和空格的效果一样，他也是文字分割符\)叫做文字分割符，如果写一个特别长的单词，浏览器会认为他是一个单词而不会换行，所以需要用空格分开，而中文浏览器可以分出一个个的汉字，所以他不会从侧边溢出

看例子：

```html
<div style="width:100px;height:100px;background-color:red;">dfjksdjfksdljfkldsjfklsdjfkdsjfkdsjfkldsjfksdjfsdkjfksdljfsdkjfksdjfklsdjflksdjflks</div>
```

上面这个例子都会堆在一行，而从侧边溢出，不会换行。

写成这样就可以自动换行：

```html
<div style="width: 100px;height:100px;background-color: #f40;">fjdkl dsjfkldsjfkl edjkfljewkl ejdfklj ejdflkj ejfkl </div>
```

而中文不需要空格就可以自己换行：

```html
<div style="width:100px;height:100px;background-color: #f40;">都费劲好客山东加法荆防颗粒的荆防颗粒时代峻峰克雷登斯荆防颗粒的设计费克鲁赛德积分卡洛斯</div>
```

## HTML编码

由&开头，由;结尾  如 &nbsp;就代表一个空格

将有语法含义的标签当做文本来用：小于符：&lt;(less than 的首字母)  大于符：&gt;(great than 的首字母)

```html
<h1>今天我学习了&lt;div&gt;标签</h1>
```

回车没有HTML编码，而回车可以用<br>表示

单标签：<meta> <br> <hr>  <img>

有序列表<ol type="?" reversed="reversed" start="2">

type中的值可以是1 a A I i

当type中写的是A时，当超过26个li标签时，他会用AA、AB来表示(相当于27进制)

加上reversed="reversed"，前面的数字就会倒着排序

加上start="2"，那么前面的数字就会从2开始排，注意，start后面只能是数字，若要想从c开始则这样写```<ol type="a" start="3"></ol>```

```html
<ol type="1" reversed="reversed" start="2">
    <li>列表内容</li>
</ol>
```

无序列表<ul type="disc>

它只有type这一个属性，disc(discicle 实心圆)(这是他的默认值) square方块  cicle空心圆

图片<img alt="" title="" target="_blank">

超链接：<a href="#demo1">find demo1</a> 还可以作为锚点。回到顶部的功能就是这样实现的

a链接也能用来打电话，发电子邮件

```html
<a href="tel:18631862665">打电话给zzc</a>
<a href="mailto:1929687926@qq.com">给zzc发邮件</a>
```

a协议限定符，写上JavaScript后，当点击时就会强制运行JavaScript代码

 ```html
<a href="javascript:while(true){alert(让你手欠)}">你点我试试呀</a>
```

## 表单

form的属性method(有post和get两个值) action(用来接收数据的文件，如first.php)

\<input\>里有name(输入框要有name才能提交成功) type(他的值有text password submit radio(单选框，同一个单选题要有相同的name) checkbox(复选框)) value属性

要想多个之中选一个，则需要将多个input中设置相同的name值，否则就都可以选上，就成了多选了

要想提交成功，还需要在单选的input中写入value

若想有默认选中来节省用户的操作来提高用户体验，在想要默认选中的input中加上checked="checked"

```html
<form method="get" action="">
    <input type="radio" name="first" value="a" checked="checked">a
    <input type="radio" name="first" value="b">b
</form>
```

```html
        <input type="text" name="username" style="color: #999999" onfocus="this.value='';if(this.value == '请输入用户名'){this.style.color='#424242'}" value="请输入用户名" onblur="if(this.value==''){this.value='请输入用户名'}">

```

下拉菜单select -- option

```html
<select name="LIN">
    <option>love</option>
    <option>is</option>
    <option>nothing</option>
</select>
```