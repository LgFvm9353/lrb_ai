<script setup>
import {emitter} from '../utils/eventBus.js'
function handleClick() {
    emitter.emit('click', 'hello mitt')
}
</script>

<template>
    <div>
      <button @click="handleClick"> 点击我</button>
    </div>
</template>