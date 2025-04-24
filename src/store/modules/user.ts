import { defineStore } from "pinia";
import { reqCode, reqUserLogin } from "@/api/hospital";

const useUserStore = defineStore("user", {
  state: () => {
    return {
      visiable: false,
      code: {} as string,
      // userInfo: {} as string,
      userInfo: JSON.parse(localStorage.getItem("USERINFO") as string) || {},
    };
  },
  actions: {
    async getCode(phone: string) {
      let result: any = await reqCode(phone);
      if (result.code === 200) {
        this.code = result.data;
      }
    },
    async userLogin(LoginData: any) {
      let result: any = await reqUserLogin(LoginData);
      if (result.code == 200) {
        this.userInfo = result.data;
        localStorage.setItem("USERINFO", JSON.stringify(this.userInfo));
      }
    },
    logout() {
      this.userInfo = { name: "", token: "" };
      localStorage.removeItem("USERINFO");
    },
    queryState() {
      let timer = setInterval(() => {
        if (this.userInfo.token) {
          this.visiable = false;
          this.userInfo == JSON.parse(this.userInfo.token as string);
          clearInterval(timer);
        }
      }, 1000);
    },
  },
  getters: {},
});
export default useUserStore;
