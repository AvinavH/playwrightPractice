import {test, expect} from '@playwright/test';

// fixure : global variable: page and browser
test('should have title', async ({page}) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  let title: string = await page.title();
  console.log("Title of the page is: " + title);
  await expect(page).toHaveTitle("Automation Testing Practice");
});