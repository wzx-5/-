/**
 * 数组的复杂操作
 */


const arr=[
    {name:"张三",age:20},
    {name:"李四",age:22},
    {name:"王五",age:21},
];


//foreach遍历
function handler(item,index){
    console.log(`${index}:姓名:${item.name},年龄${item.age}`);
}


arr.forEach((item,index)=>
    console.log(`${index}:姓名:${item.name},年龄${item.age}`));

//查找，给定查找条件
//查找满足条件的第一个
function query(item){
    return item.age>20;
}
arr.find(query);
const findFirst=arr.find((item)=>item.age>20);
console.log(findFirst);

//查找满足条件的所有
const findAll=arr.filter((item)=> item.age>20);
console.log(findAll);

//排序
function comparator(a,b){ //返回number,+;a>b,-:a<b,0:a=b

    return a.age-b.age;
}


arr.sort(comparator);
console.log(arr);
arr.sort((a,b) => b.age-a.age);
console.log(arr);

//映射map [a,b,c]->[a1,b1,c1] 得到新数组
console.log("每个人的年龄加1，得到新数组");
const ArrMap=arr.map((item)=>{
    return Object.assign({},item,{age:item.age+1});
   
});
console.log(ArrMap 


    
);