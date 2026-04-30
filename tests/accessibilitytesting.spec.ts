// Accsibility testing with Playwright
// install axe-core package to perform accessibility testing
// npm install axe-core
import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Accessibility Test', async ({page}, testInfo) => {

    page.goto("https://demowebshop.tricentis.com/");

    //1. scanning detect all types of WCAG violations

   /* const accessibilityScanResults = await new AxeBuilder({page}).analyze();

    // print the violations in the console
    console.log(accessibilityScanResults.violations);

    // assert that there are no accessibility violations
    expect(accessibilityScanResults.violations.length).toBe(0); */

    
     // Ensure the page is fully loaded and stable before scanning
    await page.waitForLoadState('networkidle');
    // 2. scanning to detect specific WCAG violations
    const accessibilityScanResults = await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa']).analyze();

    await testInfo.attach('accessibility-scan-results', {
        body: JSON.stringify(accessibilityScanResults, null, 2),
        contentType: 'application/json',
    });

    expect(accessibilityScanResults.violations.length).toBe(0);

    // 3. scanning for violations with rules
    const accessibilityScanResults2 = await new AxeBuilder({page}).withRules(['color-contrast']).analyze(); 
    await testInfo.attach('accessibility-scan-results', {
        body: JSON.stringify(accessibilityScanResults, null, 2),
        contentType: 'application/json',
    });
    expect(accessibilityScanResults2.violations.length).toBe(0);
});