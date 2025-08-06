# html5 drag_n_drop

- html5
   新的交互相关
- ipad 为何成功?
   用户体验  拖拽体验
   google 拖拽式上传

- 媒体查询
  - PC First 的设计
     Mobile First 移动优先  80%体验
  - 查询相关的媒体（设备） 做适配
     @media (条件 < 600 移动, < 1024, IPAD > 1200, PC, 1600+ 大尺寸 )
  - 多设备适配 移动时代
  
- drag and drop 细节
   - 有些元素有默认的drag 特性
   比如图片就可以拖拽到别的tab显示
   dragStart preventDefault
   - 元素添加draggable=true  html5 中的drag 功能
   - 模拟现实中的用户体验 元素，容器可以drop
   dragEnter preventDefault 一些样式反馈
   dragOver preventDefault
   drop 删除、拖拽上传
   dragLeave