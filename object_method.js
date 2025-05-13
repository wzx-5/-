/**
*对象方法
*/

const user={
    name:"张三",
    age:20,
    printName:function(){
        console.log(this.name);//this 是对象自身的引用

    },
};
user.printName();//"张三"


user.printInfo=function(){
    console.log(`姓名是: ${this.name} ; 年龄是: ${this.age}`);

};
user.printInfo();


//构造函数:通过new 调用的函数.命名规范：通常首字母是大写
function Dog(name,age){
    //const this={};//new 做的
    this.name=name;
    this.age=age;
    //return  this;//new 做的
}

const dog1=new Dog("大黄",2);
console.log(dog1);
const dog2=Dog("大黄",2);
console.log(dog2);//undefined


//Cannot read properties of undefined(reading 'color')

console.log(dog1.other?.color);//可选链?.,other有可能是undefined
dog1.method?.();//因为dog1可能不存在方法method,有此方法就执行，没有也不会报错