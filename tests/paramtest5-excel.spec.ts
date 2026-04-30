import {test, expect} from '@playwright/test';
import fs from 'fs';
import * as XLSX from 'xlsx';

// Note: You need to install xlsx package to read excel files
// npm install xlsx
// Read test data from Excel file
const loginTestData: any = XLSX.utils.sheet_to_json(XLSX.readFile('test-data/tstdata.xlsx').Sheets['Sheet1'], { header: 1, defval: '' }).slice(1);

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