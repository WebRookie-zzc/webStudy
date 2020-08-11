# jQuery的基本使用

## 版本 
- 1.X ： 可以兼容老版本的IE
- 2.X ： 部分IE8一下不能用
- 3.X ： 完全不支持IE8一下的版本

$(selectou).action()

jquery返回的是数组对象

## 基本语法

```js
$(function () {
    $('.btn').on('click', function () {
        console.log('a');
        //选择的是一组，一组都可以添加上事件
    })
    $('.btn')[0].onclick = function () {
        console.log(2);
    }
})
//点击按钮的时候，a和2都会输出
```

hide(持续时间)方法可以让元素慢慢消失

jQuery可以链式调用

```js
$('.btn').on('click', function () {
    $('p').css('color', '#f00').hide(持续时间);
})
```

## jQuery函数调用的四种方式

- 1. css选择器
- 2. 传递一个DOM对象，或者是document对象
- 3. 传递一个html文本，$()会自动创建这个元素
- 4. 传递一个函数给$()

将创建的元素添加到父级的方法 appendTo(父级(‘div’ 也可以像这样的选择器));

```js
$(function () {
   $('<h1>我是前端工程师小川</h1>').appendTo(document.body);
})
```

## 遍历jQuery对象

jQuery对象上的属性：

- length ： 元素的个数
- selector ： 选择符实型
- context ： 上下文属性
- jQuery ： 版本号属性

遍历jQuery方法 each(function (index[这个参数是索引], this[默认的处理的单个dom对象]))

但是在实际开发中each方法用的不多

填入内容用.html("")方法(他就相当于innerHTML)(读写合一，不填参数就是读取里面的内容)

奇数行颜色变成红色，偶数行颜色变成绿色，并替换文字

```html
<button class='btn'>点我试试</button>
    <p>颜色黑色</p>
    <p>颜色黑色</p>
    <p>颜色黑色</p>
    <p>颜色黑色</p>
    <p>颜色黑色</p>
```

```js
$(function () {
   $('.btn').on('click', function () {
       $('p').each(function (index){
            if(!(index % 2)){
                $(this).css('color', '#f00').html('颜色红色');
            }else{
                $(this).css('color', '#0f0').html('颜色绿色');
            }
       })
   })
})
```


```js
$('img').attr('art');
$('img').attr('art', 'art 值');
$('img').removeAttr('art');
```

```js
$('div').css('background-color');
$('div').css('backgroundColor' : '#f40');
$('div').css({
    background-color : '#fff',
    text-align : 'center';
})
$('div').css('font-size', function (index, value) {
    return parseInt(value) * 2 + 'px';//将字号扩大一倍
}
```

```js
    $('div').addClass('block');
    $('div').removeClass('block');
    $('div').hasClass('block');
    $('div').is('block');//和上一行的代码相同
```

```js
//获取第一个div的jQuery对象
$('div:eq(1)');
```

```js
$('div:eq(0)').text('dsfjudksljf');
$('div:eq(0)').html('<div></div>')
//或者
 $('div').eq(0).html('<div></div>')
```

```js
$('li:eq(0)');
$('li:gt(7)');
$('li:lt(2)');
$('li:even');//所有的索引为偶数的li元素
$('li:odd');//所有的索引为偶数的li元素
$('li:nth-child(2n)');//偶数行的li元素(从1开始)
$('li:nth-child(2n+1)');//所有的奇数行(从第一行开始)
$('li:nth-child(3n)');
})
```

```js
    //用slice来选取一组元素
    $('li').slice(1, 3).css({
        backgroundColor : '#f40'
    })
```

```js
    $('li').filter('.block');//和下一行代码相同
    $('li.block');
```

```js
    //获得索引为偶数的li元素
    $('li').filter(function (index) {
        return index % 2 == 0;
    }).css({
        backgroundColor : '#fff'
    })
```

```js
    //与filter相反的功能的是not
    //获取索引为奇数的元素
    $('li').not(function (index) {
        return index % 2 == 0;
    }).css({
        backgroundColor : '#fff';
    }) 
```

```js
    //找到li内部所有的strong元素，包括孙子元素
    $('li').find('strong').css({
        backgroundColor : "#f40",
    })
    //就相当于
    $('li strong');
```

```js
    //获取下一个元素
    $('li').next();
    //获取下面所有的元素
    $('li').nextAll();
```

```js
    //获取前一个元素
    $('li').prev();
    //获取前面所有的元素
    $('li').prevAll();
```

```js
//获取它的父元素 
$('li').parent();
```

```js
   $('img').on('click', function () {
       console.log($(this).attr());
   })
```

```js
//添加到div标签的内部的后面
 $('div').append('我学前端');//也可以是HTML标签
 //添加到div标签的内部的前面
 $('div').prepend('我学前端');//也可以是HTML标签
//添加到div标签后面的外部
 $('div').after('fdjs');//也可以是HTML标签
 //相反的也有before懒得写了
```

```js
//替换元素
$('div').replaceWith('<h1>' + $(this).text() + '</h1>');
```

```js
    //jQuery创建元素方法
    //下面是剪切，不是克隆
    var $div1 = $('<div></div>');
    $div1.appendTo(document.body);
    $('div').eq(0).appendTo($div1);
```

```js
//克隆元素，原来的div元素不会爱消失
var $div1 = $('<div></div>');
$div1.appendTo(document.body);
$('div').eq(0).clone().appendTo($div1);
```

```js
    //包装元素，就是在元素外面再套一层
    $('h3').wrap('<i></i>')//就是<i><h3></h3></i>;
    //包装元素里面的文本
    $('h3').wrapInner('<span style="color : red"></span>');
    //作为一组包装在一起
    $('div').wrapAll('<strong></strong>');
```

```js
    //删除选中的所有元素
    $(document.body).remove();//body标签也被删除了
    //删除body元素里面的所有的p标签
    $(document.body).remove('p');
    //清空body元素的内容，body标签还在
    $(document.body).empty();
```

```js
    $('.btn').on('click', function () {
        alert(1);
        $(this).off('click');
    })
```

```js
$(function () {
    /**
     * 显示与隐藏
     * show([毫秒数],[回调函数(等显示完成后执行的代码)])
     * hide([毫秒数],[回调函数(等隐藏完成后执行的代码)])
     */
    $('button').on('click', function () {
        if($(this).text() === "显示"){
            $('p').show(1000, function () {
                $(this).css({
                    color : '#f40',
                })
                $('button').text('隐藏');
            })
        }else{
            $('p').hide(1000, function () {
                $(this).css({
                    color : '#0f0',
                })
                $('button').text("显示");
            })
        }
    })
})
```

```js
$(function () {
    /**
     * 渐显与渐隐
     * $().fadeIn([毫秒数], [回调函数(当渐显完成后执行)])
     * $().fadeOut([毫秒数], [回调函数(当渐隐完成后执行)])
     * 渐隐渐显自动切换$().fadeToggle([毫秒数], [回调函数(当渐隐完成后执行)])
     * $().fadeTo([速度，毫秒数], [最后退到的透明度(0-1)], 回调函数)
     */
    var key = false;
    $('button').on('click', function () {
        if(!key){
            $('p').fadeIn(5000, function () {
                console.log('渐显完成');
            })
            $(this).text('渐隐');
            key = true;
        }else{
            $('p').fadeOut(5000, function () {
                console.log('渐隐完成');
            })
            $(this).text('渐显');
            key = false;
        }

        $('button').fadeTo(5000, 0.5, function () {
            console.log('按钮褪色完成');
        })
    })
})
```

```js
$(function () {
    /**
     * 滑动展开(前提是这个元素是display:none的才能用slidedown) $().slideDown([speed], [callback]);
     * 滑动收起  $().slideUp
     * 收起展开自动转换  $().slideToggle();
     */
    $('button').on('click', function () {
        $('p').slideDown(5000, function () {
            //回调函数
        })
    });
})
```

```js
$(function () {
    /**
     * 动画
     */
    $('button').on('click', function() {
        $('img').animate({
            width : 270,
            opacity : 1,
        },{
            duration : 2000,
            complete: function () {
                //回调函数
            }
        })
    })
})
```

```js
$(function () {
    function getData() {
        const xhr = new XMLHttpRequest();
        //添加一个随意的字符串，来避免浏览器的缓存问题
        xhr.open("GET", "first.txt" + "?=" + (new Date()), true);
        xhr.send();
        if(xhr.status === 200){
            if(xhr.readyState === 4){
                $('h1').text(xhr.responseText);
            }
        }
    }
    $('button').on('click', getData);
})
```

```js
$(function () {
    function getJSON() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '../ajax_geted_content/ajax2.json?='+ new Date(), true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    const data = JSON.parse(xhr.responseText);
                    console.log(data);
                }
            }
        }
    }
    $('button').on('click', function () {
        getJSON();
    })
})
```

```js
$(function () {
    /**
     * success函数里面，第一个参数是返回的数据，第二个是状态(最后他的值是success)，第三个是操作的xmlhttprequest对象
     */
    $('button').on('click', function () {
        $.ajax({
            type: 'GET',
            url: '../ajax_geted_content/ajax2.json?='+ new Date(),
            data : null,
            dataType: 'json',
            success : function (data, status, xhrObject) {
                $('div').html(data.name);
                console.log(status)
            }
        })
    })
})
```

```js
$(function () {
    /**
     * $(选择器).load(url, [data], function (data) {
     *  回调函数
     * })
     * args是url后面的附加数据,他不用加?=，浏览器自动给添加，如果是多个数据，就用对象的形式传送
     */
    $('div').load('../ajax_geted_content/ajax1.txt?=', 'username=1')
    $('div').load('1.html li:eq(2)');//(html文件后面可以加选择器)
})
```

```js
$(function () {
    $('button').on('click', function () {
        var $div = $('div');
        $div.load('../ajax_geted_content/ajax2.json', function (data) {
            const jsonData = JSON.parse(data);
            console.log(jsonData.name);
        })
    })
})
```