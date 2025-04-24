<template>
    <div class="hospital">
        <div class="menu">
            <el-menu v-bind:default-active=$route.path class="el-menu-vertical-demo">
                <div class="top">
                    <el-icon>
                        <HomeFilled />
                    </el-icon>
                    <p>/医院信息</p>
                </div>
                <el-menu-item index="/hospital/register" @click="changeActive('/hospital/register')">
                    <el-icon>
                        <Calendar />
                    </el-icon>
                    <span>预约挂号</span>
                </el-menu-item>
                <el-menu-item index="/hospital/detail" @click="changeActive('/hospital/detail')">
                    <el-icon>
                        <Document />
                    </el-icon>
                    <span>医院详情</span>
                </el-menu-item>
                <el-menu-item index="/hospital/notice" @click="changeActive('/hospital/notice')">
                    <el-icon>
                        <Setting />
                    </el-icon>
                    <span>预约通知</span>
                </el-menu-item>
                <el-menu-item index="/hospital/close" @click="changeActive('/hospital/close')">
                    <el-icon>
                        <InfoFilled />
                    </el-icon>
                    <span>停诊信息</span>
                </el-menu-item>
                <el-menu-item index="/hospital/search" @click="changeActive('/hospital/search')">
                    <el-icon>
                        <Search />
                    </el-icon>
                    <span>查询/取消</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>


</template>

<script setup lang='ts'>
import { Calendar, Document, Search, InfoFilled, HomeFilled, Setting } from '@element-plus/icons-vue'
// 导入路由器
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'
// 引入pinia仓库
import { useDetailStore } from '@/store/modules/hospitalDetail'
// 创建一个路由器
let $router = useRouter()
// 创建一个路由获取点击的路径
let $route = useRoute()
// 创建一个仓库
let detailStore = useDetailStore()
const changeActive = (path: string) => {
    $router.push({ path, query: { hoscode: $route.query.hoscode } })
}
onMounted(() => {
    detailStore.getHospital($route.query.hoscode as string)
    detailStore.getDepartment($route.query.hoscode as string);

})


</script>

<style scoped lang='scss'>
.hospital {
    color: #7f7f7f;

    display: flex;

    .menu {
        flex: 2;
        display: flex;
        flex-direction: column;
        align-items: center;

        .top {
            display: flex;
            margin-left: 25px;
            font-size: 18px;
            margin-bottom: 10px;
        }
    }

    .content {
        flex: 8;
    }


}
</style>
