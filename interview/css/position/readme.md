# position

- 5种属性  准确，简洁
  - static     默认值，不定位，回到文档流
      让之前定位的元素，回到文档流，取消定位
  - relative   相对定位，相对于自己原来的位置定位，不脱离文档流
  - absolute   绝对定位，相对于最近的定位（非static）祖先元素定位，如果没有，那么相对body定位
  - fixed      固定定位，相对于浏览器窗口定位
  - sticky     粘性定位，粘性定位元素会根据用户滚动而定位，直到到达某个阀值位置，才会固定在顶部（让元素在滚顶到特定阀值表现得像相对定位，到达阀值后固定在视口中，实现类似吸顶或吸附的效果） 

- 业务场景
  - 结合 relative + absolute 实现消息提醒，在右上角
  - absolute + transform 水平垂直居中 模态框
  - fixed 回到顶部
  - sticky 粘连导航（不管页面多长，导航在超出阀值后，一直都在） 
     table 表头粘连，距离最近的具有滚动机制的祖先容器的
     和IntersectionObserver 实现有点像

- 底层 
  - 定位参照系
  absolute 最近 position !== static的祖先 || body
  fixed 视窗 ？ bug
  sticky 最近的具有滚动机制的祖先容器的
  - 独立图层渲染
  absolute ? + ? 

  - 适当使用 transform:translate3d(0,0,0)
     GPU硬件加速，有利于css 页面性能优化
     但也不能乱用，过多的图层会增加内存和管理开销
     比如，登录弹窗，transform/opacity动画

     will-change：可以触发独立图层渲染

  - position: fixed 如果在 transform: translateZ(0) 下面，会失效
    transform会又一个新的包含快 fixed不再相对于视口定位，而是相对于这个transform容器

## position 回答技巧
先干净利落回答5中特性，再举出应用场景，提底层原理，图层和fixed 失效 亮点。

- 页面的渲染过程
- IntersectionObserver
- 重绘重排


