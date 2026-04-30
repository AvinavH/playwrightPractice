import {test, expect} from "@playwright/test"
import fs from 'fs';

test("Upload Single File", async ({page}) => 
{
    await page.goto("https://testautomationpractice.blogspot.com/");

    await page.locator('#singleFileInput').setInputFiles('uploads/text.txt');
    await page.locator("button:has-text('Upload Single File')").click();
    expect(await page.locator('p#singleFileStatus').textContent()).toContain("text.txt");
});

test("Upload Multiple Files", async ({page}) => 
{
    await page.goto("https://testautomationpractice.blogspot.com/");

    await page.locator('#multipleFilesInput').setInputFiles(['uploads/text.txt', 'uploads/Day23-Lab.pdf']);
    await page.locator("button:has-text('Upload Multiple Files')").click();
    expect(await page.locator('p#MultipleFileStatus').textContent()).toContain("text.txt");
    expect(await page.locator('p#MultipleFileStatus').textContent()).toContain("Day23-Lab.pdf");
});
test("Upload Multiple Files", async ({page}) => 
{
    await page.goto("https://testautomationpractice.blogspot.com/");

    await page.locator('#multipleFilesInput').setInputFiles(['uploads/text.txt', 'uploads/Day23-Lab.pdf']);
    await page.locator("button:has-text('Upload Multiple Files')").click();
    expect(await page.locator('p#MultipleFileStatus').textContent()).toContain("text.txt");
    expect(await page.locator('p#MultipleFileStatus').textContent()).toContain("Day23-Lab.pdf");
});
test("download Text file", async ({page}) => 
{
    await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html");
    await page.locator("textarea#inputText").fill("Welcome to the world!");
    await page.locator("button#generateTxt").click();

    // Event Handle the Download event : to ensure the playwright is ready to catch the event simultaneously while clicking on the button
    const [download] = await Promise.all([page.waitForEvent('download'), page.locator("a#txtDownloadLink").click()]);

    // save the file to custom path
    const downloadPath = 'downloads/testfile.txt';
    await download.saveAs(downloadPath);
    await page.waitForTimeout(5000);

    // Check if file exists in the path
    const fileExists = fs.existsSync(downloadPath);
    expect(fileExists).toBeTruthy();

    // cleanup downloaded files
    if(fileExists)
    {
        fs.unlinkSync(downloadPath);
    }
    await page.waitForTimeout(5000);
});

test("download PDF file", async ({page}) => 
{
    await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html");
    await page.locator("textarea#inputText").fill("Welcome to the world!");
    await page.locator("button#generatePdf").click();

    // Event Handle the Download event : to ensure the playwright is ready to catch the event simultaneously while clicking on the button
    const [download] = await Promise.all([page.waitForEvent('download'), page.locator("a#pdfDownloadLink").click()]);

    // save the file to custom path
    const downloadPath = 'downloads/testfile.pdf';
    await download.saveAs(downloadPath);
    await page.waitForTimeout(5000);

    // Check if file exists in the path
    const fileExists = fs.existsSync(downloadPath);
    expect(fileExists).toBeTruthy();

    // cleanup downloaded files
    if(fileExists)
    {
        fs.unlinkSync(downloadPath);
    }
    await page.waitForTimeout(5000);
});

