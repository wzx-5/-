import { createApp } from "vue";
//引入清除默认样式
import "@/style/reset.scss";
import App from "./App.vue";
//引入element-plus插件
import ElementPlus from "element-plus";
//@ts-ignore
//国际化文件
import { zhCn } from "element-plus/es/locales.mjs";
import HospitalTop from "@/components/hospital_top/index.vue";
import HosiptalBottom from "@/components/hospital_bottom/index.vue";
import Login from "@/components/login/index.vue";
import router from "@/router";
import pinia from "@/store";
import CountDown from "@/components/countDown/index.vue";
import Visitor from "@/components/visitor/visitor.vue";
//引入Elmessage和Elloading的css样式文件
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";
import "./permission";
const app = createApp(App);

app.component("HospitalTop", HospitalTop);
app.component("HosiptalBottom", HosiptalBottom);
app.component("Login", Login);
app.component("CountDown", CountDown);
app.component("Visitor", Visitor);
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(router);
// 安装pinia大菠萝
app.use(pinia);

//挂载
app.mount("#app");
