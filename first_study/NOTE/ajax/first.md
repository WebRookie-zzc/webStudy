# Aajx

ajax : asynchronous javascript and xml

## AJAX - 创建 XMLHttpRequest 对象

### 创建 XMLHttpRequest 对象

XMLHttpRequest 用于在后台与服务器交换数据。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新

所有现代浏览器（IE7+、Firefox、Chrome、Safari 以及 Opera）均内建 XMLHttpRequest 对象

```js
var xmlhttp = new XMLHttpRequest();
```

老版本的 Internet Explorer （IE5 和 IE6）使用 ActiveX 对象：

```js
var xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
```

我们写个兼容

```js
var xmlhttp  = var xmlhttp = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
```

## AJAX - 向服务器发送请求请求

### 向服务器发送请求

我们使用 XMLHttpRequest 对象的 open() 和 send() 方法

|方法|描述|
|:--:|:--:|
|open(method,url,async)|规定请求的类型、URL 以及是否异步处理请求。method：请求的类型；GET 或 POST ；url：文件在服务器上的位置; async：true（异步）或 false（同步）|
|send(string)|将请求发送到服务器。string：仅用于 POST 请求|

```js
var xmlHttp = new XMLHttpRequest();
xmlHttp.open('GET', '1.txt', true);
xmlHttp.send();
```

### GET 还是 POST？

与 POST 相比，GET 更简单也更快，并且在大部分情况下都能用。

然而，在以下情况中，请使用 POST 请求：

- 无法使用缓存文件（更新服务器上的文件或数据库）
- 向服务器发送大量数据（POST 没有数据量限制）
- 发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠

看一个get的例子：

```js
function loadText() {
    var xmlhttp = new XMLHttpRequest();
    console.log(1);
    xmlhttp.onreadystatechange = function () {
        console.log(2);
        xmlhttp.open('GET', 'url' ,true);
        xmlhttp.send();
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementsByTagName('div')[0].innerHTML = xmlhttp.responseText;
        }
    }
}
```

####   POST 请求

```js
function loadXMLDoc()
{
  var xmlhttp;
  if (window.XMLHttpRequest)
  {
    // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
    xmlhttp=new XMLHttpRequest();
  }
  else
  {
    // IE6, IE5 浏览器执行代码
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    }
  }
  xmlhttp.open("POST","/try/ajax/demo_post2.php",true);
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xmlhttp.send("fname=Henry&lname=Ford");
}
```

open() 方法的 url 参数是服务器上文件的地址：

该文件可以是任何类型的文件，比如 .txt 和 .xml，或者服务器脚本文件，比如 .asp 和 .php （在传回响应之前，能够在服务器上执行任务）。

