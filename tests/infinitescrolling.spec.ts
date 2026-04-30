import {test, expect} from '@playwright/test'

test("Infinite Scroll", async ({page}) => {
    
    test.slow(); // set time specific to the test, triples the default time to load: 90 sec (3 X 30 sec)
    await page.goto("https://www.booksbykilo.in/new-books?pricerange=201to500");

    //window.scrollTo(0, document.body.scrollHeight); // directly scroll to the end
    let previousHeight = 0;
    while(true)
    {
        // scroll down the page
        await page.evaluate(() =>  {
            window.scrollTo(0, document.body.scrollHeight);
        })

        // Wait for new content to load
        await page.waitForTimeout(2000);

        // capture the current height of the page
        const currentHeight = await page.evaluate( () => {
            return document.body.scrollHeight;
        })

        // exit criteria
        if(currentHeight == previousHeight)
        {
            break;
        }
        previousHeight = currentHeight;
    }
    

});

test("Infinite Scroll: Find a particular book", async ({page}) => {
    
    test.slow(); // set time specific to the test, triples the default time to load: 90 sec (3 X 30 sec)
    await page.goto("https://www.booksbykilo.in/new-books?pricerange=201to500");

    //window.scrollTo(0, document.body.scrollHeight); // directly scroll to the end
    let previousHeight = 0;
    let bookFound = false;
    while(true)
    {
        const titles = await page.locator("div#divItemCard h3").allTextContents();

        if(titles.includes('The Blue Eye'))
        {
            console.log("Book Found!");
            bookFound = true;
            expect(bookFound).toBeTruthy();
            break;
        }

        // scroll down the page
        await page.evaluate(() =>  {
            window.scrollTo(0, document.body.scrollHeight);
        })

        // Wait for new content to load
        await page.waitForTimeout(2000);

        // capture the current height of the page
        const currentHeight = await page.evaluate( () => {
            return document.body.scrollHeight;
        })

        // exit criteria
        if(currentHeight == previousHeight)
        {
            break;
        }
        previousHeight = currentHeight;
    }

    if(!bookFound)
    {
        console.log("Book Not Found!");
    }
    

});