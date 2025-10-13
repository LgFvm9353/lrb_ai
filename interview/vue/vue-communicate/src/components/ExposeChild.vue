<script setup>
defineExpose({
    childName: '子组件名称',
    someMethod() {
        console.log('子组件方法')
    }
})
</script>


<template>
  <div>
    <h1>ExposeChild</h1>
  </div>
</template>
