# CSS 模块化
- Button AnotherButton  按钮组件
   自己写的组件
   别人写的组件
   第三方的组件
   可能会有冲突

- 唯一的类名
  取名 
  css 模块化的能力
  不会影响外界，不受外界影响

- style.module.css 模块化
   - react vite
     确保唯一hash 值 加到原类名上
   - vue scoped
   - 可读性受影响不？
      不会
      - 读的是源码 .button
      - 被模块化保护起来了
      - npm run build 

- dev/build/test/product
  开发的时候在dev 代码的可读性
  vite,react .jsx babel preset-react
  style.module.css
  import styles from './style.module.css'
  <div className={styles.button}>
    <span>按钮</span>
  </div>
  styles js 对象 css 的每一个类名都可以面向对象访问绑定

  npm run build 
  npm run test 测试一下
  aliyun nginx 跑起来 dist/
