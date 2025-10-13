<script setup>
import {ref} from 'vue'
import childTwo from './ChildTwo.vue'
const msg = ref('只是给ParentTwo组件的信息')
</script>

<template>
    <div>
        <h1>ParentTwo</h1>
        <childTwo :msg="msg" />
    </div>
</template>
