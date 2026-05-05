import {test, expect, Locator} from "@playwright/test";

test("shadow dom", async ({page}) => {

    page.goto("https://books-pwakit.appspot.com/");

    await page.locator("#input").fill("Da Vinci Code");
    await page.keyboard.press('Enter');
    await page.waitForTimeout(5000);

    const booksFound : Locator[] = await page.locator("h2.title").all();

    expect(booksFound.length).toBe(20);

})