# 缓存

## URL 输入到页面显示
- 知识体系
- 多进程多线程架构是前提
- 输入网址并解析
   非结构字符串，搜索关键字
   输入的网址是一个字符串，需要解析成一个 URL 对象
   协议://域名:端口/路径?参数#锚点
   http(s)://www.baidu.com:80/index.html?a=1&b=2#header
   协议：http(s)
   域名：www.baidu.com
   端口：80
   路径：/index.html
   参数：a=1&b=2
   锚点：header

- 浏览器解析协议、主机、端口、路径等，并 构造 一个http请求
  - 发送请求前，根据请求头的 expires 和 cache-control 判断是否命中强缓存策略
  https://www.baidu.com/index.js + 请求头
  缓存文件 + 请求头 在一起（文件的属性一样）
  - 强缓存
    Expires 过期时间 http 1.0 缺点是用户时间不准
    响应头 cache-control + 文件本地缓存，在过期时间范围内，不用请求，直接用本地缓存内容


   - 协商缓存
     强缓存没有命中，这个资源没有服务器端也不一定修改了，怎么样对一下
     协商缓存的策略：
     1. 协商缓存的请求头：If-Modified-Since 或者 If-None-Match
     2. 协商缓存的响应头：Last-Modified 或者 ETag

     
   url 背后的 请求行、请求头、请求体
   同一主机的不同端口 对应的是不同的程序或服务
   dns -> ip 地址 80 -> http 443 https  
   - 补全url 
   比如输入的是baidu.com 
   浏览器会自动补全 http://www.baidu.com  但是这个网站不安全
     307 跳转 307 Temporary Redirect
     与302（很多浏览器在收到 302 后，会将 POST 请求转为 GET）的区别是 不改变请求方法
     再请求一次
     301 Moved Permanently         302 Found Moved Temporary 
     308 Permanent Redirect        307 Temporary Redirect
     301/302 只支持GET,哪怕你的请求不是GET，也会改成GET
     307/308 各种方法 不会改
    
    - 