- JSX
  - JSX 不能独立运行
  - vite 工程化
     jsx -> React.createElement
  - React 环境中

- babel 
   Make JavaScript Greate again
   大胆使用JS 最新语法
   let -> var
   () => {} -> function(){}

- 编译的流程
   - pnpm i @babel/cli @babel/core -D
      @babel/cli 命令行工具
      @babel/core 核心工程
      babel 负责JS 转码
      -D 开发环境依赖 dev
      -S 生产环境依赖 
  - ./node_modules/.bin/babel 
      转换的规则 
      react -> IOS 代码
      首先理解es6+ -> es5
      

      JSX -> React.createElement() -> 浏览器可以识别的JS
      编译的过程中 会进行语法的校验
      校验的过程中 会使用 @babel/preset-env 预设
      @babel/preset-env 预设 会根据浏览器的版本 来进行语法的转换
      转换的过程中 会使用 @babel/polyfill 来进行语法的填充

  -