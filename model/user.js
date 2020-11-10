// 创建用户集合
// 引入mongoose第三方模块
const mongoose = require('mongoose');


// 创建用户集合规则，mongoose下面的Schema构造函数，通过创建构造函数实例来创建集合规则
const userSchema = new mongoose.Schema({
    telphone:{
        type:Number,
        unique:true,
        required:true,
    },
    nickname:{
        type:String,
        required:true, //保证一定有字段
    },
    password:{
        type:String,
        required:true
    }
});

// 创建集合
const User = mongoose.model('User',userSchema);

// 测试代码
// User.create({
//     telphone:'12312312345',
//     username:'qianccc',
//     password:'qwer123'
// }).then(() => {
//     console.log('用户创建成功')
// }).catch(() => {
//     console.log('用户创建失败')
// })

// 将用户集合作为模块成员进行导出
module.exports = {
    // User: User 在ES6中对象的键和值一样，就可以省略掉值
    User
}