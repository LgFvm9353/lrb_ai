# hash 冲突怎么解决？

- 强缓存、协商缓存
   Cache-Control: max-age=10
   ETag: 123456

   协商缓存：
   If-None-Match: 123456
   If-Modified-Since: Mon, 23 Aug 2021 12:00:00 GMT
   
- bundle.[hash].js
  静态文件如何更新？
  使用hash 表达不同的版本，强制用户读取新文件
  hash的设置，可以即强缓存又随时更新 

- js css code splite 

- react react-dom react-router 作为libs  单独打包