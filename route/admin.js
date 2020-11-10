const express = require('express');
// 导入用户集合构造函数
const { User } = require('../model/user')
var md5 = require('blueimp-md5')

// 创建用户信息管理界面路由（调用express下面的router方法）
const admin = express.Router();

// 接下来可以在admin这个路由下面挂载二级路由了
admin.get('/login',(req,res) => {
    // 正常要写绝对路径。太麻烦所以要做两项配置。
    res.render('admin/login');
});
admin.get('/register',(req,res) => {
    // 正常要写绝对路径。太麻烦所以要做两项配置。
    res.render('admin/register');
});

// 实现登录功能
// (异步函数async)


admin.post('/login', function (req,res,next) {
    var body = req.body
    User.findOne({
        telphone: body.telphone
    },function(err,user){
        if (err){
            return next(err)
        }
        if(user){
            if( md5(md5(body.password)) == user.password ){
                req.session.user = user
                res.status(200).json({
                    err_code:0,
                    message:'ok'
                })
            }else{
                res.status(200).json({
                    err_code:2,
                    message:'telphone or password is invalid'
                })
            }
        }else{
            return res.status(200).json({
                err_code:1,
                message:'telphone or password is invalid'
            })
        }
        
    })
})


admin.post('/register', function(req,res,next){
    var body = req.body
    User.findOne({
        $or: [{
            telphone: body.telphone
          },
          {
            nickname: body.nickname
          }
        ]
      }, function (err, user) {
        if (err) {
          // return res.status(500).json({
          //   success: false,
          //   message: '服务端错误'
          // })
          return next(err)
        }
        // console.log(data)
        if (user) {
          //手机号或者昵称已存在
          return res.status(200).json({
            err_code: 1,
            message: 'TEL or nickname aleady exists.'
          })
          return res.send(`手机号或者昵称已存在，请直接登录`)
        }
        // 对密码进行 md5 重复加密
        body.password = md5(md5(body.password))

        new User(body).save(function (err, user) {
          if (err) {
            return next(err)
          }
    
          // 注册成功，使用 Session 记录用户的登陆状态
          req.session.user = user

        // res.redirect('/home');
    
        // Express 提供了一个响应方法：json
        // 该方法接收一个对象作为参数，它会自动帮你把对象转为字符串再发送给浏览器
          res.status(200).json({
            err_code:0,
            message:'ok'
        })
        
          // 服务端重定向只针对同步请求才有效，异步请求无效
          // res.redirect('/')
        })
        
    })
})





// 将路由对象作为模块成员进行导出
module.exports = admin;


