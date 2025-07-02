# 回流重绘
- 布局难点 列式布局和理解BFC/FFC
  - html 根元素 最外层的第一个BFC 元素
    Block Formatting Context 块级格式化上下文   块级从上到下，行内从左到右，BFC 有了文档流
    块级格式化上下文是Web页面的可视化CSS渲染的一部分，是块级盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。BFC是一个独立的渲染区域，里面的元素布局与外面的元素互不影响
  - float overflow: hidden flex  
  - 有没有什么标签 可以做列式布局？ table(不推荐)
    tr td 
  - 为什么不用table? 
    触发太多回流和重绘
    语义不和，table是数据表
    不够灵活

## 回流和重绘
- 回流(Reflow) ：
- 当DOM元素的几何属性(如宽度、高度、位置)发生变化时触发
- 会导致浏览器重新计算元素的几何属性，重新构建渲染树
- 常见触发场景：
  - 修改元素尺寸(width/height)
  - 改变元素位置(top/left)
  - 添加/删除DOM节点
  - 浏览器窗口大小改变

- 重绘(Repaint) ：
- 当元素的外观样式改变但不影响布局时触发
- 只重新绘制受影响的部分，不重新计算布局
- 常见触发场景：
  - 修改颜色(color/background-color)
  - 修改边框样式(border-style)
  - 修改透明度(opacity)
  - 修改阴影(box-shadow)

- 回流（reflow）重排：
  当RenderTree（由DOM树和CSSOM树组合，包含所有的DOM节点及计算样式） 中部分或全部元素的尺寸、结构、或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程称为回流。
  table 不适合，table中局部的改变，会触发整个table的回流
  display: none 从文档流移除元素，不参与回流重绘，性能优化的一种方案
  - 触发回流的方式
  1. 页面首次渲染（严格意义上不是 0-》1） 最耗时的
  2. 浏览器窗口大小改变
  3. 元素尺寸或位置改变 (transition transform/opacity 新图层除外)
  4. 元素内容的变化
     appendChild()  removeChild()  insertBefore()  replaceChild()
  5. display:none block
  6. 字体大小的变化
  7. 激活css伪类 hover active focus
     color: ? 浏览器需要重新计算元素的样式和布局 
  8. 查询某些属性或调用某些方法 
     getBoundingClientRect()  触发回流
  9. 修改元素的布局属性(margin/padding/border)

- 重绘 (repaint)：
  当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility等），浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘。
  - 修改非布局样式：如 color（文字颜色）、background-color（背景色）、border-color（边框色）、box-shadow（阴影）、opacity（透明度，非 0 到 1 的极端情况）等。
  - visibility 属性变化：visibility: hidden 会隐藏元素但保留占位，仅触发重绘；而 display: none 会移除元素，触发回流。
  - 背景图变动：更换 background-image 或调整背景图位置（不影响元素尺寸时）。
  - 文本样式调整：如 font-weight、text-decoration 等仅改变文字外观，不影响元素布局的属性。
## 页面是怎么渲染的？
  - 输入url
  - 下载html 
    - 下载字节 
    - html 字符 utf-8 解码
    - 解析html 开关标签 属性...  
    - 形成节点对象
    - 构建DOM树
  - link 下载css  
    - 下载字节码  Content-Type text/html text/css
    - 解码 utf-8 得到css文本
    - token 词法分析 
    - css rule 节点
    - 构建CSSOM树
  - 构建RenderTree
    - 合并DOM树和CSSOM树
    - 计算样式
    - 布局
  - Layout树
    布局，盒模型 大小 确定元素在文档流中的位置和大小
  - 图层
    - z-index 
    - position: fixed  固定弹窗
    - transition + transform / opacity   animation
    - translate(50%,50%,50%)   Z  GPU加速
    1个图层 主要文档流图层 = DOM树 + CSSOM树 -> RenderTree <-> Layout
  - 图层的合并 
  - 浏览器的渲染引擎 绘制平面 像素点绘制 


