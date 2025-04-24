<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>就诊人管理</span>
        <el-button class="button" typr="primary" :icon="User" @click="addUser"
          >添加就诊人</el-button
        >
      </div>
    </template>
    <div class="visitor" v-if="scene == 0">
      <Visitor
        clas="item"
        v-for="(user, index) in userArr"
        :key="user.id"
        :user="user"
        :index="index"
        @changeScene="changeScene"
        @removeUser="removeUser"
      />
    </div>
    <div class="form" v-if="scene == 1">
      <el-divider content-position="left">就诊人信息</el-divider>
      <el-form style="width: 60%; margin: 10px auto">
        <el-form-item label="用户性名">
          <el-input
            placeholder="请输入用户姓名"
            v-model="userParams.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select
            placeholder="请选择证件类型"
            v-model="userParams.certificatesType"
          >
            <el-option
              v-for="item in certationArr"
              :key="item.id"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input
            placeholder="请输入证件号码"
            v-model="userParams.certificatesNo"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-radio-group v-model="userParams.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            type="date"
            placeholder="请选择你的日期"
            v-model="userParams.birthdate"
          />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input
            placeholder="请你输入用户手机号码"
            v-model="userParams.phone"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-divider content-position="left"
        >建档信息(完善后部分医院首次就诊不排队建档)</el-divider
      >
      <el-form style="width: 60%; margin: 10px auto">
        <el-form-item label="婚姻状况">
          <el-radio-group v-model="userParams.isMarry">
            <el-radio :label="1">已婚</el-radio>
            <el-radio :label="0">未婚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自费/医保">
          <el-radio-group v-model="userParams.isInsure">
            <el-radio :label="1">自费</el-radio>
            <el-radio :label="0">医保</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前的住址">
          <el-cascader
            :props="props"
            v-model="userParams.addressSelected"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input
            placeholder="请你输入用户详细地址"
            v-model="userParams.address"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form style="width: 60%; margin: 10px auto">
        <el-form-item label="用户姓名">
          <el-input
            placeholder="请你输入用户姓名"
            v-model="userParams.contactsName"
          ></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select
            placeholder="请选择证件类型"
            v-model="userParams.contactsCertificatesType"
          >
            <el-option
              v-for="item in certationArr"
              :key="item.id"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input
            placeholder="请输入证件号码"
            v-model="userParams.contactsCertificatesNo"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input
            placeholder="请你输入用户手机号码"
            v-model="userParams.contactsPhone"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" @click="submit"
            >提交</el-button
          >
          <el-button type="primary" size="default" @click="reset"
            >重写</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { reqGetUser } from "@/api/hospital";
import type { UserArr, UserResponseData } from "@/api/hospital/type";
import { reqAddOrUpdateUser, reqCertationType, reqCity } from "@/api/user";
import { User } from "@element-plus/icons-vue";
import { ElMessage, type CascaderProps } from "element-plus";
import { ref, onMounted, reactive, watch } from "vue";
import type { AddOrUpdateUser } from "@/api/user/type";
import { useRoute, useRouter } from "vue-router";
let $route = useRoute();
let $router = useRouter();
let userArr = ref<UserArr>([]);
let scene = ref<number>(0);
let certationArr = ref<any>();
let userParams = reactive<AddOrUpdateUser>({
  name: "",
  certificatesType: "",
  certificatesNo: "",
  sex: 0,
  birthdate: "",
  phone: "",
  isMarry: 0,
  isInsure: 0,
  addressSelected: [],
  address: "",
  contactsName: "",
  contactsCertificatesType: "",
  contactsCertificatesNo: "",
  contactsPhone: "",
});

onMounted(() => {
  getAllUser();
  getCertationType();

  if ($route.query.type == "add") {
    scene.value = 1;
  }
  if ($route.query.type == "edit") {
    scene.value = 1;
  }
});

watch(
  () => userArr.value,
  () => {
    if ($route.query.type == "edit") {
      let user = userArr.value.find((item: any) => {
        return item.id == $route.query.id;
      });
      Object.assign(userParams, user);
    }
  }
);

const getAllUser = async () => {
  let result: UserResponseData = await reqGetUser();
  if (result.code === 200) {
    userArr.value = result.data;
  }
};

const getCertationType = async () => {
  let result: any = await reqCertationType();
  if (result.code === 200) {
    certationArr.value = result.data;
  }
};

const changeScene = (user: AddOrUpdateUser) => {
  scene.value = 1;
  Object.assign(userParams, user);
};

const props: CascaderProps = {
  lazy: true,
  async lazyLoad(node: any, resolve: any) {
    let result: any = await reqCity(node.data.id || " 86");
    let showData = result.data.map((item: any) => {
      return {
        id: item.id,
        label: item.name,
        value: item.value,
        leaf: !item.hasChildren,
      };
    });
    resolve(showData);
  },
};

const addUser = () => {
  reset();
  scene.value = 1;
};

const submit = async () => {
  try {
    await reqAddOrUpdateUser(userParams);
    ElMessage({
      type: "success",
      message: userParams.id ? "更新成功" : "新增成功",
    });
    if ($route.query.type) {
      $router.back();
    } else {
      scene.value = 0;
    }
    getAllUser();
  } catch (error) {
    ElMessage({
      type: "error",
      message: userParams.id ? "更新失败" : "新增失败",
    });
  }
};

const reset = () => {
  Object.assign(userParams, {
    name: "",
    certificatesType: "",
    certificatesNo: "",
    sex: 0,
    birthdate: "",
    phone: "",
    isMarry: 0,
    isInsure: 0,
    addressSelected: [],
    address: "",
    contactsName: "",
    contactsCertificatesType: "",
    contactsCertificatesNo: "",
    contactsPhone: "",
  });
};

const removeUser = async () => {
  getAllUser();
};
</script>

<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .visitor {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 32%;
      margin: 5px;
    }
  }
}
</style>
