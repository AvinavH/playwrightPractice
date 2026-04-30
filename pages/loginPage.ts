import {Page, Locator} from "@playwright/test";

export class LoginPage
{

    // define variables for locators - private and readonly
    private readonly page : Page;
    private readonly loginLink: Locator;
    private readonly usernameInput : Locator;
    private readonly passwordInput : Locator;
    private readonly loginButton : Locator;

    // constructor
    constructor(page: Page)
    {
        this.page = page;
        this.loginLink = this.page.locator("a:has-text('Log in')");
        this.usernameInput = this.page.locator('#loginusername');
        this.passwordInput = this.page.locator('#loginpassword');
        this.loginButton = this.page.locator("button:has-text('Log in')");
    }

    // action methods
    async clickLoginLink()
    {
        await this.loginLink.click();
    }
    async enterUserName(username: string)
    {
        await this.usernameInput.clear();
        await this.usernameInput.fill(username);
    }
    async enterPassword(password: string)
    {
        await this.passwordInput.fill(password);
    }
    async clickLoginButton()
    {
        await this.loginButton.click();
    }

    // simplified method to perform login
    async performLogin(username: string, password: string)
    {
        await this.clickLoginLink();
        await this.enterUserName(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
}