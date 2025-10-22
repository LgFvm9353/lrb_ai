# ployfill

 babel 是怎么做polyfill ？ 
  @babel/core @babel/cli @babel/preset-env
  babel 本身只转译语法（箭头函数 -》 普通函数），但不补全API
  @babel/preset-env 配合 useBuiltIns: 'usage' 可以根据代码中使用的API 从core-js按需导入对应的polyfill

  pnpm i @babel/core @babel/cli @babel/preset-env -D
  pnpm u core-js@3 -D