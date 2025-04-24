<template>
  <div class="box-card">
    <el-card>
      <template #header>
        <div class="card-header">
          <h1>实名信息</h1>
        </div>
      </template>
      <div class="tip">
        <p>
          <el-icon> <InfoFilled /> </el-icon
          >完成实名认证后才能添加就诊人，正常进行挂号
        </p>
      </div>
      <template #footer>
        <el-descriptions
          class="margin-top"
          :column="1"
          size="small"
          border
          style="margin: 20px auto"
          v-if="userInfo?.authStatus == 1"
        >
          <el-descriptions-item label-align="center" :width="20">
            <template #label>
              <div class="cell-item">用户姓名</div>
            </template>
            {{ userInfo.name }}
          </el-descriptions-item>
          <el-descriptions-item label-align="center" :width="20">
            <template #label>
              <div class="cell-item">证件类型</div>
            </template>
            {{ userInfo.certificatesType == "10" ? "身份证" : "户口本" }}
          </el-descriptions-item>
          <el-descriptions-item label-align="center" :width="20">
            <template #label>
              <div class="cell-item">证件号码</div>
            </template>
            {{ userInfo.certificatesNo }}
          </el-descriptions-item>
        </el-descriptions>

        <el-form
          ref="form"
          style="margin: 20px auto"
          label-width="80"
          :model="params"
          :rules="rules"
          v-else
        >
          <el-form-item label="用户姓名" prop="name">
            <el-input
              placeholder="请输入用户姓名"
              v-model="params.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="证件类型" prop="certificatesType">
            <el-select
              placeholder="请选择证件类型"
              style="width: 100%"
              v-model="params.certificatesType"
            >
              <el-option
                v-for="(item, index) in arrType"
                :key="index"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码" prop="certificatesNo">
            <el-input
              placeholder="请输入证件号码"
              v-model="params.certificatesNo"
            ></el-input>
          </el-form-item>
          <el-form-item label="上传证件" prop="certificatesUrl">
            <el-upload
              ref="upload"
              list-type="picture-card"
              action="/api/oss/file/fileUpload?fileHost=userAuah"
              :limit="1"
              :on-exceed="exceedhandler"
              :on-success="successhandler"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <img
                style="width: 100%; height: 100%"
                src="../../../assets/images/auth_example.png"
                alt=""
              />
            </el-upload>

            <el-dialog v-model="dialogVisible">
              <img
                :src="params.certificatesUrl"
                alt="preview Image"
                style="width: 100%; height: 100%"
              />
            </el-dialog>
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
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type {
  CertationTypeResponseData,
  UseringoResponseData,
  UserParams,
} from "@/api/user/type";
import { InfoFilled } from "@element-plus/icons-vue";
import { ref, reactive, onMounted } from "vue";
import {
  reqUserInfo,
  reqCertationType,
  reqUserCertation,
} from "@/api/user/index";
//@ts-ignore
import { ElMessage } from "element-plus";

let userInfo = ref<any>();
let arrType = ref<any>();
let params = reactive<UserParams>({
  name: "",
  certificatesType: "",
  certificatesNo: "",
  certificatesUrl: "",
});
let dialogVisible = ref(false);
let upload = ref();
let form = ref();

onMounted(() => {
  //获取用户信息的方法
  getUserInfo();
  //获取证件类型的接口
  getType();
});

const getUserInfo = async () => {
  let result: UseringoResponseData = await reqUserInfo();
  if (result.code === 200) {
    userInfo.value = result.data;
  }
};

const getType = async () => {
  let result: CertationTypeResponseData = await reqCertationType();
  if (result.code == 200) {
    arrType.value = result.data;
  }
};

const exceedhandler = () => {
  ElMessage({
    type: "error",
    message: "图片只能上传一张图片",
  });
};

const successhandler = (response: any) => {
  form.value.clearValidate("certificatesUrl");
  params.certificatesUrl = response.data;
};

const handlePictureCardPreview = () => {
  dialogVisible.value = true;
};

const handleRemove = () => {
  params.certificatesUrl = "";
};

const reset = () => {
  upload.value.clearFiles();
  Object.assign(params, {
    name: "",
    certificatesType: "",
    certificatesNo: "",
    certificatesUrl: "",
  });
};

const submit = async () => {
  await form.value.validate();
  try {
    await reqUserCertation(params);
    ElMessage({
      message: "认证成功",
      type: "success",
    });

    getUserInfo();
  } catch (error) {
    ElMessage({
      type: "error",
      message: "认证失败",
    });
  }
};

const validatorName = (rule: any, value: any, callBack: any) => {
  //rule:即为当前校验字段的校验规则对象
  const reg =
    /^[\u00B7\u3007\u3400-\u4DBF\u4E00-\u9FFF\uE000-\uF8FF\uD840-\uD8C0\uDC00-\uDFFF\uF900-\uFAFF]+$/;
  if (reg.test(value)) {
    callBack();
  } else {
    callBack(new Error("请输入正确的用户名"));
  }
};

const validatorType = (rule: any, value: any, callback: any) => {
  if (value == "10" || value == "20") {
    callback();
  } else {
    callback(new Error("请选择证件类型"));
  }
};

const validatorNo = (rule: any, value: any, callback: any) => {
  let sfz = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
  let hkb = /^\d{9}$/;
  if (sfz.test(value) || hkb.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正确的证件号码"));
  }
};

const validatorUrl = (rule: any, value: any, callBack: any) => {
  if (value.length) {
    callBack();
  } else {
    callBack(new Error("请上传证件图片"));
  }
};

const rules = {
  name: [
    {
      required: true,
      validator: validatorName,
    },
  ],
  certificatesType: [
    {
      required: true,
      validator: validatorType,
    },
  ],
  certificatesNo: [
    {
      required: true,
      validator: validatorNo,
    },
  ],
  certificatesUrl: [
    {
      required: true,
      validator: validatorUrl,
    },
  ],
};
</script>

<style scoped lang="scss">
.box-card {
  .tip {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #7f7f7f;
  }
}
</style>
