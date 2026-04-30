import {test, expect, Locator} from '@playwright/test';

test("Multi Select Dropdown Actions", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");  
    
    // select using visible text
    await page.locator("#colors").selectOption(['Red', 'Green', 'Yellow']);

    // select by Value attribute
    await page.locator("#colors").selectOption([{value: 'red'}, {value: 'green'}, {value: 'yellow'}]);

    // Select by index
    await page.locator("#colors").selectOption([{index: 1}, {index: 2}, {index: 3}]);

    const options: Locator = page.locator("#colors > option");
    await expect(options).toHaveCount(4);

    // check if dropdown has option with value "yellow"
    const optionText: string[] = (await options.allTextContents()).map(text => text.trim());
    expect(optionText).toContain("Yellow");

});

test("Validate Dropdown options are sorted in ascending order", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");  
    const options: Locator = page.locator("#animals > option");
    const optionText: string[] = (await options.allTextContents()).map(text => text.trim());
    const sortedOptionText: string[] = [...optionText].sort();
    expect(optionText).toEqual(sortedOptionText);

});

test.only("Duplicate detection in dropdown options", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");  
    const options: Locator = page.locator("#colors > option");
    const optionText: string[] = (await options.allTextContents()).map(text => text.trim());
    const uniqueOptionText: Set<string> = new Set(optionText);
    expect(uniqueOptionText.size).toBe(optionText.length);
});