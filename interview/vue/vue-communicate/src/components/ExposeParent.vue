<script setup>
import { ref } from 'vue'
import ExposeChild from './ExposeChild.vue'

const comp = ref(null)   // 可变对象  child

const handleClick = () => {
  console.log(comp.value.childName)
  comp.value.someMethod()  // 子组件提供给父组件调用 
}

</script>


<template>
  <div>
    <ExposeChild ref="comp"/>
    <button @click="handleClick">调用子组件方法</button>
  </div>
</template>