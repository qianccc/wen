const express = require('express');
// 创建用户信息管理界面路由（调用express下面的router方法）
const home = express.Router();

// 接下来可以在admin这个路由下面挂载二级路由了
home.get('/',(req,res) => {
    // 正常要写绝对路径。太麻烦所以要做两项配置。
    res.render('home/index');
});
home.get('/u',(req,res) => {
    // 正常要写绝对路径。太麻烦所以要做两项配置。
    // res.render('home/userindex');
    res.render('home/userindex', {
        user: req.session.user
      });
});
home.get('/com',(req,res) => {
    // 正常要写绝对路径。太麻烦所以要做两项配置。
    res.render('home/com');
});

// 将路由对象作为模块成员进行导出
module.exports = home;