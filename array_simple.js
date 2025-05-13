/**
 * 数组的基本操作
 * c、java:相同数据类型的，长度固定的，数据集合
 * JS；任意数据类型的、长度不固定的
 */

const arr1=new Array();//构造函数
const arr2=[];// 数组字面量

//数组是对象
console.log(typeof arr1);  //object
console.log(Array.isArray(arr1));//true,判断是不是数组对象

const arr=["red","green0","blue"];
console.log(arr[0]);
console.log(arr.length);// =索引值+1

//可遍历的iterrable，for ....of 遍历
for(let elem of arr){
    console.log(elem);

}

for(let index=0;index<arr.length;index++){
    console.log(arr[index]);
}

//查找元素
console.log(arr.includes("blue"));//true,是否包含
console.log(arr.indexOf("blue"));//2,>=0找到了

//队列：先进先出
arr.push("balck");//末尾添加  [ 'red', 'green0', 'blue', 'balck' ]
console.log(arr);
let color=arr.shift();//头部移出 [ 'green0', 'blue', 'balck' ]
console.log(color);
console.log(arr);

//栈：先进后出
arr.push("white");//末尾添加[ 'green0', 'blue', 'balck', 'white' ]
console.log(arr);
color=arr.pop();//末尾弹出 [ 'g，。reen0', 'blue', 'balck' ]
console.log(color);
console.log(arr);

arr.unshift("red");//头部添加
//arr.splice
arr.splice(1,2,"white");//['red','white','black']
//反转字符串
arr.reverse();

//取子数组
const subArr=arr.slice(1,3);//['white','black']
console.log(subArr);

//数组拼接，得到新数组
const one=["one"];
const two=["two"];
const concatArr=one.concat(two);
console.log(concatArr);
console.log(concatArr===one);//fasle

//array -> string,将数组元素拼接成字符串
const joinStr =arr.join(":")
console.log(joinStr);//"balck:white:rec"
//string -> array,将字符串按分隔符分离成多个数组元素
console.log(joinStr.split(":"));//['black','white','red00']