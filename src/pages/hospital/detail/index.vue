<template>
    <div class="detail">
        <div class="top">
            <div class="name">{{ hospitalStore.hospitalInfo.hospital?.hosname }}</div>
            <div class="level">
                <svg t="1742489861361" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="4934" width="16" height="16">
                    <path
                        d="M190.193225 471.411583c14.446014 0 26.139334-11.718903 26.139334-26.13831 0-14.44499-11.69332-26.164916-26.139334-26.164916-0.271176 0-0.490164 0.149403-0.73678 0.149403l-62.496379 0.146333c-1.425466-0.195451-2.90005-0.295735-4.373611-0.295735-19.677155 0-35.621289 16.141632-35.621289 36.114522L86.622358 888.550075c0 19.949354 15.96767 35.597753 35.670407 35.597753 1.916653 0 3.808746 0.292666 5.649674 0l61.022819 0.022513c0.099261 0 0.148379 0.048095 0.24764 0.048095 0.097214 0 0.146333-0.048095 0.24457-0.048095l0.73678 0 0-0.148379c13.413498-0.540306 24.174586-11.422144 24.174586-24.960485 0-13.55983-10.760065-24.441669-24.174586-24.981974l0-0.393973-50.949392 0 1.450025-402.275993L190.193225 471.409536z"
                        fill="#d81e06" p-id="4935"></path>
                    <path
                        d="M926.52241 433.948343c-19.283182-31.445176-47.339168-44.172035-81.289398-45.546336-1.77032-0.246617-3.536546-0.39295-5.380544-0.39295l-205.447139-0.688685c13.462616-39.059598 22.698978-85.58933 22.698978-129.317251 0-28.349675-3.193739-55.962569-9.041934-82.542948l-0.490164 0.049119c-10.638291-46.578852-51.736315-81.31498-100.966553-81.31498-57.264215 0-95.466282 48.15065-95.466282 106.126063 0 3.241834-0.294712 6.387477 0 9.532097-2.996241 108.386546-91.240027 195.548698-196.23636 207.513194l0 54.881958-0.785899 222.227314 0 229.744521 10.709923 0 500.025271 0.222057 8.746198-0.243547c19.35686 0.049119 30.239721-4.817726 47.803749-16.116049 16.682961-10.761088 29.236881-25.50079 37.490869-42.156122 2.260483-3.341095 4.028757-7.075139 5.106298-11.20111l77.018118-344.324116c1.056052-4.053316 1.348718-8.181333 1.056052-12.160971C943.643346 476.446249 938.781618 453.944769 926.52241 433.948343zM893.82573 486.837924l-82.983993 367.783411-0.099261-0.049119c-2.555196 6.141884-6.879688 11.596106-12.872169 15.427364-4.177136 2.727111-8.773827 4.351098-13.414521 4.964058-1.49812-0.195451-3.046383 0-4.620227 0l-477.028511-0.540306-0.171915-407.408897c89.323375-40.266076 154.841577-79.670527 188.596356-173.661202 0.072655 0.024559 0.124843 0.049119 0.195451 0.072655 2.99931-9.137101 6.313799-20.73423 8.697079-33.164331 5.551436-29.185716 5.258771-58.123792 5.258771-58.123792-4.937452-37.98001 25.940812-52.965306 44.364417-52.965306 25.304316 0.860601 50.263777 33.656541 50.263777 52.326762 0 0 5.600555 27.563776 5.649674 57.190537 0.048095 37.366026-4.6673 56.847729-4.6673 56.847729l-0.466628 0c-5.872754 30.879288-16.214287 60.138682-30.464849 86.964654l0.36839 0.342808c-2.358721 4.815679-3.709485 10.220782-3.709485 15.943111 0 19.922748 19.088754 21.742187 38.765909 21.742187l238.761895 0.270153c0 0 14.666024 0.465604 14.690584 0.465604l0 0.100284c12.132318-0.638543 24.221658 5.207605 31.100322 16.409738 5.504364 9.016351 6.437619 19.6045 3.486404 28.988218L893.82573 486.837924z"
                        fill="#d81e06" p-id="4936"></path>
                    <path
                        d="M264.827039 924.31872c0.319272 0.024559 0.441045 0.024559 0.295735-0.024559 0.243547-0.048095 0.367367-0.074701-0.295735-0.074701s-0.539282 0.026606-0.271176 0.074701C264.43409 924.343279 264.532327 924.343279 264.827039 924.31872z"
                        fill="#d81e06" p-id="4937"></path>
                </svg>
                <span>{{ hospitalStore.hospitalInfo.hospital?.param.hostypeString }}</span>
            </div>
        </div>
        <div class="content">
            <div class="left">
                <img :src="`data:image/jpeg; base64, ` + hospitalStore.hospitalInfo.hospital?.logoData" alt="">
            </div>
            <div class="right">
                <div class="address">
                    <svg t="1742654260266" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4764" width="16" height="16">
                        <path
                            d="M594.986667 594.986667q34.346667-34.389333 34.346666-82.986667 0-48.64-34.346666-82.986667Q560.597333 394.666667 512 394.666667q-48.64 0-82.986667 34.346666-34.346667 34.389333-34.346666 82.986667 0 48.64 34.346666 82.986667 34.389333 34.346667 82.986667 34.346666 48.64 0 82.986667-34.346666z m-45.269334-120.704q15.616 15.616 15.616 37.717333t-15.616 37.717333q-15.616 15.616-37.717333 15.616t-37.717333-15.616q-15.616-15.616-15.616-37.717333t15.616-37.717333q15.616-15.616 37.717333-15.616t37.717333 15.616z"
                            p-id="4765"></path>
                        <path
                            d="M480 42.666667h64v97.365333q54.186667 4.565333 105.386667 24.832 71.936 28.458667 126.592 83.157333 54.698667 54.656 83.157333 126.549334 20.266667 51.2 24.832 105.429333H981.333333v64h-97.365333q-4.565333 54.186667-24.832 105.386667-28.458667 71.936-83.157333 126.592-54.656 54.698667-126.549334 83.157333-51.2 20.266667-105.429333 24.832V981.333333h-64v-97.365333q-54.186667-4.565333-105.386667-24.832-71.936-28.458667-126.592-83.157333-54.698667-54.656-83.157333-126.549334-20.266667-51.2-24.832-105.429333H42.666667v-64h97.365333q4.565333-54.186667 24.832-105.386667 28.458667-71.936 83.157333-126.592Q302.677333 193.28 374.570667 164.864q51.2-20.266667 105.429333-24.832V42.666667z m0 161.450666q-107.648 10.069333-186.752 89.173334Q214.186667 372.309333 204.117333 480H298.666667v64H204.117333q10.069333 107.648 89.173334 186.752 79.061333 79.061333 186.709333 89.130667V725.333333h64v94.549334q107.648-10.069333 186.752-89.173334 79.061333-79.061333 89.130667-186.709333H725.333333v-64h94.549334q-10.069333-107.648-89.173334-186.752-79.061333-79.061333-186.709333-89.130667V298.666667h-64V204.117333z"
                            p-id="4766"></path>
                    </svg>
                    <span>具体位置:{{ hospitalStore.hospitalInfo?.hospital.param.fullAddress }}</span>
                </div>
                <div class="route">规划路线:{{ hospitalStore.hospitalInfo.hospital?.route }}</div>
                <div class="footer">
                    <!-- <p> {{ hospitalStore.hospitalInfo.hospital?.intro }}</p> -->
                    <div>医院介绍</div>
                    <p>航天中心医院是集医疗、教学、科研于一体的大型三级甲等综合医院，是国家卫生计生委指定的全国疑难重症诊治指导中心，也是最早承担高干保健和外宾医疗任务的医院之一，以学科齐全、技术力量雄厚、特色专科突出、多学科综合优势强大享誉海内外。在2010、2011、2012、2013、2014年复旦大学医院管理研究所公布的“中国最佳医院排行榜”中连续五年名列榜首。
                        医院建成于1921年，由洛克菲勒基金会创办。建院之初，就志在“建成亚洲最好的医学中心”。90余年来，医院形成了“严谨、求精、勤奋、奉献”的医院精神和兼容并蓄的特色文化风格，创立了“三基”、“三严”的现代医学教育理念，形成了以“教授、病案、图书馆”著称的医院“三宝”，培养造就了张孝骞、林巧稚等一代医学大师和多位中国现代医学的领军人物，并向全国输送了大批的医学管理人才，创建了当今知名的10余家大型综合及专科医院。2011年在总结90年发展经验的基础上，创新性提出了“待病人如亲人，提高病人满意度；待同事如家人，提高员工幸福感”新办院理念。
                        目前，医院共有2个院区、总建筑面积53万平方米，在职职工4000余名、两院院士5人、临床和医技科室53个、国家级重点学科20个、国家临床重点专科29个、博士点16个、硕士点29个、国家级继续医学教育基地6个、二级学科住院医师培养基地18个、三级学科专科医师培养基地15个。开放住院床位2000余张，单日最高门诊量约1.5万人次、年出院病人约8万余人次。被评为“全国文明单位”、“全国创先争优先进基层党组织”、“全国卫生系统先进集体”、“首都卫生系统文明单位”、“最受欢迎三甲医院”，荣获全国五一劳动奖章。同时，医院还承担着支援老少边穷地区、国家重要活动和突发事件主力医疗队的重任，在2008年北京奥运工作中荣获“特别贡献奖”。
                        90多年来，以执着的医志、高尚的医德、精湛的医术和严谨的学风书写了辉煌的历史，今天的医院人正为打造“国际知名、国内一流”医院的目标而继续努力。</p>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang='ts'>
import { useDetailStore } from '@/store/modules/hospitalDetail';
let hospitalStore = useDetailStore()


</script>

<style scoped lang='scss'>
.detail {
    .top {
        display: flex;

        .name {
            font-size: 20px;
            color: black;
            line-height: 40px;
            height: 40px;
        }

        .level {
            color: #7f7f7f;
            margin-left: 10px;
            height: 40px;
            align-items: center;
            line-height: 40px;

            span {
                margin-left: 5px;
            }
        }
    }

    .content {
        display: flex;


        .left {
            width: 80px;

            img {
                width: 80px;
                height: 80px;
                border-radius: 50%;
            }
        }

        .right {
            flex: 1;
            font-size: 14px;
            margin-left: 20px;

            div {
                margin: 20px 0px;
            }


        }
    }

    .footerP {
        color: #7f7f7f;

        P {
            margin-top: 10px;
            line-height: 30px;
        }
    }

}
</style>
