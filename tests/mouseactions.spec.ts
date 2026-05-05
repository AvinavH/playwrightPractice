import {test, expect} from "@playwright/test"

test("Mouse Hover", async ({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/");
    const pointme = page.locator('.dropbtn');

    await pointme.hover();

    const laptops = page.locator(".dropdown-content a:nth-child(2)");
    laptops.click();

});

test("Right Click", async ({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/");
    const button = page.locator('.dropbtn');

    await button.click({button:'right'});

    const laptops = page.locator(".dropdown-content a:nth-child(2)");
    laptops.click();

});

test("Double Click", async ({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/");
    const copyTextbutton = page.locator("button:has-text('Copy Text')");

    await copyTextbutton.dblclick();

    const laptops = page.locator(".dropdown-content a:nth-child(2)");
    laptops.click();

});

test("Drag and Drop Feature", async ({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/");
    const rome = page.locator("#box6");
    const washinton = page.locator("#box3");
    const italy = page.locator("#box106");
    const usa = page.locator("#box103");
    
    // Approach 1: Mouse hover , mouse down , navigate to italy and release
    await rome.hover();
    await page.mouse.down();
    await italy.hover();
    await page.mouse.up();

    // Approach 2 : using a direct function/method
    await washinton.dragTo(usa);


});
