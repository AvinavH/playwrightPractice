import {test, expect} from "@playwright/test"

test("Keyboard actions", async ({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/");
    
    const inputBox1 = await page.locator("#input1");
    // focus on the input box
    await inputBox1.focus();
    // provide the text in input 1/
    await page.keyboard.insertText("welcome");
    // Select the text 
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');

    // alternative 
    await page.keyboard.press('Control+A');
    // Copy the text
    await page.keyboard.down('Control');
    await page.keyboard.press('C');
    await page.keyboard.up('Control');

    //alternative
    await page.keyboard.press('Control+C');
    // shift control to other input box
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    // paste the text
    await page.keyboard.down('Control');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');
    //alternative
    await page.keyboard.press('Control+V');
});