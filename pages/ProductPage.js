exports.ProductPage = class ProductPage

{
constructor(page)
{
    this.page = page;
    this.productHeader = page.getByText('Products');
   // this.productHeader ="//span[contains(text(),'Products')]";
    this.productOpenMenuBtn = page.locator("//button[@id='react-burger-menu-btn']");
    this.productItem = page.locator("div[class='inventory_item_name ']");
    this.productPrice = page.locator("div.inventory_item_price");
    this.productDescription = page.locator("div.inventory_item_desc");
    //this.cartButton = "//div[text()='"+productList[i]+"']/parent::a/parent::div/following-sibling::div/child::button";
    this.productImage = page.locator("//img[@class='inventory_item_img']");
    this.shoppingCartLink = page.locator("//a[@class='shopping_cart_link']");
    this.productFilter = page.locator("select.product_sort_container");
    this.productRemoveBtn = page.locator("//button[@class='btn btn_secondary btn_small btn_inventory ']");
    this.productLogout = page.locator("//a[text()='Logout']");
}
  
/**
 * To return headertext of product page
 */
async getProductPageHeader()
{
	const productPageHeader = await this.productHeader.textContent();
	return productPageHeader;
}

/**
 * To calculate total products in the page
 */
async getProductsList()
{
	const totalProducts = this.productItem;
	const productsCount = totalProducts.count();
	console.log("TOTAL NUMBER OF PRODUCTS IN THE PAGE : " , productsCount);
	return totalProducts;
}   

/**
 * To click shopping cart button
 */
async clickShoppingCartLink()
{
    await this.shoppingCartLink.click();
}

/**
 * To add new proucts into the cart
 */
async addProductsToCart(productName)
{
    const productList = await this.productItem.allTextContents();
    for (let i = 0; i < productList.length;i++)
    {
        if(productList[i].trim() == productName)
        {
            await this.page.locator("//div[text()='"+productList[i]+"']/parent::a/parent::div/following-sibling::div/child::button").click();
            console.log(productList[i].toUpperCase()," ADDED SUCCESSFULLY INTO THE CART");
            break;                 
        }
    }        
}

/**
 * To logout from the application
 */
async userLogout() 
{
await this.productOpenMenuBtn.click();   
await this.productLogout.click();
}
}


    

