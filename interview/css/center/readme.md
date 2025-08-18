# 居中

- 听清什么居中
  - 水平垂直

- 方法不是关键，区别和优劣
   - 水平居中 text-align: center;
   - 单行文本垂直居中 line-height: 高度;
   - 固定宽高级盒子水平垂直居中
     - 定位 + 负margin  
     - 定位 + margin: auto;
     - 定位 + calc ( 50% - 宽度/2 )   缺点：性能差，能不用尽量不要用
      缺点：需要知道盒子的宽度和高度
   - 不固定宽高块级盒子水平垂直居中
     - 定位 + transform:translate(-50%,-50%)
     - line-height + vertical-align  
        line-height: initial;
        vertical-align: middle;
     - writing-mode
     - table-cell
     - flex
     - grid 
    


