<template>
  <div class="region">
    <div class="content">
      <div class="left">地区:</div>
      <ul class="hospital">
        <li :class="{ active: activeFlag == '' }" @click="changeRegion('')">
          全部
        </li>
        <li
          v-for="region in regionArr"
          :class="{ active: activeFlag == region.value }"
          :key="region.value"
          @click="changeRegion(region.value)"
        >
          {{ region.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reqHospitalLevelAndRegion } from "@/api/home";
import type {
  HospitalLevelAndRegionArr,
  HospitalLevelAndRegionResponseData,
} from "@/api/home/type";
import { onMounted, ref } from "vue";
// 向父组件传达数据
let $emit = defineEmits(["getRegion"]);

let regionArr = ref<HospitalLevelAndRegionArr>([]);
//控制医院等级高亮响应式数据
let activeFlag = ref<string>("");

onMounted(() => {
  getRegion();
});

const getRegion = async () => {
  let result: HospitalLevelAndRegionResponseData =
    await reqHospitalLevelAndRegion("Beijin");
  if (result.code == 200) {
    regionArr.value = result.data;
    console.log(result);
  }
};

function changeRegion(region: string) {
  activeFlag.value = region;
  $emit("getRegion", region);
}
</script>

<style scoped lang="scss">
.region {
  color: #7f7f7f;
  margin-top: 10px;

  .content {
    display: flex;

    .left {
      margin-right: 7px;
      margin-top: 10px;
      margin-left: 4px;
      width: 45px;
    }

    .hospital {
      display: flex;
      flex-wrap: wrap;

      li {
        margin-right: 20px;
        margin-top: 10px;
        margin-left: -6px;

        &.active {
          color: #55a6fe;
        }
      }

      li:hover {
        color: #55a6fe;
        cursor: pointer;
      }
    }
  }
}
</style>
