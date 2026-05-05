import {test, expect} from '@playwright/test';



// tag multiple tags to a test
test('sample test',{tag: ['smoke', 'regression']}, async ({page}) => {
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
});

// tage a single tag to a test
test('sample test 2',{tag: 'regression'}, async ({page}) => {
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
});

/* 
To run tests with specific tags, you can use the --grep option followed by the tag name. For example, to run all tests tagged with "smoke", you would use the following command:
npx playwright test --grep @smoke

To run tests tagged with either "smoke" or "regression", you can use the following command:
npx playwright test --grep @smoke --grep @regression

To run tests that belongs to both "smoke" and "regression" tags, you can use the following command:
npx playwright test --grep @smoke --grep @regression --grep-operator and
*/