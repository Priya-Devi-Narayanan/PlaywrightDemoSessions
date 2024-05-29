const {test,expect, chromium} = require('@playwright/test');
import * as Constants from "../constants"
const utils = require ("../utils/common");
import { LoginPage } from '../pages/LoginPage';


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
   
    await login.userLogin(process.env.USER, (utils.getDecryptedValue(process.env.PASSWORD)));
    
    test.setTimeout(50000);

   });
