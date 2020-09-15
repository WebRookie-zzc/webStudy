# express 框架

express 是一个基与 nodejs 的一个极简的框架，可以实现 web 服务器功能

express 框架的核心特性;

- 可以设置中间件来响应 HTTP 请求
- 定义了路由表，用于执行不同的 HTTP 请求动作
- 内置支持 ejs 模板 ( 默认是 jade 模板 ) 实现模板渲染生成 HTML、

express-generator 生成器

可以快速生成一个基本的 express 框架

1.安装 express-generator， 为了让我们能够使用 express 命令

`npm i -g express-generator`

2.创建项目：

`express -e 项目名称` -e 是使用 ejs 模板，否则是 jade 模板

3.安装依赖

`cnmp i`

4.开启项目 ( 选择下面一种即可 )

`node app` 默认情况我们不能用这种
`npm start` 他监听的是 3000 端口
`node ./bin/www` npm 的本质就是执行这行代码

5.测试项目

## 目录说明

- bin : 可执行文件目录 ( 里面只有 www 文件 ) 、 项目开启目录
- node_modules : 模块依赖
- public ： 静态文件根目录 ( 静态的 HTML css js 图片 视频 )
- roures : 路由模块目录，动态文件的目录

优先找静态文件 ( 就是 public 里的 index.html )， 找不到就去找动态文件，如果还是找不到，就会 404 了

- view : 视图目录，用来存放所有的页面模板 ( 存放 ejs 模板 )

- app.js 项目的主文件，对项目所有的资源进行统筹安排

## 路由

路由是指如何定义应用的端点(urls)，以及如何响应客户端的请求 ( 就是定义一个网址去响应用户的请求 )

express 对象带有一个 Router 类，可以实例出路由对象，可以在该对象上挂载非常多的路由

挂载路由的写法：

```js
routere.请求方法('请求的地址 ( 注意要以 ‘/开头’ ) '， (req, res, next) => {
  send(数据);//send包含了 write 和 end
  //next是伪函数，学习中间件时再解释
})
```

## 路由模块

我们可以自己写一个路由模块来挂载路由，我们将模块放到routes文件夹中

我们在routes中新建一个 ```vip.js``` 的js文件

```js
//vip.js
const express = require('express');
const router = express.Router();

router.get('/list', (req, res, next) => {
  res.send('<h1>会员列表</h1>')
})

router.get('/rights', (req, res, next) => {
  res.send('<h1>会员权限</h1>');
})

module.exports = router;
//别忘了将对象暴露出去
```

还要在主模块中添加上

```js
var vip = require('./routes/vip');
app.use('/vip', vip);
```

路由的区分

- 大路由 ( 总路由 ) ： 指的是  ```app.js``` : 他负责接收所有请求，对请求进行分配
- 小路由 ( 分路由 ) ： 指的是  ```/routes``` 下的路路由模块，只能负责自己目录下的所有请求