/**
 * 对象编程基础
 */

//创建对象
const obj1=new Object();//构造函数
const obj2={};//对象字面量


const user={
    name:"张山", //key:value
    age:20,
    other:{
        color:"white",
    },
};

//访问属性：.访问符

user.age=21;
console.log(user);

//添加属性
user.school="zsc";
console.log(user);

//删除属性
delete user.school;

//[]访问符,可以将变量形式的属性名放到[]里
user["is Admin"]=true;
console.log(user);
let propName="name";
console.log(user[propName]);//user.name
propName="age";
console.log(user[propName]);//user.age

// for...in 遍历对象的属性名（key）

for (let key in user){
console.log(key + ":" +user[key]); //"",'',``
console.log(`${key}:${user[key]}`);//模式字符串
}



//user变量只是对象的引用，并不是对象本身
let user1=user;//并没有创建user本身
user1.age=40;
console.log(user.age);;


const dog={
    name:"大黄",
    age:20,
};
const dog1=dog;
dog1.age=3;
console.log(dog.age);

//创建对象的副本
//方案1，for...in
const dog2={};
for (let key in dog){
    dog2[key]=dog[key];
}
dog2.age=4;
console.log(dog.age);//没有变为4
//方案2，Object.assign(dest,src)
const dog3=Object.assign({},dog);
dog3.age=4;
console.log(dog.age);//没有变为4
