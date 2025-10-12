# XSS 跨站脚本攻击

## 定义
XSS 跨站脚本攻击（Cross-Site Scripting）是指攻击者在网页中注入恶意脚本，当用户访问该网页时，恶意脚本会在用户的浏览器中执行，从而达到攻击的目的。
## 分类
### 反射型 XSS
反射型 XSS 是指攻击者将恶意脚本注入到 URL 中，当用户点击包含恶意脚本的链接时，恶意脚本会在用户的浏览器中执行。
### 存储型 XSS
存储型 XSS 是指攻击者将恶意脚本注入到网站的数据库中，当用户访问包含恶意脚本的页面时，恶意脚本会在用户的浏览器中执行。

拿到cookie,发送到攻击者的网站
cookie httpOnly 防止cookie被 js 读取
不能相信用户的输入，所有的用户输入都应该进行验证和过滤（对用户输入进行转译）。
<script>  &lt;script&gt;  html字符的转译   </script>  &lt;/script&gt;
### DOM 型 XSS
DOM 型 XSS 是指攻击者通过修改网页的 DOM 结构，将恶意脚本注入到网页中，当用户访问包含恶意脚本的页面时，恶意脚本会在用户的浏览器中执行。

输入立即执行 
## 防范措施
### 输入验证
对用户输入进行验证和过滤，防止恶意脚本注入。
### 输出编码
对用户输出的内容进行编码，防止恶意脚本执行。



- 解决方案
   用 textContent 代替 innerHTML 进行输入验证
   过滤或限制特殊字符，如 <> 等  在服务器对动态内容进行编码
   encodeURI()/encodeURIComponent() 对 URL 中的特殊字符进行编码 
   decodeURI()/decodeURIComponent() 对 URL 中的特殊字符进行解码
   encodeHTML() 对 HTML 中的特殊字符进行编码

   - vue/react ? 
   - 前端转译DOMPurify 对用户输入进行转译，过滤危险的HTML标签和属性

- Cookie httpOnly 