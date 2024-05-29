exports.LoginPage = class LoginPage
{     
constructor(page)
 {
    this.page = page;
    this.loginHeader = page.getByText('Swag Labs');
    this.userName = page.getByPlaceholder('Username');
    this.password = page.getByPlaceholder('Password');
    this.loginButton = page.locator('#login-button');
    this.loginErrorMsg = page.locator("//div[@class='error-message-container error']/h3");
    this.productHeader = page.getByText('Products');
    //this.productHeader ="//span[contains(text(),'Products')]";
    //this.loginHeader = "//div[@class='login_logo']";
    //this.loginButton = "#login-button";
}

//Returns LoginPage Header
async getLoginPageHeader()
{
	//const loginPageHeader = await this.page.locator(this.loginHeader).textContent();
    const loginPageHeader = await this.loginHeader.textContent();
	return loginPageHeader;
}
    
//Returns LoginPage Title
async getLoginPageTitle()
{
	const loginPageTitle = await this.page.title();
	return loginPageTitle;
}
    
//Returns LoginPage URL
async getLoginPageURL()
{
	const loginPageurl = await this.page.url();
	return loginPageurl;
}

/**
 * To login to the application
 */
async userLogin(userName, password)
{
console.log('\n'+"--------CREDENTIALS--------");
console.log("USERNAME : " + userName);
console.log("PASSWORD : " + process.env.PASSWORD);

await this.userName.fill(userName);
await this.password.fill(password);
//await this.page.fill(this.userName,userName);
//await this.page.fill(this.password,password);
await this.loginButton.click();
const visible = await this.productHeader.isVisible();
if(visible)
{
    console.log("AUTHENTICATION SUCCESSFUL");
}
else{
    console.log("AUTHENTICATION FAILED PLEASE TRY AGAIN");
} 
}
}