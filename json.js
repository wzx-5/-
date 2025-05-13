/**
 * Json序列化和反序列化
 * java：Object<->byte[]
 * js:Object <->JosnString
 * 
 */

const user={name:"张三",age:20}

//序列化：Object->JSOnStrong
const str=JSON.stringify(user)
console.log(user);
console.log(str);

//反序列化:JOSNString->Object,
const obj=JSON.parse(str)
console.log(obj);