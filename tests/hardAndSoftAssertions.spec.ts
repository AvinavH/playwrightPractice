import {test, expect} from "@playwright/test"

test("Hard and Soft Asserts", async ({page}) => {

    await page.goto("https://demowebshop.tricentis.com/");

    // Hard Assert
    expect(page).toHaveTitle("Demo Web Shop");

    // Soft Assert
    expect.soft(page).toHaveTitle("Demo Web Shop1");
});