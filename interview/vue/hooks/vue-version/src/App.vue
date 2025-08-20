// 脚本
<script setup>
import { useMouse } from './hooks/useMouse'
// 页面上晃来晃去，显示鼠标的x y 坐标
import {useTodo} from './hooks/useTodo'
const {x,y} = useMouse()
const {
  title,
  todos,
  addTodo,
  clear,
  active,
  all,
  allDone
} = useTodo()
</script>

// 模板
<template>
  <div>
  <div>
    {{x}} {{y}}
  </div>
   <div>
     <!-- v-model 双向绑定指令 -->
     <!-- 事件绑定 @修饰符 enter -->
     <input type='text' v-model='title' @keydown.enter='addTodo' />
     <!-- v-if vue指令 true 显示 -->
     <button v-if='active < all' @click='clear'>清理</button>

     <ul v-if='todos.length'> 
        <li v-for='todo in todos'> 
          <input type='checkbox' v-model='todo.done' />
          <span>{{todo.title}}</span> 
        </li>
     </ul>
     <div v-else>暂无数据</div>

     <div>
      全选
      <input type='checkbox' v-model='allDone'>
      <span>{{active}} / {{all}}</span>
     </div>
   </div>
  </div>
</template>

// 样式
<style scoped>

</style>
