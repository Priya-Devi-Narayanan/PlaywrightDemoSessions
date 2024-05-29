const {test,expect, chromium} = require('@playwright/test');
import * as Constants from "../constants"
const utils = require ("../utils/common");
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { ProductCartPage } from '../pages/ProductCartPage';
import fs from 'fs';

const testdatapath = 'testdata/productdata.json';
const Data = JSON.parse(fs.readFileSync(testdatapath,'utf8'));


test('Add Multiple Products Test', async () => {
  const browser = await chromium.launch();
  const browsercontext  = await browser.newContext();
  const page = await browsercontext.newPage();
  
  await page.goto(process.env.URL);
  const login = new LoginPage(page);
  

 
  //Validate LoginPage Header
  const actpageHeader = await login.getLoginPageHeader();
  console.log("LOGIN PAGE HEADER IS : ",actpageHeader);
  await expect(actpageHeader).toEqual(Constants.LOGINPAGEHEADER);

  
  const actpageTitle =  await page.title();
  console.log("Successfully Navigated to : ",actpageTitle);
  await expect(page).toHaveTitle(Constants.LOGINPAGETITLE);
  
  const actpageURL =  await page.url();
  console.log("Successfully Navigated to : " ,actpageURL);
  await expect(page).toHaveURl(process.env.URL);
  
  await login.userLogin(process.env.USER, (utils.getDecryptedValue(process.env.PASSWORD)));
  const product = new ProductPage(page);

  const actualProductPageUrl = await page.url();
  console.log(actualProductPageUrl);
  await expect(page).toHaveURL(Constants.PRODUCTPAGEURL);

  const actualProductPageHeader = await product.getProductPageHeader();
  await expect(actualProductPageHeader).toEqual(Constants.PRODUCTPAGEHEADER);
  
  for (const [key,value] of Object.entries(Data))
    {
      await product.addProductsToCart(value);
    }
    const productcart = new ProductCartPage(page);

    await product.clickShoppingCartLink();
    

  for (const [key,value] of Object.entries(Data))
    {
      
      const productName = await productcart.validateCartProducts(value);
      expect(productName).toEqual(value);
    }
    
 });

