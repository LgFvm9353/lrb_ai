// Object.defineProperty

var obj = {

} // 对象

//es5 提供的api 兼容性更好
// react 和 vue 最新版 对浏览器有要求

// 存取描述符（get/set） 和数据描述符（value/writable）
// 注意：描述符不能同时包含value/writable和get/set
Object.defineProperty(obj,'num',{
    get: function(){
        return this._value || 100; // 默认值100
    },
    set: function(val){
        this._value = val;
    },
    enumerable: true,
    configurable: true
})
obj.num = 2
console.log(obj.num)

Object.getOwnPropertyDescriptor(obj,'num')
Object.getOwnPropertyDescriptors(obj)
// 遍历对象的所有属性
for (const key in obj) {
    console.log(key)
}

