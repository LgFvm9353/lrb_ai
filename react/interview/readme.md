# react 面试基础考点

## key
- JSX map key ? 唯一值
   - todos 响应式状态改变了，界面更新
      - map 新数组，重新渲染
      - 热更新
      - 只有第一个改变了，只热更新第一项？
      - 旧状态（内存）    新状态
      - 两者对比差值  让界面更新
      - 性能
           考虑重排重绘的开销
      - 默认基于索引的比较
      - 为什么不能用index 作为key
         数组item 顺序发生改变的时候，内容会错误更新，触发不必要的DOM操作
         数组的开始插入新元素

## JSX
- 何为JSX
  JS in XML（HTML是XML的一种形式）
  JSX是JS语法的一种扩展，允许编写类似于HTML的代码，然后在编译时将其转换为React.createElement()函数调用。
  为创建组件标签提供了一种更好的方式
  react 推崇的JavaScript 语法扩展，允许再JavaScript
  代码中嵌入HTML结构（function return JSX 组件）
  常用于react组件的定义 使得UI结构更直观易读
  React 的一大优点特性
- JSX 可以被直接运行吗？
   不能，

   class -> className
   for -> htmlFor
- .styl -> stylus 编译 -> .css
<ul> 
   <li ley={todo.id}>{title}</li>
</ul>
- JSX -> React.createElement(tag,props,children)  ->
    document.createElement('ul')
        document.createElement('li')
 