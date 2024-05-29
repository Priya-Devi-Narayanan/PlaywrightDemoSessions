
const { test, expect } = require("@playwright/test");
import * as Constants from "../constants"
let UserResponse;


test("API GETCALL RESPONSE TO VALIDATE STATUS", async ({request}) => {

try {
UserResponse = await request.get(process.env.APIGETCALLURL);
}catch (error) { 
if (error instanceof SyntaxError) {
console.error('There was a SyntaxError', error);
} else {       
console.error('There was an error', error);
}
}

const statuscode = UserResponse.status();
console.log("USER RESPONSE CODE : ",statuscode);
expect.soft(statuscode).toBe(Constants.SUCCESS_STATUSCODE);

const okstatus = UserResponse.ok();
console.log("REQUEST HAS BEEN PROCESSED SUCCESSFULLY ON THE SERVER : ",okstatus);
expect.soft(statuscode).toBeTruthy();

const statusText = UserResponse.statusText();
console.log("USER RESPONSE TEXT : ",statusText);
expect.soft(statusText).toEqual(Constants.SUCCESS_STATUSTEXT);
} 
);



test("API GETCALL TO VALIDATE RESPONSE BODY", async ({request}) => {

try 
{
    UserResponse = await request.get(process.env.APIGETCALLURL);
}catch (error) 
{ 
if(error instanceof SyntaxError) 
{
    console.error('There was a SyntaxError', error);
}else {       
    console.error('There was an error', error);
}
}
       
const UserResponseBody = await UserResponse.json();
console.log("USER RESPONSE BODY : ",UserResponseBody);
       

for(let userValue in UserResponseBody.data) {   
        
    let ID = UserResponseBody.data[userValue].id;
    console.log("ID AT POSITION" + `[${userValue}]`+ " : " , ID);
    expect.soft(ID).not.toBeNull();
    
    let email = UserResponseBody.data[userValue].email;
    console.log("EMAIL AT POSITION" + `[${userValue}]` + " : " ,email);
    expect.soft(email).not.toBeNull();
    
    let fName = UserResponseBody.data[userValue].first_name;
    console.log("FIRST NAME AT POSITION" + `[${userValue}]` + " : " ,fName);
    expect.soft(fName).not.toBeNull();
    
    let LName = UserResponseBody.data[userValue].last_name;
    console.log("LAST NAME AT POSITION" + `[${userValue}]` + " : " ,LName);
    expect.soft(LName).not.toBeNull();
        
    let image = UserResponseBody.data[userValue].avatar;
    console.log("IMAGE AT POSITION" + `[${userValue}]` + " : " ,image);
    expect.soft(image).not.toBeNull();    
    
    console.log('\n');
}
} 
);
