import {test, expect, Locator} from '@playwright/test';

test("Bootstrap Hidden Dropdown Actions", async ({page}) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    // Login Steps
    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await page.getByRole('button', { name: 'Login' }).click();
    // Click on the PIM option
    await page.getByText("PIM").click();

    await page.waitForTimeout(4000);

    await page.locator("form i").nth(2).click(); // click on 3rd dropdown

    //capture all the options from dropdown
    const options: string[] = await page.locator("div[role='listbox'] span").allTextContents();

    const optionsLocators: Locator = await page.locator("div[role='listbox'] span")
    const count = await optionsLocators.count();
    for( let i = 0 ; i < count; i++) {
        if(await optionsLocators.nth(i).innerText() === "Automation Tester") {
            await optionsLocators.nth(i).click();
        }
    }
});