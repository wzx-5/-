<template>
    <div class="login_container">
        <el-dialog v-model="userStore.visiable" title="用户登录">
            <el-row>
                <el-col :span="12">
                    <div class="login">
                        <div v-show="scene == 0">
                            <el-form :model="loginParmm" :rules="rules" ref="form">
                                <el-form-item prop="phone">
                                    <el-input placeholder="请你输入手机号码" :prefix-icon="User"
                                        v-model="loginParmm.phone"></el-input>
                                </el-form-item>
                                <el-form-item prop="code">
                                    <el-input placeholder="请输入验证码" :prefix-icon="Lock"
                                        v-model="loginParmm.code"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <CountDown v-if="flag" :flag="flag" @getFlag="getFlag" />
                                    <el-button v-else @click="getCode"
                                        :disabled="!isPhone || flag ? true : false">获取验证码</el-button>
                                </el-form-item>
                            </el-form>

                            <el-button style="width: 100%" type="primary" size="default"
                                :disabled="!isPhone || loginParmm.code.length < 6 ? true : false"
                                @click="login">用户登录</el-button>

                            <div class="bottom" @click="wexing">
                                <p>微信扫码登录</p>
                                <svg t="1685263287521" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="2450" width="32" height="32">
                                    <path
                                        d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                        fill="#28C445" p-id="2451"></path>
                                    <path
                                        d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                        fill="#28C445" p-id="2452"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="webchat" v-show="scene == 1">
                            <div id="login_container"></div>
                            <div class="phone" @click="handler">
                                <p>手机短信验证码登录</p>
                                <svg t="1742990705472" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="4676" width="32" height="32">
                                    <path
                                        d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z"
                                        p-id="4677"></path>
                                </svg>
                            </div>
                        </div>

                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="leftContent">
                        <div class="top">
                            <div class="item">
                                <img src="../../assets/images/code_app.png" alt=""></img>
                                <svg t="1742908612688" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="4693" width="16" height="16">
                                    <path
                                        d="M664.250054 368.541681c10.015098 0 19.892049 0.732687 29.67281 1.795902-26.647917-122.810047-159.358451-214.077703-310.826188-214.077703-169.353083 0-308.085774 114.232694-308.085774 259.274068 0 83.708494 46.165436 152.460344 123.281791 205.78483l-30.80868 91.730191 107.688651-53.455469c38.558178 7.53665 69.459978 15.308661 107.924012 15.308661 9.66308 0 19.230993-0.470721 28.752858-1.225921-6.025227-20.36584-9.521864-41.723264-9.521864-63.862493C402.328693 476.632491 517.908058 368.541681 664.250054 368.541681zM498.62897 285.87389c23.200398 0 38.557154 15.120372 38.557154 38.061874 0 22.846334-15.356756 38.156018-38.557154 38.156018-23.107277 0-46.260603-15.309684-46.260603-38.156018C452.368366 300.994262 475.522716 285.87389 498.62897 285.87389zM283.016307 362.090758c-23.107277 0-46.402843-15.309684-46.402843-38.156018 0-22.941502 23.295566-38.061874 46.402843-38.061874 23.081695 0 38.46301 15.120372 38.46301 38.061874C321.479317 346.782098 306.098002 362.090758 283.016307 362.090758zM945.448458 606.151333c0-121.888048-123.258255-221.236753-261.683954-221.236753-146.57838 0-262.015505 99.348706-262.015505 221.236753 0 122.06508 115.437126 221.200938 262.015505 221.200938 30.66644 0 61.617359-7.609305 92.423993-15.262612l84.513836 45.786813-23.178909-76.17082C899.379213 735.776599 945.448458 674.90216 945.448458 606.151333zM598.803483 567.994292c-15.332197 0-30.807656-15.096836-30.807656-30.501688 0-15.190981 15.47546-30.477129 30.807656-30.477129 23.295566 0 38.558178 15.286148 38.558178 30.477129C637.361661 552.897456 622.099049 567.994292 598.803483 567.994292zM768.25071 567.994292c-15.213493 0-30.594809-15.096836-30.594809-30.501688 0-15.190981 15.381315-30.477129 30.594809-30.477129 23.107277 0 38.558178 15.286148 38.558178 30.477129C806.808888 552.897456 791.357987 567.994292 768.25071 567.994292z"
                                        fill="#5D5D5D" p-id="4694"></path>
                                </svg>
                                <p>微信扫一扫关注</p>
                                <p>“快速预约挂号”</p>
                            </div>
                            <div class="item">
                                <img src="../../assets/images/code_login_wechat.png" alt="" />
                                <svg t="1685263518283" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="3668" width="16" height="16">
                                    <path
                                        d="M256 85.333333h512c64.8 0 117.333333 52.533333 117.333333 117.333334v618.666666c0 64.8-52.533333 117.333333-117.333333 117.333334H256c-64.8 0-117.333333-52.533333-117.333333-117.333334V202.666667c0-64.8 52.533333-117.333333 117.333333-117.333334z m0 64a53.333333 53.333333 0 0 0-53.333333 53.333334v618.666666a53.333333 53.333333 0 0 0 53.333333 53.333334h512a53.333333 53.333333 0 0 0 53.333333-53.333334V202.666667a53.333333 53.333333 0 0 0-53.333333-53.333334H256z m170.666667 618.666667a32 32 0 0 1 0-64h170.666666a32 32 0 0 1 0 64H426.666667z"
                                        fill="#000000" p-id="3669"></path>
                                </svg>
                                <p>扫一扫下载</p>
                                <p>“预约挂号APP”</p>
                            </div>

                        </div>
                    </div>
                    <P class="tip">尚医通官方指定平台</P>
                    <P class="tip">快速挂号 安全放心</P>
                </el-col>
            </el-row>
            <template #footer>
                <el-button type="primary" size="default" @click="closeDialog">关闭窗口</el-button>

            </template>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import { reqWxLogin } from '@/api/hospital';
import type { WXLoginResponseData } from '@/api/hospital/type';
import useUserStore from '@/store/modules/user';
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import { ref, reactive, computed, watch } from 'vue';
import { useRoute,useRouter } from 'vue-router';
let $route = useRoute()
let $router = useRouter()
let scene = ref(0)
let userStore = useUserStore();
let loginParmm = reactive({
    phone: '',
    code: ''
})

let flag = ref<boolean>(false)
let form = ref<any>()



const login =async () => {
    form.value.validate()
    try {
        await userStore.userLogin(loginParmm);
        //关闭对话框
        userStore.visiable = false;
        let redirect=$route.query.redirect
        if(redirect){
            $router.push(redirect as string)
        }else{
            $router.push('/home')
        }
    } catch (error) {
        ElMessage({
            type: 'error',
            message: (error as Error).message
        })
    }
}




const getCode = async () => {
    if (!isPhone.value || flag.value) return;
    flag.value = true;

    try {
        await userStore.getCode(loginParmm.phone)
        loginParmm.code = userStore.code
    }
    catch (error) {
        ElMessage({
            type: 'error',
            message: (error as Error).message
        })
    }
}



const getFlag = (val: boolean) => {
    flag.value = val;

}

let isPhone = computed(() => {
    //手机号码正则表达式
    const reg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
    //返回布尔值:真代表手机号码、假代表的即为不是手机号码
    return reg.test(loginParmm.phone);


});




const validatorPhone = (rule: any, value: any, callback: any) => {
    const reg = /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
    if (reg.test(value)) {
        callback();
    } else {
        callback(new Error('请输入正确的手机号码格式'))
    }

}

const validatorCode = (rule: any, value: any, callback: any) => {

    if (/^\d{6}$/.test(value)) {
        callback();
    } else {
        callback(new Error('请输入正确的验证码格式'))
    }

}






const rules = reactive({
    phone: [{ trigger: "change", validator: validatorPhone }],
    code: [{ trigger: "change", validator: validatorCode }],
});


const closeDialog = () => {
    userStore.visiable = false
    Object.assign(loginParmm, {
        phone: '',
        code: ''
    })
    form.value.resetFields()
}


const wexing = async () => {
    scene.value = 1

    let redirect_URL = encodeURIComponent(window.location.origin + "/wxlogin")
    let result: WXLoginResponseData = await reqWxLogin(redirect_URL)
    //@ts-ignore
    new WxLogin({
        self_redirect: true,
        id: "login_container",
        appid: result.data.appid,
        scope: "snsapi_login",
        redirect_uri: result.data.redirectUri,
        state: result.data.state,
        style: "black",
        href: ""
    })


}

const handler = () => {
    scene.value = 0
}

watch(() => scene.value, (val: number) => {
    if (val === 1) {
        userStore.queryState();
    }
})



</script>
<style lang="scss" scoped>
.login_container {
    ::v-deep(.el-dialog__body) {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }

    .login {
        padding: 20px;
        border: 1px solid #ccc;

        .webchat {
            display: flex;
            flex-direction: column;
            align-items: center;

            .phone {
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            p {
                margin: 10px 0px;
            }
        }

    }

    .bottom {
        display: flex;
        flex-direction: column;
        align-items: center;

        p {
            margin: 10px 0px;
        }
    }

    .leftContent {
        .top {
            display: flex;
            justify-content: space-around;

            .item {
                display: flex;
                flex-direction: column;
                align-items: center;

                img {
                    width: 130px;
                    height: 130px;
                }

                p {
                    margin: 5px 0px;
                }
            }

        }
    }

    .tip {
        text-align: center;
        margin: 20px 0px;
        font-size: 20px;
        font-weight: 900;
    }

}
</style>