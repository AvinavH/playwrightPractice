import {Page, Locator} from "@playwright/test";
import { stringify } from "querystring";

export class CartPage
{
    private readonly page: Page;
    private readonly productNamesInCart: string;

    constructor(page: Page)
    {
        this.page = page;
        this.productNamesInCart = "#tbodyid tr td:nth-child(2)";
    }

    //Method to check the product is added to cart
   /* async isProductAddedToCart(productName: string, productNamesInCart: Promise<Array<Locator>>): Promise<boolean>
    {
        //await this.page.waitForLoadState('domcontentloaded');
        //this.page.waitForTimeout(5000);
        const productElements = await productNamesInCart; 
        for(const products of productElements)
        {
            const productText =(products.innerHTML).toString().trim();
            if(productText == productName)
            {
                return true;
            }
        }
        return false;
    } */
   async isProductAddedToCart(productName: string): Promise<boolean>
   {
    await this.page.waitForLoadState('domcontentloaded');
    const productElements: Locator[] = await this.page.locator(this.productNamesInCart).all();
        for(const products of productElements)
        {
            const productText =(await products.innerText()).toString().trim();
            if(productText == productName)
            {
                return true;
            }
        }
        return false;
   }
}