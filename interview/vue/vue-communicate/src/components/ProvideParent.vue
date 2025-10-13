<script setup>

import Child from './Child.vue'

import {provide} from 'vue'   //向外提供

provide('name', '父组件')
</script>


<template>
   <div>
     <Child />
   </div>
</template>