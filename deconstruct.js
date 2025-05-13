/**
 * 解构赋值
 */

const user={name:"张三",age:20};

//将一个对象的键值对解开，将多个值赋给多个变量
const{name,age}=user;
//const name=user.name;
//const age=user.age;

console.log(name);
console.log(age);

const arr=["red","green0","blue"];
const [RED,HREEN,BLUE]=arr;
console.log(BLUE);

function f1(titel="Untitled",width=200,height=200){
    console.log(`${titel}:${width}:${height}`);
}
f1("hello",400);
function f2({titel="Untitled",width=200,height=200}){
    console.log(`${titel}:${width}:${height}`);
}
f2({width:400});