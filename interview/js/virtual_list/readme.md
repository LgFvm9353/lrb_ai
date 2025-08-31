# 虚拟列表

- 一次性给你10万条数据插入页面，你会怎么做？
  - 时间分片
  - 虚拟滚动（虚拟列表）
    没有必要，只需要加载视图？
    #container 高度 scroll
    offsetTop 偏移量 transform translateY
    index start -> end 20 
    item height 

- eventloop 
  - js 单线程的开销肯定很大  页面的卡顿
  - 页面渲染开销也大
  - 