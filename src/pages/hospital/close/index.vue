<template>
    <h1>{{ hospitalDetailStore.hospitalInfo.hospital?.hosname }}停诊信息</h1>
    <el-empty description="暂无信息" />
</template>

<script setup lang='ts'>
import { useDetailStore } from '@/store/modules/hospitalDetail';
let hospitalDetailStore = useDetailStore()
</script>

<style scoped lang='scss'>
h1 {
    text-align: center;
    font-size: 30px;

}
</style>
