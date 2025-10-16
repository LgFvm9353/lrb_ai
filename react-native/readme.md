# react native 开发 

- npm i -g expo-cli 

## rn
来自 FaceBook 的移动端开发框架
- react SPA 单页应用
- 基于 react 开发移动端应用
- 跨平台开发，支持 ios, android, web 等平台
- IOS/Android  一个应用要搞2波人
  - Java\Kotlin
  - Objective-c\Swift 
  开发成本极高
- rn 跨平台开发，一套代码 可以同时在IOS\Android 运行
  性能很好 
  js bridge  react 写的代码 调用手机上的设备 

- expo 是一个让rn开发更丝滑的工具
  - expo go 扫码安装应用
  - 手机上查看效果，react 开发

## rn UI 组件库
  ### 前端思路，了解不同的生态（Web 生态 | 移动生态）
  - 用熟悉的react 组件写法调用手机原生组件
  - css rn 提供了 StyleSheet 样式表  
  - 不是html5,没有localStorage  只能用 AsyncStorage 存储数据
