// 引用express方法
const express = require('express');
// 处理路径
const path = require('path');
// 引入body-parser模块，用来处理post请求参数
const bodyParser = require('body-parser');
// 导入express-session模块
const session = require('express-session');
// 创建网站服务器（调用express方法）
const app = express();

// 数据库连接
require('./model/connect');

// 处理post请求参数 官方推荐extended的值为false，使用系统模块去处理参数格式
app.use(bodyParser.urlencoded({extended:false}));
// 配置session
app.use(session({secret:'secret key'}));

// 测试代码 require('./model/user');

// 告诉express框架模板所在位置
// 第一个参数是views是固定的，框架内部规定好的
app.set('views',path.join(__dirname,'views'));
// 告诉express框架模板的默认后缀是什么
app.set('view engine','art');
// 当渲染后缀为art的模板时，所使用的模板引擎是什么
app.engine('art',require('express-art-template'));

// __dirname指的是当前文件所在的绝对目录（WEN）
// path.join(__dirname,'public')

// 开放静态资源文件
// static方法接受一个目录（静态资源的存放目录）绝对路径 要用系统模块path来拼接目录
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'node_modules')));


// 配置解析表单 POST 请求体插件（注意：一定要在 app.use(router) 之前 ）
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(session({
    // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
    // 目的是为了增加安全性，防止客户端恶意伪造
    secret: 'itcast',
    resave: false,
    saveUninitialized: false // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
}))

// 引入路由模块
const admin = require('./route/admin');
const home = require('./route/home');

// // 为路由匹配请求路径
app.use('/admin',admin);
app.use('/home',home);


  
// 配置一个全局错误处理中间件
app.use(function (err, req, res, next) {
    res.status(500).json({
      err_code: 500,
      message: err.message
    })
})

//监听端口
app.listen(8800);
console.log('网站服务器启动成功，请访问');