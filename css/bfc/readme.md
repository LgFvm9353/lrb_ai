# BFC

- 在弹性布局之前，一般用float 做两列式、三列式或多列式布局
  - 业务场景 
  - float 可以让元素向左浮动，向右浮动 两列
  - 都向左浮 多列
  - 浮动元素会离开文档流吗，但和定位离开文档流不一样
    浮动是文字围绕它浮动，实现 文字环绕效果

    外层盒子 overflow: hidden;
    触发生成一个BFC Block Formatting Context
    块级格式化上下文
    .container 原来是一个block 块级盒子
    升级为BFC 盒子
    flex 子元素会在一起
    全新的渲染区域，不受外界影响
- html 是最外层第一个 BFC 的盒子
  - 块级元素是从上到下排列
  - 行内元素是从左到右排列
- BFC 元素可以拿到浮动元素的高度
  计算BFC的高度时，浮动元素也参与计算