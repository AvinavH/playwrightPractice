import {test, expect} from '@playwright/test';

test.describe.configure({mode: "serial"}); // to make the execution serial
test.describe.configure({mode: "parallel"}); // to make the execution parallel, generally not required as the global setting is set as parallel

test('Test 1', async ({page}) => {
    await page.goto("https://www.google.com/");
    await expect(page).toHaveTitle("Google");
});

test('Test 2', async ({page}) => {
    await page.goto("https://www.github.com/");
    await expect(page).toHaveTitle("GitHub: Where the world builds software · GitHub");
});


