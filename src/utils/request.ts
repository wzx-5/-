// 引入axios
import useUserStore from "@/store/modules/user";
import axios from "axios";
// 创建一个axios实例
const request = axios.create({
  baseURL: "/api",
  timeout: 5000, //超时的时间的设置，超出5秒请求就是失败
});

// 请求拦截器
request.interceptors.request.use((config) => {
  //获取用户仓库
  let userStore = useUserStore();
  //token:公共参数,如果用户登录了需要携带
  if (userStore.userInfo.token) {
    config.headers.token = userStore.userInfo.token;
  }
  //config:请求拦截器回调注入的对象(配置对象),配置对象的身上最终要的一件事情headers属性
  //可以通过请求头携带公共参数-token
  return config;
});
//拦截响应器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    //处理http网络错误
    return Promise.reject(new Error(error.message));
  }
);

export default request;
