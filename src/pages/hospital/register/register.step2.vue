<template>
  <div class="container">
    <h1 class="tip">确认挂号信息</h1>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>请选择就诊人</span>
          <el-button type="primary" size="default" :icon="User" @click="goUser"
            >添加就诊人</el-button
          >
        </div>
      </template>
      <div class="user">
        <Visitor
          @click="changeIndex(index)"
          v-for="(user, index) in userArr"
          :key="user.id"
          class="item"
          :user="user"
          :index="index"
          :currentIndex="currentIndex"
        />
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>挂号信息</span>
        </div>
      </template>
      <el-descriptions class="margin-top" :column="2" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊日期:</div>
          </template>
          {{ docInfo.workDate }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊医院:</div>
          </template>
          {{ docInfo.param?.hosname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">就诊科室:</div>
          </template>
          {{ docInfo.param?.depname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生姓名:</div>
          </template>
          {{ docInfo.docname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生职称:</div>
          </template>
          {{ docInfo.title }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生专长:</div>
          </template>
          {{ docInfo.skill }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">医生服务器:</div>
          </template>
          <span style="color: red">{{ docInfo.amount }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <div class="btn">
      <el-button
        type="primary"
        size="default"
        v-bind:disabled="currentIndex == -1 ? true : false"
        @click="submitOrder"
        >确认挂号</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { User } from "@element-plus/icons-vue";
import { reqDoctorInfo, reqGetUser } from "@/api/hospital";
import { onMounted, ref } from "vue";
import type { DoctorInfoData, UserArr } from "@/api/hospital/type";
import { useRoute, useRouter } from "vue-router";
import { reqSubmitOrder } from "@/api/user";
import { ElMessage } from "element-plus";
import type { SubmitOrder } from "@/api/user/type";
let userArr = ref<UserArr>([]);
let docInfo = ref<any>({});
let $route = useRoute();
let currentIndex = ref(-1);
let $router = useRouter();

onMounted(() => {
  fetchUerData();
  fetchInfo();
});

const fetchUerData = async () => {
  let result = await reqGetUser();
  if (result.code === 200) {
    userArr.value = result.data;
  }
};

const fetchInfo = async () => {
  let result: DoctorInfoData = await reqDoctorInfo(
    $route.query.docId as string
  );
  if (result.code === 200) {
    docInfo.value = result.data;
  }
};
const changeIndex = (index: number) => {
  //存储当前用户选择就诊人信息索引值
  currentIndex.value = index;
};

const submitOrder = async () => {
  //医院编号
  let hoscode = docInfo.value.hoscode;
  //医生的ID
  let scheduleId = docInfo.value.id;
  //就诊人的ID
  let patientId = userArr.value[currentIndex.value].id;
  //提交订单
  let result: SubmitOrder = await reqSubmitOrder(
    hoscode,
    scheduleId,
    patientId
  );
  //提交订单成功
  if (result.code == 200) {
    $router.push({ path: "/user/order", query: { orderId: result.data } });
  } else {
    ElMessage({
      type: "error",
      message: result.message,
    });
  }
};

const goUser = () => {
  //路由跳转
  $router.push({ path: "/user/patient", query: { type: "add" } });
};
</script>

<style scoped lang="scss">
.container {
  .tip {
    font-weight: 900;
    color: #7f7f77;
    font-size: 20px;
  }

  .box-card {
    margin: 20px 0px;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .user {
      display: flex;
      flex-wrap: wrap;

      .item {
        width: 32%;
        margin: 5px;
      }
    }
  }

  .btn {
    display: flex;
    justify-content: center;
    margin: 10px 0px;
  }
}
</style>
