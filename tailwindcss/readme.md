# tailwindcss 原子css
- 非常好用
- 几乎不用写css
- AI 生成代码 css 用的都是tailwindcss 
- 配置流程
  - pnpm i tailwindcss @tailwindcss/vite
- 有各种内置的css 类名，分门别类
  1rem = 4个单位

- 文字的行数限制 
  - webkit-line-clamp: 2;  不能独自生效
  - webkit 浏览器内核  Chrome + safari 
  - mozilla 火狐浏览器的内核代号
  实验阶段的属性 新的
  display: -webkit-box
  -webkit-box-orient: vertical
  overflow: hidden