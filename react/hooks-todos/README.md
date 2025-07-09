## hooks todos

- 安排个css 亮点
  - stylus 
    css 超集
  - 拥有vite 脚手架
      stylus 预编译 安装stylus vite直接编译
      vite来自vue社区
- react 组件设计
  - 开发任务单元
  - 设计组件
    功能 界面 状态 响应式
    - 新建todos  表单
    - 编辑todos  列表
    - 删除todos  
    - 显示todos
  - 按功能划分 粒度
    - from 
    - list 列表
      - item 组件 便于维护 优化性能
        组件拆分之后，相当一一个大函数被拆分为好几个小函数，这样更新的时候渲染的就只是需要更新的部分，而不是整个组件

- 字体
  - 设置多个，设备是否含有字体，没有则使用默认字体
  - 苹果设备 -apple-system 前端负责用户体验，字体也是美感的一部分

- rem
  - 相对单位
  - 移动端的重要单位，px 尽量不要用 因为是绝对的
      移动端 宽高不定的  rem（html font-size） vw/vh(viewport) em(自身的font-size 等比例) 
      相对单位 可以在所有设备上适配 

- props
  - 传递状态
  - 传递自定义事件
  - 参数不多，直接结构，多就 单独结构
      const{
        todos,
        onAddTodo
      } = props 

- 数据绑定
  - 变量  修改值
  - 数据状态
    - Data binding 数据绑定 jsx就是静态的
    {} 数据绑定
    - 数据和界面状态的统一
       - 界面由数据驱动
       - 数据和界面状态的一致性
    - 响应式的

- vue 和react 区别
  - vue 好入门，api好用
  - react 倾向于原生JS  
    - hooks ？ 
  - vue 
    <input v-model="text">   vue 双向绑定
      <input value={text} onChange={() => setText(text);}>
  - 为什么react 不做双向绑定，为什么双向绑定比单项绑定性能差？
  
