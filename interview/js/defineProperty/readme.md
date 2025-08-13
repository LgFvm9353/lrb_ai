# 响应式底层原理

- DOM API -> 响应式业务
- Object.defineProperty(obj,'value',{
    get,
    set,
    writable:true,
    enumerable:true,
    configurable:true
})
  对象上某个属性的某些行为（get,set）进行定义，在完成本来的职责的同时，去做dom 更新，这就是响应式
  拦截行为
- 缺点？ 有点麻烦，一个只能定义一个属性
- obj.value

- React,vue 现代前端MVVM 框架，早期的Object.defineproperty 实现响应式， 现在使用Proxy
- es6 Proxy 可以一次代理整个对象，代理的行为更多

