// two type of css locators:
// 1. CSS selector: tagname[attribute='value']
// 2. CSS id selector: #idvalue
// 3. CSS class selector: .classname
// 4. CSS attribute selector: [attribute='value']
// 5. CSS pseudo-class selector: tagname:pseudo-class
// 6. CSS combinator selector: parent > child, sibling1 + sibling2, sibling1 ~ sibling2
import {test, expect} from '@playwright/test';

test("CSS locators", async ({page}) => {
    await page.goto("https://demowebshop.tricentis.com/");

    await page.locator("#small-searchterms").fill("laptop");
    await page.locator("input[value='Search']").click();
    await expect(page.locator("h2.product-title")).toHaveCount(1);
    await page.waitForTimeout(2000);
});