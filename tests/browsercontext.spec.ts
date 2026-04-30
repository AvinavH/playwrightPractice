import {test, expect, chromium} from '@playwright/test';

test("Browser Context", async () => {

    const browser = await chromium.launch(); // create browser
    const context = await browser.newContext(); // create context
    const page1 = await context.newPage(); // create a page
    const page2 = await context.newPage(); // create another page

    await page1.goto("https://www.google.com/");
    await expect(page1).toHaveTitle("Google");
    await page2.goto("https://www.bing.com/");
    await expect(page2).toHaveTitle("Bing");
});