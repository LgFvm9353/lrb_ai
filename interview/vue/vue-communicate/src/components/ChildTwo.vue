<script setup>
defineProps({
    msg: {
        type: String,
        default: '默认信息'
    }
})
</script>

<template>
    <div>
        <h1>ChildTwo</h1>
        <p>{{ msg }}</p>
    </div>  
</template>
