
const { test, expect } = require("@playwright/test");
test('test',() =>{
    let scores=[20,30,21,32,34,30];
    let newscore = scores.filter(score=>score%2==0)
    console.log(newscore);
    
  

// let array = [1,2,3,4,5,6,7,8,9,10];

// const resultArray=array.map((e)=> e*e );
// console.log(resultArray);

//  const arr = array.map((num)=>num+2);
//  console.log(arr);  
//     // for(let i of array)
//     //     {
//     //        let num = i*i;
//     //        console.log(num);
//     //     }
//     const ar = array.reduce((sum)=>sum+2,0);
//     console.log(ar); 
   
   



});






