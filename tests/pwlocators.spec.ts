import {test, expect, Locator} from '@playwright/test';

test("Playwright locators", async ({page}) => {
  await page.goto("https://demo.nopcommerce.com/");  

  // Get by alt text:: image type of element
  let logo: Locator = page.getByAltText("nopCommerce demo store");
  await expect(logo).toBeVisible();

  // Get by text:: accepts full text or partial text or regular expression: Non-interactive element
  //await expect(page.getByText("Welcome to our store")).toBeVisible();
  await expect(page.getByText(/Welcome\s+To\s+our\s+Store/i)).toBeVisible(); // regular expression
  // Get by role : to locate by implicit and explicit accessibility attributes: interactive element
  await page.getByRole("link", {name: "Register"}).click();
  //await expect(page.getByRole("heading", {name: "Register"})).toBeVisible();
  // Get by label: to locate form elements
    await page.getByLabel("First name:").fill("Hector");
    await page.getByLabel("Last name:").fill("Baldwin");
    await page.getByLabel("Email:").fill("hector.baldwin@abc.com");
    await page.getByPlaceholder("Search store").fill("Apple MacBook Pro 13-inch");
  // Get by TestID: to locate any element by using custom attribute: data-automation-id
    //await page.getByTestId("search-input").fill("Apple MacBook Pro 13-inch");  
});