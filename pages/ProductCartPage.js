const {expect} = require('@playwright/test');
exports.ProductCartPage = class ProductCartPage 
{
constructor(page) 
{
    this.page = page;
    this.cartPageHeader = page.locator("//span[text()='Your Cart']");
    this.checkOutBtn = page.locator("//button[@class='btn btn_action btn_medium checkout_button ']");
    this.continueShopBtn = page.locator("//button[@class='btn btn_secondary back btn_medium']");
    this.cartProducts = page.locator("//div[@class='inventory_item_name']");
}

/** 
 * To validate products added successfully or not
*/
async validateCartProducts(productName) 
{
    const cartList = await this.cartProducts.allTextContents();
    for (let i = 0; i < cartList.length; i++) 
     {
        if (cartList[i].trim() == productName) 
        {
            console.log('\n'+cartList[i].toUpperCase(), " AVAILABLE IN THE CART LIST");
            await expect(cartList[i],`${cartList[i]} is available in the cart list as expected`).toEqual(productName);
            break;
            
        }
    }
}
}
