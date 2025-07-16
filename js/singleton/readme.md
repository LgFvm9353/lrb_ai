# 单例模式

## 实现Storage,使得该对象为单例，基于localStorage进行封装。实现方法
setItem(key,value) 和getItem(key)

- 分析题目
实现Storage 类
- 设计模式  design pattern

## 单例
单例是一种设计模式（static getInstance）,高级程序的高级语言
单例模式的定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点。
- static 属性 instance 持有唯一的一次实例
- static genInstance 方法 判断 instance 并返回
  实例的时候一定要这样
- 性能特别好，好管理


- 实现一个登录弹窗
   - 体验
     不用跳转路由，盖在页面上
     z-index display none| block
   - 性能
     90% 用户 不登录
     Model html js css 比较多
     把需要用到的功能推迟到第一次用的时候


