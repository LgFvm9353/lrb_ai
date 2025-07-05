# html5 王者对象Blob

- 图片转成base64编码
- atob(base64) 二级制的字符串编码
- for 每一个字符
  charCodeAt() 方法 得到对应的二进制编码 0-255 8位 byte的整数
  Uint8Array()  
- 二进制文件队对象描述 mew Blob([umit8Array],类型)
- 二进制层面上去压缩，切割，修改
浏览器将会为二进制提供一个临时访问的地址
- URL.createObjectURL(blob) 生成一个临时的url地址

