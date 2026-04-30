import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { CartPage } from '../pages/cartPage';

test('User can add a product to the cart', async ({page})=> {

    // launch the application
    await page.goto('https://demoblaze.com/index.html');

    //create object of the login page
    const loginPage = new LoginPage(page);

    // login to the application
    await loginPage.performLogin('pavanol', 'test@123');

    // create object of the home page
    const homePage = new HomePage(page);

    // add product to the cart
    await homePage.addProductToCart('Samsung galaxy s6');
    homePage.navigateToCart();

    //create object of the cart page
    const cartPage = new CartPage(page);

    // verify the product is added to the cart
    //const isProductAdded = await page.locator("#tbodyid tr td:nth-child(2)").all().then(() => cartPage.isProductAddedToCart('Samsung galaxy s6', page.locator("#tbodyid tr td:nth-child(2)").all()));
    const isProductAdded = await cartPage.isProductAddedToCart('Samsung galaxy s6');
    expect(isProductAdded).toBeTruthy();
})