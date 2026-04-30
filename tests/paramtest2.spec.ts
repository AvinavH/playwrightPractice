import {test, expect} from '@playwright/test';

const loginTestData: string[][] = [

    ["pavanol", "test@123", "valid"],
    ["pavanol", "test@1234", "invalid"],
    ["pavanol1", "test@123", "invalid"],
];
// using for of loop
test.describe("Login Tests", async() => {
for(const [username, password, expectedResult] of loginTestData)
{
    test(`Login with ${username} and ${password} should be ${expectedResult}`, async ({page}) => {
            await page.goto('https://demoblaze.com/');
            await page.getByRole('link', { name: 'Log in' }).click();
            await page.locator('#loginusername').fill(username);
            await page.locator('#loginpassword').fill(password);
            await page.getByRole('button', { name: 'Log in' }).click();
            if(expectedResult === 'valid')
            {
                await expect(page.getByRole('link', { name: `Welcome ${username}` })).toBeVisible({timeout: 5000});
            }
            else{
                await expect(page.getByRole('link', { name: 'Welcome' })).not.toBeVisible({timeout: 5000});
            }
        });
}
});

// using for each function
test.describe("Login Tests", async() => {
    loginTestData.forEach(([username, password, expectedResult]) => {
        test(`Login with ${username} and ${password} should be ${expectedResult}`, async ({page}) => {
            await page.goto('https://demoblaze.com/');
            await page.getByRole('link', { name: 'Log in' }).click();
            await page.locator('#loginusername').fill(username);
            await page.locator('#loginpassword').fill(password);
            await page.getByRole('button', { name: 'Log in' }).click();
            if(expectedResult === 'valid')
            {
                await expect(page.getByRole('link', { name: `Welcome ${username}` })).toBeVisible({timeout: 5000});
            }
            else{
                await expect(page.getByRole('link', { name: 'Welcome' })).not.toBeVisible({timeout: 5000});
            }
        });
    });
});