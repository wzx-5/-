<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="detail">挂号详情</div>
            </template>
            <div class="top">
                <el-tag class="m1-2" type="success">
                    <div class="tag">

                        <span>√ 预约成功，待支付</span>
                    </div>
                </el-tag>
                <div class="right_info">
                    <img src="../../../../assets//images/code_app.png" alt="">
                    <div class="info">
                        <p>微信 关注 “北京114预约挂号”</p>
                        <p>“快速预约挂号”</p>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="left">
                    <el-descriptions class="margin-top" :column="1" border>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    就诊人信息
                                </div>
                            </template>
                            {{ orderInfo.patientName }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    就诊人日期
                                </div>
                            </template>
                            {{ orderInfo.reserveDate }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    就诊医院
                                </div>
                            </template>
                            {{ orderInfo.hosname }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    就诊科室
                                </div>
                            </template>
                            {{ orderInfo.depname }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    医生职称
                                </div>
                            </template>
                            {{ orderInfo.title }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">医事服务费</div>
                            </template>
                            <span style="color: red">{{ orderInfo.amount }}</span>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">挂号单号</div>
                            </template>
                            {{ orderInfo.outTradeNo }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">挂号时间</div>
                            </template>
                            {{ orderInfo.createTime }}
                        </el-descriptions-item>
                    </el-descriptions>
                    <div class="btn">
                        <!-- v-if="orderInfo.orderStatus == 0 || orderInfo.orderStatus == 1" -->
                        <el-popconfirm title="确定取消预约吗？">
                            <template #reference>
                                <el-button @click="cancel">取消预约</el-button>
                            </template>
                        </el-popconfirm>
                        <el-button type="primary" size="default" @click="openDialog">
                            <!-- v-if="orderInfo.orderStatus == 0" -->
                            支付</el-button>
                    </div>
                </div>
                <div class="right">
                    <el-card>
                        <template #header>
                            <div class="card-header">
                                <span>注意事项</span>
                            </div>
                        </template>
                        <p>1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担;</p>
                        <p style="color: red;">2.【取号】就诊当天需在{{ orderInfo.fetchTime }}前在
                            医院取号，未取号视为爽约，改号不退不换；
                        </p>
                        <p>3.【退号】在{{ orderInfo.quitTime }}前可在线退号，逾期将不可办理退号退费</p>
                        <p>4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；</p>
                        <p>5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</p>
                    </el-card>
                </div>
            </div>
        </el-card>
        <!-- 支付二维码的结构 -->
        <el-dialog @close="close" v-model="dialogTableVisible" title="微信支付" width="400">
            <div class="qrocde">
                <img :src="imgUrl" alt="">
                <p>请使用微信扫一扫</p>
                <p>扫描二维码支付</p>
            </div>
            <template #footer>
                <el-button type="primary" size="default" @click="closeDialog">关闭窗口</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { reqCancelOrder, reqOrderInfo, reqQrcode, reqQueryPayState } from '@/api/user/index'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { QrCode } from '@/api/user/type'
import QRCode from 'qrcode'

let $route = useRoute()
let orderInfo = ref<any>({})
let dialogTableVisible = ref(false)
let imgUrl = ref<any>()
let timer = ref<any>()

onMounted(() => {
    getOrderInfo()
})

const getOrderInfo = async () => {
    let result = await reqOrderInfo($route.query.orderId as string)
    if (result.code === 200) {
        orderInfo.value = result.data
    }
}
const cancel = async () => {
    try {
        await reqCancelOrder($route.query.orderId as string)
        getOrderInfo()
    } catch (error) {
        ElMessage({
            type: 'error',
            message: "取消预约失败"
        })
    }
}

const openDialog = async () => {
    //展示对话框
    dialogTableVisible.value = true
    //获取支付需要使用二维码信息
    let result: QrCode = await reqQrcode($route.query.orderId as string);
    //更具服务器返回二维码信息生成二维码图片
    imgUrl.value = await QRCode.toDataURL(result.data.codeUrl);
}

const closeDialog = () => {
    dialogTableVisible.value = false
    clearInterval(timer.value)
}

timer.value = setInterval(async () => {
    let result = await reqQueryPayState($route.query.orderId as string)
    if (result.data) {
        dialogTableVisible.value = false
        ElMessage({
            type: 'success',
            message: "支付成功"
        })
        clearInterval(timer.value)
        getOrderInfo()
    }
}, 2000)

const close = () => {
    clearInterval(timer.value)
}



</script>

<style scoped lang='scss'>
.box-card {
    .detail {
        color: #7f7f7f;
        font-weight: 900;
    }

    .top {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        padding: 10px;

        .tag {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .right_info {
            display: flex;
            justify-content: space-between;
            align-items: center;

            img {
                width: 40px;
                height: 40px;
            }

            .info {
                margin-left: 10px;

                p {
                    font-size: 12px;
                    line-height: 20px;
                }
            }
        }
    }

    .bottom {
        display: flex;

        .left {
            flex: 4;

            .btn {
                margin: 10px 0px;
            }
        }

        .right {
            margin-left: 20px;
            flex: 6;

            p {
                line-height: 30px;
            }
        }
    }
}

::v-deep(.el-dialog__body) {
    border-top: 1px solid #7f7f7f;
    border-bottom: 1px solid #7f7f7f;

    .qrocde {
        display: flex;
        flex-direction: column;
        align-items: center;

        p {
            line-height: 30px;
        }
    }
}
</style>
