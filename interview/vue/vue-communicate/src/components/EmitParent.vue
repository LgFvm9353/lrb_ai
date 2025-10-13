<script setup>
import EmitChild from './EmitChild.vue'

import {ref} from 'vue'
const onClickChild = (e) => {
    console.log('点击了子组件', e)
}
</script>


<template>
   <div>
      <h1>EmitParent</h1>
      <!-- @ vue 事件的绑定 
           : 事件参数
      -->
      <EmitChild @myClick="onClickChild" />
   </div>
</template>