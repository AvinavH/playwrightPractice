import {test, expect, chromium} from '@playwright/test';

test("Tabs Handling", async () => {

    const browser = await chromium.launch(); // create browser
    const context = await browser.newContext();
    const parentPage = await context.newPage(); // create a page

    await parentPage.goto("https://testautomationpractice.blogspot.com/");
    await expect(parentPage).toHaveTitle("Test Automation Practice");

    const [childPage] = await Promise.all([context.waitForEvent("page"), parentPage.locator("button:has-text('New Tab')").click()]); // to ensure that the click action and the wait for the new page are executed in parallel
    // await
    //context.waitForEvent("page"); // to catch the new tab/page opening event: pending, fulfilled, rejected  
    //parentPage.locator("button:has-text('New Tab')").click();

    // Approach 1: switch between pages and get titles
    const pages = context.pages(); // to get all the open pages/tabs in the current browser context
    for (const page of pages) {
        let counter : number = 1
        console.log(`Page title ${counter}: ${await page.title()}`);
        counter++;
    }

    //
});

test("Popup Handling", async ({browser}) => {

    //const browser = await chromium.launch(); // create browser
    const context = await browser.newContext();
    const page = await context.newPage(); // create a page

    await page.goto("https://testautomationpractice.blogspot.com/");
    await expect(page).toHaveTitle("Test Automation Practice");

    // Handle multiple popups:

    await Promise.all([page.waitForEvent("popup"), page.locator("#PopUp")]);
    const popups = context.pages(); 
    for(let popup of popups)
    {
        const title = await popup.title();
        if(title.includes("Playwright"))
        {
            await popup.locator(".getStarted_Sjon").click();
            await popup.close();
        }
    }
    
});

test("Authenticated Popup Handling", async ({browser}) => {

    //const browser = await chromium.launch(); // create browser
    const context = await browser.newContext({httpCredentials: {username: 'admin', password: 'admin'}}); // Approach 2
    const page = await context.newPage(); // create a page

    // Syntax to parse the username and password directly to the url
    // http://username:password@domainname
    // http://admin:admin@https://the-internet.herokuapp.com/basic_auth
    // await page.goto("http://admin:admin@https://the-internet.herokuapp.com/basic_auth");
    await page.goto("https://the-internet.herokuapp.com/basic_auth");
    await page.waitForLoadState();

    // Handle multiple popups:

    await Promise.all([page.waitForEvent("popup"), page.locator("#PopUp")]);
    const popups = context.pages(); 
    for(let popup of popups)
    {
        const title = await popup.title();
        if(title.includes("Playwright"))
        {
            await popup.locator(".getStarted_Sjon").click();
            await popup.close();
        }
    }
    
});