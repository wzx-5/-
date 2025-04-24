<template>
    <el-button>获取验证码({{ time }}s)</el-button>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue'
let props = defineProps(['flag'])

let time = ref<number>(5)
let $emit = defineEmits(['getFlag'])

//监听父组件传递过来props数据变化
watch(() => props.flag, () => {
    let timer = setInterval(() => {
        time.value--
        if (time.value == 0) {
            clearInterval(timer)
            $emit('getFlag', false);
        }
    }, 1000)
}, { immediate: true })

</script>

<style scoped lang='scss'></style>
