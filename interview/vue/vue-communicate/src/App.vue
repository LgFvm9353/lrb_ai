<script setup>
// setup 组合式API
// 最新 vue3 函数式写法
// 函数式组件，使用 setup 语法糖
// import ParentOne from './components/ParentOne.vue'
// import ParentTwo from './components/ParentTwo.vue'

// import EmitParent from './components/EmitParent.vue'

// import ExposeParent from './components/ExposeParent.vue'

// import ProvideParent from './components/ProvideParent.vue'

import EmittA from './components/EmittA.vue'
import EmittB from './components/EmittB.vue'
</script>


<template>
  <div>
   <!-- <ParentOne />
   <ParentTwo /> -->


   <!-- <EmitParent /> -->

   <!-- <ExposeParent /> -->

   <!-- <ProvideParent /> -->

   <EmittA />
   <EmittB />
  </div>
</template>

<style scoped>

</style>
