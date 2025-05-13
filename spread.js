/**
 * ... Spread 展开运算符
 */
const user={name:"张三",age:20};
const other={gender:"男"};
const userClone={...user,...other};//=Object.assign({},user,other)
console.log(userClone);//合并

const arr=["red","green","blue"]
const arrClone=[...arr];//克隆

