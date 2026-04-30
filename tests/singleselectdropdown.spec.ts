import {test, expect, Locator} from '@playwright/test';

test("Single Select Dropdown Actions", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    // select option using visible text
    const dropdown: Locator = page.locator("#country");
    // await dropdown.selectOption("India");
    // await expect(dropdown).toHaveValue("india");
    // await page.waitForTimeout(2000);

    // select option using value attribute
    // await dropdown.selectOption({value: "uk"});
    // await expect(dropdown).toHaveValue("uk");
    // await page.waitForTimeout(2000);

    // select option using label attribute
    // await dropdown.selectOption({label: "Albania"});
    // await expect(dropdown).toHaveValue("Albania");
    // await page.waitForTimeout(2000);

    // select option using index
    // await dropdown.selectOption({index: 3});
    // await expect(dropdown).toHaveValue("Australia");
    // await page.waitForTimeout(2000);

    const options: Locator = page.locator("#country > option");
    await expect(options).toHaveCount(10);

    // check if dropdown has option with value "usa"
    const optionText: string[] = (await options.allTextContents()).map(text => text.trim());
    await expect(optionText).toContain("Japan");
});