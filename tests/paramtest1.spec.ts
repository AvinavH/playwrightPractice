import {test, expect} from "@playwright/test"

//test data
const searchItems:string[] = ["laptop", "phone", "headphones"];
// using for of loop
for(const item of searchItems)
{
    test(`Search for ${item}`, async ({page}) => {
        await page.goto("https://demowebshop.tricentis.com/");
        await page.locator("#small-searchterms").fill(item);
        await page.locator(".button-1.search-button").click();
        await expect.soft(page.locator(".product-title a").nth(0)).toContainText(item, {ignoreCase: true});
    });
}

// using describe block
test.describe("Search Functionality", async () => {
// using for each function
    searchItems.forEach(item => {
     test(`Search for ${item}`, async ({page}) => {
        await page.goto("https://demowebshop.tricentis.com/");
        await page.locator("#small-searchterms").fill(item);
        await page.locator(".button-1.search-button").click();
        await expect.soft(page.locator(".product-title a").nth(0)).toContainText(item, {ignoreCase: true});
    });
})
})

