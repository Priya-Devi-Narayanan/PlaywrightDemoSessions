
const { test } = require('../base/Base.spec.js')


import * as Constants from "../constants.js"
import { getDecryptedValue } from "../utils/common.js";
import { LoginPage } from '../pages/LoginPage.js';
import { ProductPage } from '../pages/ProductPage.js';

//let browsercontext;
//let page;

test.beforeEach(async({loginPage}) =>
    {
       
        //browser = await chromium.launch();
        //browsercontext  = await browser.newContext();
        loginPage = await browser.newPage();
        await loginPage.goto(process.env.URL);
        
    });

test('Login Scenario Test', async () => {
    const browser = await chromium.launch();
    const browsercontext  = await browser.newContext();
    const page = await browsercontext.newPage();
    await page.goto(process.env.URL);
    const login = new LoginPage(page);
    
    const actpageHeader = await login.getLoginPageHeader();
    await expect(actpageHeader).toBe(Constants.LOGINPAGEHEADER);
   
    const actpageTitle =  await page.title();
    console.log("Successfully Navigated to : ",actpageTitle);
    await expect(page).toHaveTitle(Constants.LOGINPAGETITLE);
    
    const actpageURL =  await page.url();
    console.log(actpageURL);
    await expect(page).toHaveURL(process.env.URL);
    
     await login.userLogin(process.env.USER, utils.getDecryptedValue(process.env.PASSWORD));
    
     test.setTimeout(50000);

   });

   

//    test.afterEach(async() =>
//     {
       
//         await browser.close();
        
//     });
