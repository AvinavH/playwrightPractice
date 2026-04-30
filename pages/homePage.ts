import {Page, Locator} from "@playwright/test";

export class HomePage{

    // define variables for locators - private and readonly
    private readonly page: Page;
    private readonly productListLocator: string;
    private readonly addToCartButton : Locator;
    private readonly cartLink: Locator;

    // constructor
    constructor(page: Page)
    {
        this.page = page;
        this.productListLocator = "div.card h4 a";
        //this.productListLocator = "div.card h4 a";
        this.addToCartButton = this.page.locator("a:has-text('Add to cart')");
        this.cartLink = this.page.locator("a:has-text('Cart')").first();
    }

    // Method to add a product to cart by product name
    async addProductToCart(productName: string)
    {
        const productElements : Locator[] = await this.page.locator(this.productListLocator).all();
        for ( const product of productElements)
        {
            const productText = await product.textContent();
            if (productText === productName)
            {
                await product.click();
                break;
            }
        }

        // handle dialog after clicking add to cart
        this.page.once('dialog', async dialog => {
            if(dialog.message().includes("Product added"))
            {
                await dialog.accept();
            }
        });
        await this.addToCartButton.click();
    }

    // Method to navigate to cart page
    async navigateToCart()
    {
        await this.cartLink.click();
    }
}