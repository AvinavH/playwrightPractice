import {test, expect} from '@playwright/test';

// It will fail first time as there is no baseline sreenshot, then it'll match with the subsequent runs
test('Visual Validation', async ({page}) => {
    await page.goto("https://demowebshop.tricentis.com/");

    //Approach 1: Take a screenshot of the homepage
    expect(await page.screenshot()).toMatchSnapshot("homepage.png");

    // Approach 2: 
    expect(page).toHaveScreenshot("homepage.png");

    // Approach 3: Take a screenshot of a specific element
    const logo = page.getByAltText('Tricentis Demo Web Shop');
    expect(await logo.screenshot()).toMatchSnapshot("logo.png");

});