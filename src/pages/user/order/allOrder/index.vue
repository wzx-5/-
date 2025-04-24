<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>挂号订单</span>
      </div>
    </template>
    <el-form :inline="true">
      <el-form-item label="就诊人">
        <el-select
          placeholder="请选择就诊人"
          @change="changeUser"
          v-model="patientId"
        >
          <el-option
            v-for="item in allUser"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select
          placeholder="请选择订单状态"
          v-model="orderStatus"
          @change="changeOrderStatus"
        >
          <el-option label="全部订单" value=""></el-option>
          <el-option
            v-for="(item, index) in allOrderState"
            :key="index"
            :label="item.comment"
            :value="item.status"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-table border style="margin: 10px 0px" :data="allOrderArr">
      <el-table-column label="就诊时间" prop="reserveDate"></el-table-column>
      <el-table-column label="医院" prop="hosname"></el-table-column>
      <el-table-column label="科室" prop="depname"></el-table-column>
      <el-table-column label="医生" prop="title"></el-table-column>
      <el-table-column label="服务费" prop="amount"></el-table-column>
      <el-table-column label="就诊人" prop="patientName"></el-table-column>
      <el-table-column
        label="订单状态"
        prop="param.orderStatusString"
      ></el-table-column>
      <el-table-column label="操作">
        <template #="{ row }">
          <el-button type="text" @click="goDetail(row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="400"
      @current-change="getOrderInfo"
      @size-change="handler"
    />
  </el-card>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { reqAllUser, reqOrderState, reqUserOrderInfo } from "@/api/user";
import type {
  AllOrderState,
  AllOrderStateResponseData,
  AllUser,
  AllUserResponseData,
  Records,
  UserOrderInfoResponseData,
} from "@/api/user/type";
let pageNo = ref(1);
let pageSize = ref(10);
let patientId = ref();
let orderStatus = ref();
let allOrderArr = ref<Records>();
let total = ref<any>();
let $router = useRouter();
let allUser = ref<AllUser>([]);
let allOrderState = ref<AllOrderState>([]);

onMounted(() => {
  getOrderInfo();
  getData();
});

//获取订单的方法
const getOrderInfo = async (pager: number = 1) => {
  pageNo.value = pager;
  let result: UserOrderInfoResponseData = await reqUserOrderInfo(
    pageNo.value,
    pageSize.value,
    patientId.value,
    orderStatus.value
  );
  if (result.code == 200) {
    allOrderArr.value = result.data.records;
    total.value = result.data.total;
  }
};

const goDetail = (row: any) => {
  $router.push({ path: "/user/order", query: { orderId: row.id } });
};

const handler = (pageSizes: number) => {
  pageSize.value = pageSizes;
  getOrderInfo();
};

const getData = async () => {
  const result: AllUserResponseData = await reqAllUser();
  const result1: AllOrderStateResponseData = await reqOrderState();
  allUser.value = result.data;
  allOrderState.value = result1.data;
};

const changeUser = () => {
  getOrderInfo();
};

const changeOrderStatus = () => {
  getOrderInfo();
};
</script>

<style scoped lang="scss"></style>
