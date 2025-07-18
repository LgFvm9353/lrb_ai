# Array的高级考点
- 怎么认识数组？
   - 可遍历的对象
- new Array(5)
   类似于c++,固定大小的分配 v8 引擎 arr 设计
   - 灵活地扩展，不限类型
   - empty*5 key 没有释放 for key in 不可以迭代
   - new Array().fill()

- [] 数组字面量

- 静态方法
   - Array.of() 数组构造器    // 已经有了数据
   - Array.from() 数组构造器  // 转换 （类数组，填充计算）
   - Array.isArray() 静态方法