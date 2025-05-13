//字符串相关操作

let str="Hello world";//str(strign)

//js可以把string看成是一个"类似数组"的对象
console.log(str.length);
console.log(str.charAt(1));//e
console.log(str[1]);//e

console.log(str.toLocaleLowerCase());//小写，str（string->string）
console.log(str.toLocaleUpperCase());//大写
console.log(" abc ",trim());//"abc",去掉首位空白字符



//查找子串
console.log(str.indexOf("o w"));//4,>=0 表示找到了
console.log(str.lastIndexOf("l"));//9;
console.log(str.includes("He"));//true,是否包含
console.log(str.startsWith("He"));//true,是否以...开头
console.log(str.endsWith("ld"));//结尾

//获取字串
console.log(str.substring(4,7));//[start,end-1],  字串的长度:end-start'
