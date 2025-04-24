<template>
  <div>
    <!-- 首页轮播图的结构 -->
    <Carousel />
    <!-- 搜索框 -->
    <Serch />
    <!-- 底部展示医院的结构 -->
    <el-row gutter="10">
      <el-col :span="20">
        <!-- 等级子组件 -->
        <Level @getLevel="getLevel" />
        <!-- 地区子组件 -->
        <Region @getRegion="getRegion" />
        <!-- 展示医院的结构 -->
        <div class="hospital" v-if="hasHospitalArr.length > 0">
          <Card class="item" v-for="(item, index) in hasHospitalArr" :key="index" :hospitalInfo="item" />
        </div>
        <el-empty v-else description="暂无数据" />

        <!-- 分页器 -->
        <el-pagination v-model:current-page="pageNO" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
          :disabled="false" :background="true" layout=" prev, pager, next, jumper, ->, sizes ,total" :total="total"
          @current-change="currentChange" @size-change="sizeChange" />
      </el-col>
      <el-col :span="4">
        <!-- 右侧静态 -->
        <Tip />
      </el-col>

    </el-row>
  </div>
</template>

<script setup lang='ts'>
//引入首页轮播图组件
import Carousel from './carousel/index.vue'
import Serch from './serch/index.vue'
import Level from './level/index.vue'
import Region from './region/index.vue'
import Card from './card/index.vue'
import Tip from './tip/index.vue'
import type { Content, HospitalResponseData } from '@/api/home/type'
//分页器需要的数据
import { ref, onMounted } from 'vue'
import { reqHospital, } from '@/api/home'
// 引入路由器，用于跳转页面
// import { useRouter } from 'vue-router'

// 分页器页码
let pageNO = ref<number>(1)
// 一页展示几条数据
let pageSize = ref<number>(10)
//存储已有的医院的数据
let hasHospitalArr = ref<Content>([])
// 存储医院的总个数
let total = ref<number>()
//存储医院的等级
let hostype = ref<string>('')
// 存储医院的地区
let districtCode = ref<string>('')
// let $router = useRouter()

//组件挂载完毕，发一次请求
onMounted(() => {
  getHospitalInfo();
})

const getHospitalInfo = async () => {
  //获取医院数据：默认获取第一页、一页十个医院的数据
  let result: HospitalResponseData = await reqHospital(pageNO.value, pageSize.value, hostype.value, districtCode.value)
  if (result.code == 200) {
    //存储已有的医院的数据
    hasHospitalArr.value = result.data.content
    // 存储医院的总个数
    total.value = result.data.totalElements

  }
}




//分页器页码发生变化时候回调
const currentChange = () => {
  getHospitalInfo();

}

const sizeChange = () => {
  getHospitalInfo();
}


const getLevel = (level: string) => {
  hostype.value = level
  getHospitalInfo();

}

const getRegion = (region: string) => {
  districtCode.value = region
  getHospitalInfo();
}




</script>

<style scoped lang='scss'>
.hospital {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .item {
    width: 48%;
    margin: 10px 0px;
  }

}
</style>