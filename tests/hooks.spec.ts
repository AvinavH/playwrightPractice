import { test, expect } from '@playwright/test';

test.beforeAll("Before All Hook", async ({ page }) => {
    console.log("This is before all hook");
}); // before all hook will execute only once before all the tests in the file

test.afterAll("After All Hook", async ({ page }) => {
    console.log("This is after all hook");
}); // after all hook will execute only once after all the tests in the file

test.beforeEach("Before Each Hook", async ({ page }) => {
    console.log("This is before each hook");
    await page.goto("https://demowebshop.tricentis.com/");
}); // before each hook will execute before each test in the file. It is used to set up the preconditions for the tests. In this example, we are navigating to the demo web shop website before each test.

test.afterEach("After Each Hook", async ({ page }) => {
    console.log("This is after each hook");
}); // after each hook will execute after each test in the file. It is used to clean up the post conditions for the tests. In this example, we are not doing any cleanup after the tests.

    test("Test 1", async ({page}) => {
       console.log("This is test 1");
    });
    test("Test 2", async ({page}) => {
    console.log("This is test 2");
    });
    test("Test 3", async ({page}) => {
            console.log("This is test 3");
         });
    
    test("Test 4", async ({page}) => {
       console.log("This is test 4");
    });