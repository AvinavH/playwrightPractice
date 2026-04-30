import {test, expect} from '@playwright/test';

/* only - to run specific test
   skip - to skip specific test
   tags - to categorize tests and run specific category of tests

   fail - to mark test as expected to fail, so that it doesn't fail the build
   fixme - to mark test as expected to fail, so that it doesn't fail the build and also to indicate that it needs to be fixed
   slow - to mark test as slow, so that it doesn't fail the build and also to indicate that it needs to be optimized
*/
test('Annotations Demo', async ({page}) => {

    await page.goto("https://demowebshop.tricentis.com/");    

});

// Full skip the test
test.skip('This test is skipped', async ({page}) => {

    await page.goto("https://demowebshop.tricentis.com/");
});

// Conditional Skip
test('Annotations Demo with tags', async ({page, browserName}) => {
    // skip based on a condition    
    test.skip(browserName === "chromium", "Skipping test on Chromium browser");
    await page.goto("https://demowebshop.tricentis.com/");  
});

// Mark test as expected to fail
test('This test is expected to fail', async ({page}) => {

    test.fail(true, "This test is expected to fail");
    await page.goto("https://demowebshop.tricentis.com/");
});

// fixme annotation
test.fixme('pending test', async ({page}) =>{
    // Implementation pending
});

// slow annotation
test('Slow Test', async ({page}) => {

    test.slow(true, "This test is slow and needs optimization"); // triple the default timeout i.e 3x30 = 90 seconds
    await page.goto("https://demowebshop.tricentis.com/");
});
