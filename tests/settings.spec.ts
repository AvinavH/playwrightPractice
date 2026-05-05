import {test, expect, chromium} from "@playwright/test"

test("browser settings", async () =>
{
    const browser = await chromium.launch({headless: false});

    const context = await browser.newContext(
        {
            viewport: {width: 1200, height: 800}, // to set browser window dimension
            locale: 'en-gb', // to set the website language
            proxy: {server:"http://customproxy.com:3040"}, // to handle proxy servers
            ignoreHTTPSErrors: true // to handle the SSL
        }
    );
    const page = await context.newPage();

    await page.goto("https://www.google.com");
    await page.locator
});