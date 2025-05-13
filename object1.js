/**
 * 内置对象 Object
 */
const user={name:"张三",age:20};

const keys=Object.keys(user);//数组
console.log(keys);//['nmae','age']

const values=Object.values(user);//数组
console.log(values);

const entries=Object.entries(user);//二维数组
console.log(entries);//二维数组

const prices={
    banana:1,
    apple:2,
};

//让价格翻倍，得到新对象
console.log(Object.entries(prices));;//[['banana',1],['apple',2]]->[['banna',2],['apple',4]]
const newEntries=Object.entries(prices).map((itme)=>{
    return [itme[0],itme[1]*2];
});
console.log(newEntries);

//array->object
const newPrices=Object.fromEntries(newEntries);
console.log(newPrices);