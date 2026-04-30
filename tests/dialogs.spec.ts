// alert(), confirm(), prompt() are the three types of dialogs in JavaScript.
// alert() - displays a message and an OK button.
// confirm() - displays a message and OK and Cancel buttons. Returns true if the user clicks OK, and false if the user clicks Cancel.
// prompt() - displays a message, an input field, and OK and Cancel buttons. Returns the input value if the user clicks OK, and null if the user clicks Cancel.

import {expect, test, Locator} from '@playwright/test';

test("Simple dialogs", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    // Handle alert dialog
    page.on("dialog", async (dialog) => {
        console.log("Dialog type: " + dialog.type());
        expect(dialog.type()).toBe("alert");
        console.log("Dialog message: " + dialog.message());
        await dialog.accept();
    });
    await page.locator("#alert").click();
});

test("Confirm dialogs", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    // Handle confirm dialog
    page.on("dialog", async (dialog) => {
        console.log("Dialog type: " + dialog.type());
        expect(dialog.type()).toBe("confirm");
        console.log("Dialog message: " + dialog.message());
        await dialog.accept(); // to click on OK button
        // await dialog.dismiss(); // to click on Cancel button
    });
    await page.locator("#confirm").click();
});

test("Prompt dialogs", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    // Handle prompt dialog
    page.on("dialog", async (dialog) => {
        console.log("Dialog type: " + dialog.type());
        expect(dialog.type()).toBe("prompt");
        expect(dialog.defaultValue()).toContain("Automation Testing");
        console.log("Dialog message: " + dialog.message());
        await dialog.accept('Automation Testing'); // to click on OK button
        // await dialog.dismiss(); // to click on Cancel button
    });
    await page.locator("#prompt").click();
});