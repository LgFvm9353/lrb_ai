<script setup>

import {inject} from 'vue'   // 向内注入

const name = inject('name')
</script>


<template>
  <div>
    <h3>子组件</h3>
    <p>父组件提供的name: {{ name }}</p>
  </div>
</template>
