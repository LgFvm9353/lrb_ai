<script setup>
import {emitter} from '../utils/eventBus.js'
emitter.on('click', (e) => {
    console.log('EmittB 收到了事件', e)
})
</script>

<template>
    <div>
      
    </div>
</template>