# 图片懒加载
- <img src="" />
  - 浏览器的下载线程
  - src http 应用层  
  - 将图片地址 转变为 ip 地址
  - 发送 网络宽带有限 公路
    并发 同时下载多个css,img 支持的比较好的
    tcp/ip 
  - 网页（电商）图片太多了 50+
    - 随着滚动页面去加载 不能全部加载，否则页面会直接崩溃

## 懒加载
   - 只加载需要加载的
     - 可视区
     - 滚动区域 scroll 
   - 不加载
   src 不直接给 data-original 
   src? img 功能函数？ 占位图
   - 占位图
     - src 应该设置 但不能请求原来图片地址（并发太多，图片太大）
     - 给个占位的图片  比较小
       缓存 请求一次
   - 等页面渲染完毕后 
     img 太多会严重影响页面打开速度，第一重要的是要让页面打开
     第二重要的是要让页面打开后，图片可以正常加载
     data-original 中
     自定义属性 data-数据属性
     图片的原地址是img 数据

- 性能问题
  - 解决了性能问题，首屏加载速度
  - onScroll 触发太频繁
  - forEach imgs
  - getBoundingClientRect() 触发回流
- 防抖 节流
- InterSectionObserver
  - observer 观察 异步
  - intersection rect 和可视区域交叉
  - 不再需要onscroll 不需要节流