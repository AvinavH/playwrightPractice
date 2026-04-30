import {test, expect, Locator} from '@playwright/test';

test("Verify Chrome CPU Load", async ({page}) => {
    await page.goto("https://practice.expandtesting.com/dynamic-table");

    const table: Locator = page.locator("table.table>tbody");
    await expect(table).toBeVisible();

    // step 1 get the value of CPU load for Chrome browser

    const totalRows: Locator[] = await table.locator("tr").all();
    let cpuLoad: number = 0;
    for (let row of totalRows) {

        const processName: string = await row.locator("td").first().innerText();
        if (processName.trim() === "Chrome") {
            cpuLoad =  parseFloat((await row.locator('td:has-text("%")').innerText()).replace("%", "").trim());
            break;
        }
    }

    // Step 2: compare value with the yellow label
    const yellowLabelCpuLoad: number = parseFloat((await (page.locator("#chrome-cpu").innerText())).split(":")[1].replace("%", "").trim());

    // Step 3: assert that the values are equal
    await expect(cpuLoad).toBe(yellowLabelCpuLoad);

});