const {test,expect, chromium} = require('@playwright/test');
import { LoginPage } from '../pages/LoginPage';
//fs is used to read data and write data from the file
import fs from 'fs';
//import {MultipleLoginData} from '../tests/testdata/usertestdata.json';
const testdatapath = 'testdata/userdata.json';
const testData = JSON.parse(fs.readFileSync(testdatapath,'utf8'))

// test.beforeEach('Launch Application', async() =>
//     {
       
//         const browser = await chromium.launch();
//         const browsercontext  = await browser.newContext();
//         const page = await browsercontext.newPage();
//         await page.goto(process.env.URL);
        
//     })
//async-await - modern way of handling the ayschrnous steps
//mainly it is used with promises only
//async is a kind of keyword tells that this function is asynchronous and it will always return the promise
//Await Keyword is used only in Async Functions to wait for promise.
//in normal function we cannot write await
//
for (const user of testData)
    {
        test(`Login with different user ${user.UserName}`, async()=>
            {
        const browser = await chromium.launch();
        const browsercontext  = await browser.newContext();
        const page = await browsercontext.newPage();
        await page.goto(process.env.URL);
        const login = new LoginPage(page);
        
        await login.userLogin(user.UserName, user.Password);
        }  ); 
    }

// test.afterEach('Tear down Test', async({browser}) =>
// {
           
// await browser.close();
            
// })