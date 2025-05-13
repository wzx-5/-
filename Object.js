
      // 练习1
      function createObject() {
        // 1.	创建一个空的对象 user。
        const user={};
        // 2.	为这个对象增加一个属性，键是 name，值是 John。
          user.name="John";
        // 3.	再增加一个属性，键是 username，值是 Smith。
        user.username="Smith";
        // 4.	把键为 name 的属性的值改成 Pete。
        user.name="Pete";
        // 5.	删除这个对象中键为 name 的属性。
         delete user.name;
      

        console.log(user);
       
      }
      createObject(); // 等同于 window.createObject();

      // 练习2
      function sumSalary() {
        let salaries = {
          John: 100,
          Ann: 160,
          Pete: 130,
        };
        // 写一段代码遍历salaries对象，以求出工资总和，将计算结果保存到变量sum。
       
        for (let key in salaries){
          let sum=0;
         sum=salaries[key]+sum;
          return sum;
        };
        console.log(sum);
      }
      sumSalary(); // 等同于 window.sumSalary();

      // 练习3
      const calculator = {
        a: 0,
        b: 0,
        // 定义方法setValue(a, b)，将方法参数a，b的值赋给对象属性a，b。
          setValue:function(a,b) {
            this.a=a;
            this.b=b
          },

  
        // 定义方法sum()，返回对象属性a，b的和。
       sum:function(){
        return this.a+this.b;
       },

       
        // 定义方法mul()，返回对象属性a，b的积。
       mul:function(){
        return this.a*this.b;
       },

      
      };
      console.log(calculator.sum());
      calculator.setValue(10, 10);
      console.log(calculator.mul());

      // 练习4
      function User(name) {
        this.name = name;
        this.sayHi = function () {
          console.log("My name is: " + this.name);
        };
      }
      // 使用new关键字，调用构造方法User，创建User对象peter，name为'Peter'
        const peter=new User('Peter');
      // 调用peter对象的sayHi方法
      peter.sayHi();

      // 练习5
      function deepCCopy(target,source){
        for (let key in source){
          
          let item=source[key];
          if(item instanceof Array){
            target[key]=[];
            deepCCopy(target[key],item);
          }else if(item instanceof Object){
            target[key]={};
            deepCCopy(target[key],item);

          }else {
            //简单数据类型,直接赋值
            target[key]=item;
          }

        }
      }
      let obj1={
        name:"zhangsan",
        age:20,
        info:{
          desc:"student",
        },
        color:["red","blued","green"],
      };
      let obj2={};
      Object.assign(obj2,obj1);
      let obj3={};
      deepCCopy(obj3,obj1);
      obj1.info.desc="teacher";
      console.log(obj2.info.desc);
      console.log(obj3.info.desc);
