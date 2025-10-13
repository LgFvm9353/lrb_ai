<script >

export default {
    // 类式写法 
    // data 自由数据状态
    // props 父传过来的参数
    props: ["msg1","msg2"]
}
</script>


<template>
    <div>
        <h1>ChildOne</h1>
        <p>{{ msg1 }}</p>
        <p>{{ msg2 }}</p>
    </div>
</template>


