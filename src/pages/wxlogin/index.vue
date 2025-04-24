<template>
</template>

<script setup lang='ts'>
import { useRoute } from 'vue-router';
// 获取路由对象
let $route = useRoute();

localStorage.setItem('USERINFO', JSON.stringify($route.query))
let html: any = document.querySelector('html');
html.style.display = 'none';
</script>

<style scoped lang='scss'></style>
