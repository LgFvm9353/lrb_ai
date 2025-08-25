# 数据可视化

- echarts（原生 js 和类型声明文件时分开的）
  基于 canvas 实现的图表库，支持折线图、柱状图、散点图、饼图、雷达图等。
- @types/echarts
  echarts 类型定义文件，提供类型检查和智能提示。
  为什么react 不需要单独安装类型声明文件？
  react 是ts写出来的
- highcharts
  基于 svg 实现的图表库，支持折线图、柱状图、散点图、饼图、雷达图等。
- d3.js
  基于 svg 实现的图表库，支持折线图、柱状图、散点图、饼图、雷达图等。

- echarts 流程
  - 安装echarts pnpm i echarts @types/echarts
  - 引入echarts  import * as echarts from 'echarts';
  - 初始化echarts 实例 const myChart = echarts.init(chartRef.current);
     useRef<HTMLDivElement>(null);
     null | HTMLDivElement
     联合类型 useRef 可变对象
  - setOption(option) 配置图表
    - 图表更新
    - 调用 setOption 方法更新图表配置
    - 调用 resize 方法调整图表大小
    - 图表销毁
    - 调用 dispose 方法销毁图表实例
