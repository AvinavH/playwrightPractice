import {test, expect} from '@playwright/test';
import fs from 'fs';

const loginTestData: any = JSON.parse(fs.readFileSync('test-data/data.json', 'utf-8'));

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