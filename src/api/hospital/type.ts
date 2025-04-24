//定义详情模块数据ts类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
//代表医院详情的数据
export interface HosPitalDetail {
  bookingRule: {
    cycle: number;
    releaseTime: string;
    stopTime: string;
    quitDay: number;
    quitTime: string;
    rule: string[];
  };
  hospital: {
    id: string;
    createTime: string;
    updateTime: string;
    isDeleted: number;
    param: {
      hostypeString: string;
      fullAddress: string;
    };
    hoscode: string;
    hosname: string;
    hostype: string;
    provinceCode: string;
    cityCode: string;
    districtCode: string;
    address: string;
    logoData: string;
    intro: null;
    route: string;
    status: number;
    bookingRule: null;
  };
}

export interface Department {
  depcode: string;
  depname: string;
  children?: Department[];
}

export interface LoginData {
  phone: string;
  code: string;
}

export interface UserInfo {
  name: string;
  token: string;
}

export interface WXLogin {
  redirectUri: string;
  appid: string;
  scope: string;
  state: string;
}
export interface WorkData {
  workDate: string;
  workDateMd: string;
  dayOfWeek: string;
  docCount: number;
  reservedNumber: null;
  availableNumber: number;
  status: number;
}

export interface BaseMap {
  workDateString: string;
  releaseTime: string;
  bigname: string;
  stopTime: string;
  depname: string;
  hosname: string;
}

//代表的是一个医生的数据
export interface Doctor {
  id: string;
  createTime: string;
  updateTime: string;
  isDeleted: string;
  param: {
    dayOfWeek: string;
    depname: string;
    hosname: string;
  };
  hoscode: string;
  depcode: string;
  title: string;
  docname: string;
  skill: string;
  workDate: string;
  workTime: number;
  reservedNumber: number;
  availableNumber: number;
  amount: number;
  status: number;
  hosScheduleId: string;
}

export type BookingScheduleList = WorkData[];

//代表储存科室数组类型
export type DepartmentArr = Department[];

export type DocArr = Doctor[];

// 获取科室接口返回的数据类型
export interface DepartmentResponseData extends ResponseData {
  data: DepartmentArr;
}

//医院详情返回数据ts
export interface HospitalDetail extends ResponseData {
  data: HosPitalDetail;
}

export interface UserLoginResponseData extends ResponseData {
  data: UserInfo;
}

export interface WXLoginResponseData extends ResponseData {
  data: WXLogin;
}

export interface HospitalWordData extends ResponseData {
  data: {
    total: number;
    bookingScheduleList: BookingScheduleList;
    baseMap: BaseMap;
  };
}
//获取医生排班接口返回的数据
export interface DoctorResponseData extends ResponseData {
  data: DocArr;
}

export interface User {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    certificatesTypeString: string;
    contactsCertificatesTypeString: string;
    cityString: null;
    fullAddress: string;
    districtString: null;
    provinceString: null;
  };
  userId: number;
  name: number;
  certificatesType: string;
  certificatesNo: string;
  sex: number;
  birthdate: string;
  phone: string;
  isMarry: number;
  provinceCode: null;
  cityCode: null;
  districtCode: null;
  address: string;
  contactsName: string;
  contactsCertificatesType: string;
  contactsCertificatesNo: string;
  contactsPhone: string;
  isInsure: number;
  cardNo: null;
  status: string;
}
export type UserArr = User[];
export interface UserResponseData extends ResponseData {
  data: UserArr;
}

//获取某一个挂号医生数据详情

export interface DoctorInfoData extends ResponseData {
  data: Doctor;
}
