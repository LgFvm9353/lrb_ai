<script setup>
const emit = defineEmits(['myClick'])

const handleClick = ()=>{
    emit('myClick', '只是发送给父组件的消息')
}
</script>


<template>
   <div>
      <h1>EmitChild</h1>
      <button @click="handleClick">按钮</button>
      <button @click="emit('my-click','hello')"> 触发事件 </button>
   </div>
</template>
