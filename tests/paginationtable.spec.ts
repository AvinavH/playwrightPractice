import {expect, test, Locator} from '@playwright/test';

test("Read data from all pages", async ({page}) => {
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");  
    
    let hasNextPage: boolean = true;
    while(hasNextPage)
    {
        const rows: Locator[] = await page.locator("#example>tbody>tr").all(); // to locate the rows in the table
        for ( let row of rows)
        {
            console.log(await row.innerText()); // to print the text of each row in the current page
        }

        const nextButton : Locator = page.locator('button[aria-label="Next"]'); // to locate the next button
        if (await nextButton.isEnabled()) {
            await nextButton.click();
        } else {
            hasNextPage = false;
        }
    }
});

test("Filter the row count from the dropdown", async ({page}) => {
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");  
    const dropdown: Locator = page.locator(".dt-input"); // to locate the dropdown
    await dropdown.selectOption("25"); // to select the option 25 from the dropdown
    const rows: Locator[] = await page.locator("#example>tbody>tr").all();
    await expect(rows).toHaveLength(25); // to verify the count of rows in the table
});

test("search for a specific record", async ({page}) => {
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
    const searchBox: Locator = page.locator("#dt-search-0"); // to locate the search box
    await searchBox.fill("Garrett Winters");
    const rows: Locator[] = await page.locator("#example>tbody>tr").all();
    if(rows.length > 0) {
        let matchingRecordFound: boolean = false;
        for (let row of rows) {
            const rowText: string = await row.innerText();
            if (rowText.includes("Garrett Winters")) {
                console.log("Record found: " + rowText);
                matchingRecordFound = true;
                break;
            }

        }
        await expect(matchingRecordFound).toBeTruthy(); // to verify that the matching record is found
    }
});