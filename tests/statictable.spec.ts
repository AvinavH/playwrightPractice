import {test, expect, Locator} from '@playwright/test';

test("static web table", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/"); 
    
    const table: Locator = page.locator("table[name='BookTable'] tbody"); // to locate the table
    await expect(table).toBeVisible(); // to verify the visibility of the table
    const rows:Locator = table.locator("tr"); // to locate the rows in the table
    const rowCount: number = await rows.count(); // to get the count of rows in the table
    const columns: Locator = rows.locator("th"); // to locate the columns in the table
    const columnCount: number = await columns.count();
    await expect(rows).toHaveCount(7); // to verify the count of rows in the table
    console.log("Total number of rows in the table: " + rowCount);
    await expect(columns).toHaveCount(4); // to verify the count of columns in the table
    console.log("Total number of columns in the table: " + columnCount);

    // Read all the data from the table including header row
    for (let i = 0; i < rowCount; i++) {
        const row: Locator = rows.nth(i); // to locate the current row
        const cells: Locator = row.locator("th, td"); // to locate the cells in the current row inluding header and data cells
        //const cells: Locator = row.locator("td"); // to locate the data cells in the current row excluding header cells
        const cellCount: number = await cells.count(); // to get the count of cells in the current row
        for (let j = 0; j < cellCount; j++) {
            console.log(await cells.nth(j).innerText()); // to print the text of each cell in the current row
        }
    }

    // read all the data from the table excluding the header row
    for ( let rowData of await rows.all()) {
        const cells: string[] = await rowData.locator("td").allInnerTexts(); // to locate the cells in the current row inluding header and data cells
    }

    const booksWrittenByMukesh:string[] = [];
    // print the book name where author is "Mukesh"
    for ( let rowData of await rows.all()) {
        const cells: string[] = await rowData.locator("td").allInnerTexts(); // to locate the cells in the current row inluding header and data cells
        if(cells[1].trim() === "Mukesh") {
            console.log("Book name where author is Mukesh: " + cells[0]);
            booksWrittenByMukesh.push(cells[0]);
        }
    }
    expect(booksWrittenByMukesh).toHaveLength(2); // to verify the count of books written by Mukesh

    // Total price of all the books in the table
    let totalPrice: number = 0;
    for ( let rowData of await rows.all()) {
        const cells: string[] = await rowData.locator("td").allInnerTexts(); // to locate the cells in the current row inluding header and data cells
        const price: number = parseFloat(cells[3].trim()); // to get the price of the book and convert it to number
        totalPrice += price; // to add the price of the book to the total price
    }
    console.log("Total price of all the books in the table: " + totalPrice);

})