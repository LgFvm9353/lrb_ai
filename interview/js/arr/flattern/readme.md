# 数组上的方法


## 分维度来回答

- 是否修改原数组 非纯函数，有副作用
  push/pop/shift/unshift 栈/队列操作
    shift/unshift 性能差，需要去移动元素
  splice() 删除/添加/替换元素
    splice(start,deleteCount,item1,item2...)
  sort()
  reverse()
  fill()

- 不会修改原数组的方法 ，纯函数
  - forEach 无返回
  - map 返回一个新数组
  - 查找类
    es5  indexOf ,lastIndexOf
    es6  find,findIndex，includes
    最新版本里 findLastIndex
  - 过滤和判定
     filter
     every
     some
     any
  - 拼接/裁剪
    concat()
    slice()
  - 扁平化
    flat()
    flatMap()
  - 转换
    toLocaleString()
    toString()
    valueOf()
  - 迭代器
    keys()
    values()
    entries()
  - 拼接
    join/toString() 
  - 归约 
    reduce 
  - 静态方法
    Array.isArray()
    Array.from()
    Array.of()
