# AI 单词拍照移动应用

- mobile App
- css reset
- 组件划分思维
- 功能逻辑来划分
  - APP 根组件
  - PictureCard 子组件 图片上传
  - 组件通信
    - 父组件负责持有状态
    - 父组件api 请求
    - 子组件负责展示状态  消费数据
    - state（私有数据状态） props（父组件传递的数据状态） 都是数据
    - 子组件如果要修改状态，通过回调函数通知父组件，父组件修改状态
    
- 目录结构
  - src/ 开发目录
  - components/ 组件目录
    - 一个组件就是一个文件夹
      jsx css
  - public/ 静态资源目录
  - libs/ 第三方库（工具包）目录
  - .env.local 本地环境变量
