/**
 * 和number相关的操作
 */
//int ->java.lang.Integer

console.log((10.01).toString());//10.01(number)->Number

console.log(Math.floor(4.5));//4，取下整
console.log(Math.ceil(4.5));//5，取上整
console.log(Math.round(4.5));//5,四舍五入
console.log(Math.max(1,2,3));//3,最大值
console.log(Math.min(1,2,3));//1,最小值

//生成随机数[0，1)
let num=Math.random();//num(number)
console.log(num);
console.log(num.toFixed(2));//固定小数为 num(number->Number)

//string->number
console.log(globalThis.parseInt("12.3"));//12,gloabalThis全局对象方法
console.log(parseFloat("12.3"));//12.3

num=Number("12.3px");//NaN,具有粘性，不和任何值相等
console.log(num);
console.log(num===NaN);//false
console.log(isNaN(num));//true