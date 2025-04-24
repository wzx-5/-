<template>
    <div class="wrap">
        <div class="top">
            <div class="hosname">{{ workData.baseMap?.hosname }}</div>
            <div class="line"></div>
            <div>{{ workData.baseMap?.bigname }}</div>
            <div class="dot">.</div>
            <div class="hosdeparment">{{ workData.baseMap?.depname }}</div>
        </div>
        <div class="center">
            <h1 class="time">{{ workData.baseMap?.workDateString }}</h1>
            <div class="container">
                <div class="item" :class="{
                    active: item.status == -1 || item.availableNumber == -1,
                    cur: item.workDate == workTime.workDate,
                }" v-for="item in workData.bookingScheduleList" :key="item" @click="changeTime(item)">
                    <div class="top1">{{ item.workDate }}{{ item.dayOfweek }}</div>
                    <div class="bottom">
                        <div v-if="item.status == -1">停止挂号</div>
                        <div v-if="item.status == 0">
                            {{
                                item.availableNumber == -1
                                    ? "约满了"
                                    : `有号(${item.availableNumber})`
                            }}
                        </div>
                        <div v-if="item.status == 1">即将放号</div>
                    </div>
                </div>
            </div>
            <el-pagination layout="prev, pager, next" v-model:current-page="pageNo" :total="workData.total"
                @current-change="fetchWorkData" />
        </div>
        <div class="bottom">
            <div class="will" v-if="workTime.status == 1">
                <span class="time">2023年6月3日08：30</span>
                <span class="willText">放号</span>
            </div>
            <div class="doctor" v-if="workTime.status == 0">
                <div class="moring">
                    <div class="tip">
                        <svg t="1743174386652" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="6788" width="16" height="16">
                            <path
                                d="M904.101037 676.946871H118.670712c-15.461511 0-28.105271-12.535384-28.105271-28.033021 0-15.461511 12.643759-28.105271 28.105271-28.10527h785.430325c15.461511 0 28.105271 12.643759 28.105271 28.10527s-12.607634 28.033021-28.105271 28.033021z m-56.029916-324.980738c-11.018133 10.945883-28.719396 10.945883-39.665279 0-11.018133-10.945883-11.018133-28.755521 0-39.665279l39.665279-39.665279a27.97522 27.97522 0 0 1 39.593029 0 27.93187 27.93187 0 0 1 0 39.665279l-39.593029 39.665279z m-62.279545 212.776406c-26.082269-128.027094-138.683977-224.444789-274.441826-224.44479-135.649474 0-248.287307 96.417696-274.369576 224.44479H177.915755c21.602766-158.263741 162.454244-280.583081 333.433995-280.583081 171.088125 0 311.903478 122.31934 333.506244 280.583081h-59.064418z m-274.441826-336.612997c-15.461511 0-28.033021-12.535384-28.033021-28.10527V143.95823c0-15.461511 12.535384-28.105271 28.033021-28.10527 15.569886 0 28.105271 12.643759 28.10527 28.10527v56.029916c0 15.606011-12.535384 28.141396-28.10527 28.141396zM174.700628 351.966133L135.035349 312.264729c-10.945883-10.945883-10.945883-28.755521 0-39.665279 11.018133-10.945883 28.719396-10.945883 39.665279 0l39.665279 39.665279a27.93187 27.93187 0 0 1 0 39.665279c-10.909758 10.982008-28.647146 10.982008-39.665279 0.036125z m-28.033021 381.119029h729.40041c15.497636 0 28.033021 12.535384 28.03302 28.03302a28.033021 28.033021 0 0 1-28.03302 28.033021H146.667607c-15.497636 0-28.033021-12.535384-28.03302-28.033021 0.036125-15.497636 12.571509-28.033021 28.03302-28.03302z m84.171312 112.168207h561.093911c15.497636 0 28.033021 12.535384 28.033021 28.033021 0 15.569886-12.535384 28.105271-28.033021 28.10527H230.838919c-15.497636 0-28.033021-12.535384-28.03302-28.10527 0-15.497636 12.535384-28.033021 28.03302-28.033021z"
                                fill="#2c2c2c" p-id="6789"></path>
                        </svg>
                        <span>上午号源</span>
                    </div>
                    <!-- <div class="doc_info" v-for="doctor in moringArr" :key="doctor.id"> -->
                    <div class="doc_info">
                        <div class="left">
                            <div class="info">
                                <!-- <span>{{ doctor.title }}</span> -->
                                <span>|</span>
                                <!-- <span>{{ doctor.docname }}</span> -->
                            </div>
                            <!-- <div class="skill">{{ doctor.skill }}</div> -->
                        </div>
                        <div class="right">
                            <!-- <div class="money">￥{{ doctor.amount }}</div> -->
                            <el-button type="primary" size="default" @click="goStep2()">100</el-button>
                        </div>
                    </div>
                </div>
                <div class="afteronm">
                    <div class="moring">
                        <div class="tip">
                            <svg t="1743168172946" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="5792" width="16" height="16">
                                <path
                                    d="M512.000213 733.353497c-122.06857 0-221.353283-99.284713-221.353283-221.353284S389.931643 290.64693 512.000213 290.64693 733.353497 389.931643 733.353497 512.000213 634.026117 733.353497 512.000213 733.353497z m0-357.373767A136.148482 136.148482 0 0 0 375.97973 512.000213 136.148482 136.148482 0 0 0 512.000213 648.020697 136.148482 136.148482 0 0 0 648.020697 512.000213 136.148482 136.148482 0 0 0 512.000213 375.97973zM554.666613 171.735673A42.154403 42.154403 0 0 1 512.000213 213.335413c-23.551853 0-42.6664-18.645217-42.6664-41.59974V41.603153A42.154403 42.154403 0 0 1 512.000213 0.003413c23.551853 0 42.6664 18.645217 42.6664 41.59974v130.13252zM554.666613 982.397273A42.154403 42.154403 0 0 1 512.000213 1023.997013c-23.594519 0-42.6664-18.687883-42.6664-41.59974v-130.175186A42.111737 42.111737 0 0 1 512.000213 810.665013c23.551853 0 42.6664 18.60255 42.6664 41.59974v130.13252zM171.735673 469.333813c22.954523 0 41.59974 19.114547 41.59974 42.6664 0 23.594519-18.645217 42.6664-41.59974 42.6664H41.603153A42.154403 42.154403 0 0 1 0.003413 512.000213c0-23.551853 18.645217-42.6664 41.59974-42.6664h130.13252zM982.397273 469.333813c22.954523 0 41.59974 19.114547 41.59974 42.6664 0 23.594519-18.687883 42.6664-41.59974 42.6664h-130.175186A42.111737 42.111737 0 0 1 810.665013 512.000213c0-23.551853 18.60255-42.6664 41.59974-42.6664h130.13252zM241.239239 722.430898a42.06907 42.06907 0 0 1 59.562294 0.767995 42.111737 42.111737 0 0 1 0.767996 59.562295l-92.031425 92.074091a42.154403 42.154403 0 0 1-59.562295-0.853328 42.154403 42.154403 0 0 1-0.767995-59.562294l92.031425-91.988759zM814.462323 149.207814a42.154403 42.154403 0 0 1 59.562294 0.767995 42.154403 42.154403 0 0 1 0.767996 59.562295l-92.031425 92.031425a42.06907 42.06907 0 0 1-59.562295-0.767996 42.111737 42.111737 0 0 1-0.810661-59.562294l92.074091-92.031425zM241.239239 301.526862a42.19707 42.19707 0 0 0 59.604961-0.725329 42.111737 42.111737 0 0 0 0.767995-59.562294L209.538104 149.122481a42.154403 42.154403 0 0 0-59.562295 0.853328 42.111737 42.111737 0 0 0-0.767995 59.562295l92.031425 91.988758zM814.462323 874.792613a42.111737 42.111737 0 0 0 59.562294-0.810662 42.154403 42.154403 0 0 0 0.767996-59.562294l-92.031425-92.031425a42.06907 42.06907 0 0 0-59.562295 0.767995 42.111737 42.111737 0 0 0-0.810661 59.562294l92.074091 92.074092z"
                                    fill="#5B5B5B" p-id="5793"></path>
                            </svg>
                            <span>下午号源</span>
                        </div>
                        <div class="doc_info" v-for="doctor in afterArr" :key="doctor.id">
                            <div class="left">
                                <div class="info">
                                    <span>{{ doctor.title }}</span>
                                    <span>|</span>
                                    <span>{{ doctor.docname }}</span>
                                </div>
                                <div class="skill">{{ doctor.skill }}</div>
                            </div>
                            <div class="right">
                                <div class="money">￥{{ doctor.amount }}</div>
                                <!-- <el-button type="primary" size="default" @click="goStep2(doctor)">100</el-button> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { HospitalWordData, DocArr, Doctor } from "@/api/hospital/type";
import { onMounted, ref, computed } from "vue";
import { reqHospitalDoctor, reqHospitalWork } from "@/api/hospital";
import { useRoute, useRouter } from "vue-router";

let pageNo = ref<number>(1);
let limit = ref<number>(6);
let workData = ref<any>({});
let $route = useRoute();
let workTime: any = ref({});
let docArr = ref<DocArr>([]);
let $router = useRouter();
onMounted(() => {
    fetchWorkData();
});

const fetchWorkData = async () => {
    let result: HospitalWordData = await reqHospitalWork(
        pageNo.value,
        limit.value,
        $route.query.hoscode as string,
        $route.query.depcode as string
    );

    if (result.code == 200) {
        workData.value = result.data;
        workTime.value = workData.value.bookingScheduleList[0];
        getDoctorWorkData();
    }
};

//获取某一天医生排班的数据
const getDoctorWorkData = async () => {
    //医院的编号
    let hoscode: string = $route.query.hoscode as string;
    //科室的编号
    let depcode: string = $route.query.depcode as string;
    //时间
    let workDate: string = workTime.value.workDate;
    //获取排班医生的数据
    let result: any = await reqHospitalDoctor(hoscode, depcode, workDate);
    if (result.code == 200) {
        docArr.value = result.data;
    }
};

const changeTime = (item: any) => {
    workTime.value = item;
    getDoctorWorkData();
};

let moringArr = computed(() => {
    return docArr.value.filter((doc: Doctor) => {
        return doc.workTime == 0;
    });
});

let afterArr = computed(() => {
    return docArr.value.filter((doc: Doctor) => {
        return doc.workTime == 1;
    });
});

const goStep2 = () => {
    $router.push({ path: "/hospital/register_step2" });
};
</script>

<style scoped lang="scss">
.wrap {
    .top {
        display: flex;
        color: #7f7f7f;

        .line {
            width: 5px;
            height: 20px;
            background: skyblue;
            margin: 0px 5px;
        }

        .dot {
            margin: 0px 5px;
            color: skyblue;
        }
    }

    .center {
        margin: 20px 0px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .time {
            font-size: 20px;
            font-weight: 900;
            color: black;
        }

        .container {
            display: flex;
            width: 100%;
            margin: 30px 0px;

            .item {
                flex: 1;
                width: 100%;
                border: 1px solid skyblue;
                margin: 0px 10px;
                transition: all 0.3s;

                &.active {
                    border: 1px solid #ccc;
                    color: #7f7f7f;

                    .top1 {
                        background: #ccc;
                    }
                }

                &.cur {
                    transform: scale(1.1);
                }

                .top1 {
                    background: #e8f2ff;
                    width: 100%;
                    text-align: center;
                    line-height: 30px;
                    height: 30px;
                }

                .bottom {
                    width: 100%;
                    height: 60px;
                    text-align: center;
                    line-height: 60px;
                }
            }
        }
    }

    .bottom {
        .will {
            text-align: center;
            font-size: 30px;
            font-weight: 900;

            .time {
                color: red;
            }

            .willText {
                color: skyblue;
            }
        }

        .doctor {
            .moring {
                .tip {
                    display: flex;
                    align-items: center;

                    .text {
                        color: #7f7f7f;
                        font-weight: 900x;
                    }
                }

                .doc_info {
                    display: flex;
                    justify-content: space-between;
                    margin: 10px 0px;
                    border-bottom: 1px solid #ccc;

                    .left {
                        .info {
                            color: skyblue;
                            margin: 10px 0px;

                            span {
                                margin: 0px 5px;
                                font-size: 18px;
                                font-weight: 900;
                            }
                        }

                        .skill {
                            margin: 10px 0px;
                            color: #7f7f7f;
                        }
                    }

                    .right {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        width: 150px;

                        .money {
                            font-weight: 900;
                            color: #7f7f7f;
                        }
                    }
                }
            }
        }
    }
}
</style>
