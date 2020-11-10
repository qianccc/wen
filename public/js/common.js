// {telphone:'10110110101',password:'123456'} 想要的效果
// 事先准备一个空对象，对这个数组进行循环，把name的值作为对象的属性，把value的值作为对象属性的值
function serializeToJson(form){
    var result = {};
    // [{name:'telphone',value:'用户输入的内容'}]
    var f = form.serializeArray();
    f.forEach(function(item){
        // result.email =
        result[item.name] = item.value;  
    })
    return result;
}