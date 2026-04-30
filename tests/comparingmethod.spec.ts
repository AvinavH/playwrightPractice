import {test, expect, Locator} from '@playwright/test';

test("Comparing Methods", async ({page}) => {

    page.goto("https://demowebshop.tricentis.com/");

    const products: Locator = page.locator(".product-title");
    // innerText vs textContent
    console.log(await products.nth(0).innerText()); // returns visible text of the element
    console.log(await products.nth(0).textContent()); // returns complete text content of the element including hidden text and text from child elements");

    const productsCount = await products.count();
    for (let i = 0; i < productsCount; i++) {
        console.log(await products.nth(i).innerText());
    }

    // allTextContents vs allInnerTexts
    console.log(await products.allTextContents()); // returns array of visible text of all the elements
    console.log(await products.allInnerTexts()); // returns array of complete text content of all the elements including hidden text and text from child elements

    // all(): returns array of locators
    const productLocators: Locator[] = await products.all();
    for ( let prod of productLocators)
    {
        console.log(await prod.innerText());
    }
});
