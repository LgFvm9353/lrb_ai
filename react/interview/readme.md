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
 

## 受控组件与非受控组件
- 表单 手机用户数据
   - 受state 控制  
      value={state} onChange={e => setState(e.target.value)}

   - 非受控
     另外一种 收集用户输入的方法
     ref 引用
     ref={inputRef}
  

- 受控组件
   状态由react组件状态（state）自身管理
  
- 非受控组件
   状态由DOM节点自身维护

- 什么时候使用受控组件？  
   需要实时验证、复杂表单交互、表单数据需要实时处理
   但是需要注意性能问题，因为每次状态改变都会触发重新渲染
   可以通过shouldComponentUpdate来优化性能，防抖、节流

- 什么时候使用非受控组件？
   简单表单、表单数据不需要实时处理、表单数据不需要实时验证 等交互性不强
   性能好 