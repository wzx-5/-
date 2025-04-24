import { defineStore } from "pinia";
import { reqHospitalDetail, reqHospitalDepartment } from "@/api/hospital";
//引入详情数据的ts类型
import type {
  HospitalDetail,
  DepartmentArr,
  DepartmentResponseData,
} from "@/api/hospital/type";
import { ref } from "vue";

export const useDetailStore = defineStore("Detail", () => {
  let hospitalInfo = ref();
  let departmentArr = ref([] as DepartmentArr);
  const getHospital: any = async (hoscode: string) => {
    let result: HospitalDetail = await reqHospitalDetail(hoscode);
    if (result.code == 200) {
      hospitalInfo.value = result.data;
    }
  };
  const getDepartment: any = async (hoscode: string) => {
    let result: DepartmentResponseData = await reqHospitalDepartment(hoscode);
    if (result.code == 200) {
      departmentArr.value = result.data;
    }
  };

  return { hospitalInfo, getHospital, departmentArr, getDepartment };
});
