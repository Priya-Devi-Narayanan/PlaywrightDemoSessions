const {test,expect} = require('@playwright/test');
import * as Constants from "../constants"
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { ProductCartPage } from '../pages/ProductCartPage';
import fs from 'fs';
const utils = require ("../utils/common");
const testdatapath = 'testdata/productdata.json';
const data = JSON.parse(fs.readFileSync(testdatapath,'utf8'));


test('ADD MULTIPLE PRODUCTS TO THE CART', async ({page}) => {
 
  //Lanch URL
  await page.goto(process.env.URL);
  const login = new LoginPage(page);
  
  //Validate LoginPage Title
  const actpageTitle =  await page.title();
  console.log("SUCCESSFULLY NAVIGATED TO : ",actpageTitle);
  await expect(page).toHaveTitle(Constants.LOGINPAGETITLE);
  
  //Logging In
  await login.userLogin(process.env.USER, (utils.getDecodedPassword(process.env.PASSWORD)));
  const product = new ProductPage(page);

  //Validate ProductPage Header
  const actualProductPageHeader = await product.getProductPageHeader();
  console.log('\n'+"SUCCESSFULLY NAVIGATED TO : " ,actualProductPageHeader);
  await expect(actualProductPageHeader).toEqual(Constants.PRODUCTPAGEHEADER);

  //Validate ProductPage URL
  const actualProductPageUrl = await page.url();
  console.log("PRODUCT PAGE URL IS : ",actualProductPageUrl);
  await expect(page).toHaveURL(Constants.PRODUCTPAGEURL);
  
  //Adding Products to cart
  for (const [key,value] of Object.entries(data))
    {
      console.log('\n'+"USER SELECTION " + `${key}` + " : " + `${value}`);
      await product.addProductsToCart(value);
    }
    await product.clickShoppingCartLink();
    const productCart = new ProductCartPage(page);
    
  //Validating added products
  for (const [key,value] of Object.entries(data))
    {
      await productCart.validateCartProducts(value);
    } 
 });