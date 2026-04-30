import {test, expect} from '@playwright/test';
import fs from 'fs';
import {parse} from 'csv-parse/sync';

// Note: You need to install csv-parse package to read CSV files
// npm install csv-parse
// Read test data from CSV file 
const loginTestData: any = parse(fs.readFileSync('test-data/tstdata.csv', 'utf-8'), { columns: true , skip_empty_lines: true}).map((row: any) => [row.email, row.password, row.validity]);

test.describe("Login Tests", async() => {
    loginTestData.forEach(([email, password, validity]: [string, string, string]) => {
        test(`Login with ${email} and ${password} should be ${validity}`, async ({page}) => {
            await page.goto('https://demoblaze.com/');
            await page.getByRole('link', { name: 'Log in' }).click();
            await page.locator('#loginusername').fill(email);
            await page.locator('#loginpassword').fill(password);
            await page.getByRole('button', { name: 'Log in' }).click();
            if(validity === 'valid')
            {
                await expect(page.getByRole('link', { name: `Welcome ${email}` })).toBeVisible({timeout: 5000});
            }
            else{
                await expect(page.getByRole('link', { name: 'Welcome' })).not.toBeVisible({timeout: 5000});
            }
        });
    });
});