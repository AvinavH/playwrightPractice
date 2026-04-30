import {test, expect, Locator} from '@playwright/test';

test.only("Auto-suggest Dropdown Actions", async ({page}) => {

    await page.goto("https://www.flipkart.com/");
    await page.waitForTimeout(4000);
    await page.locator("input[name='q']:not([readonly])").fill("smart");

    await page.waitForTimeout(4000);
    // get all the options from auto-suggest dropdown ---> ctrl+shift+p on DOM --> emulate focused page
    const options: Locator = page.locator("ul > li");
    const count = await options.count();
    console.log("Total options in auto-suggest dropdown: " + count);
    for (let i = 0; i < count; i++) {
        console.log(await options.nth(i).innerText());
    }
    // select option smartphone option
    for (let i = 0; i < count; i++) {
        const text = await options.nth(i).innerText();
        if (text.trim() === "smartphone") {
            await options.nth(i).click();
            break;
        }
    }
});

test("Auto-suggest Dropdown Actions: Approach 2", async ({page}) => {

    await page.goto("https://www.flipkart.com/");
    await page.waitForTimeout(4000);
    await page.locator("input[name='q']:not([readonly])").fill("smart");

    await page.waitForTimeout(4000);
    // get all the options from auto-suggest dropdown ---> ctrl+shift+p on DOM --> emulate focused page
    const options: Locator = page.locator("ul > li");
    const count = await options.count();
    console.log("Total options in auto-suggest dropdown: " + count);
    for (let i = 0; i < count; i++) {
        console.log(await options.nth(i).innerText());
    }
    // select option smartphone option
    options.filter({hasText: "smartphone"}).first().click();
});