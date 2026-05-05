import {test, expect} from "@playwright/test"

test('Screenshots Demo', async ({page}) => {

    await page.goto("https://demowebshop.tricentis.com/");
    const timestamp = Date.now();
    // page screenshot
    await page.screenshot({path: 'screenshots/'+'homepage'+timestamp+'.png'});

    // full page screenshot
    await page.screenshot({path: 'screenshots/'+'homepage'+timestamp+'.png', fullPage: true})

    // element specific screenshot
    const logo = page.getByAltText('Tricentis Demo Web Shop');
    logo.screenshot({path: 'screenshots/'+'homepage'+timestamp+'.png'})

})