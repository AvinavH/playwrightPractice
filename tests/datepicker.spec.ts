import {test, expect, Locator, Page} from '@playwright/test';

async function selectDate(page: Page, year: string, month: string, day: string) {

    while(true)
    {
    const currentYear: string = await page.locator(".ui-datepicker-year").textContent() ?? "";
    const currentMonth: string = await page.locator(".ui-datepicker-month").textContent() ?? "";
    if(currentYear === year && currentMonth === month){
        break;
    }

    const nextButton: Locator = page.locator(".ui-datepicker-next");
    const prevButton: Locator = page.locator(".ui-datepicker-prev");
    // Future Date: click on next button
    if (parseInt(currentYear) < parseInt(year) || (currentYear === year && new Date(Date.parse(currentMonth +" 1, " + year)).getMonth() < new Date(Date.parse(month +" 1, " + year)).getMonth())) {
        await nextButton.click();
    } 
    // Past Date: click on prev button 
    else {
        await prevButton.click();
    }
}
    // select the day
    const dayButton: Locator = page.locator(`td[data-handler='selectDay'] a[data-date='${day}']`);
    await dayButton.click();
    
}

test("jQuery Datepicker", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const dateInput: Locator = page.locator("#datepicker");
    await expect(dateInput).toBeVisible();

    // using fill() method to enter date in the input field
    //await dateInput.fill("10/10/2024");
    await dateInput.click();

    // target date
    const year: string = "2024";
    const month: string = "October";
    const day: string = "10";

    await selectDate(page, year, month, day);

    // assertion
    await expect(dateInput).toHaveValue("10/10/2024");

    await page.waitForTimeout(2000);

    

});

test("Bootstrap Datepicker", async ({page}) => {

    page.goto("https://www.booking.com/?chal_t=1773490419155&force_referer=");

    await page.locator("button[data-testid='searchbox-dates-container']").click();

    const checkInDate: string = "2024-10-10";
    const checkOutDate: string = "2024-10-15";

    const NextButton: Locator = page.locator("button[aria-label='Next month']");
    const currentMonthYear: string = await page.locator("div[data-testid='searchbox-datepicker-calendar'] h3").first().textContent() ?? "";
    const currentMonth: string = currentMonthYear.split(" ")[0].trim();
    const currentYear: string = currentMonthYear.split(" ")[1].trim();
    while(true)
    {
        const checkInDateYear: string = Date.parse(checkInDate) ? new Date(checkInDate).getFullYear().toString() : "";
        const checkInDateMonth: string = Date.parse(checkInDate) ? new Date(checkInDate).toLocaleString('default', { month: 'long' }) : "";
        if(currentYear === checkInDateYear && currentMonth === checkInDateMonth){
            break;
        }
        await NextButton.click();
    }
    const checkInDateDay: string = Date.parse(checkInDate) ? new Date(checkInDate).getDate().toString() : "";
    page.locator(`td[data-date='${checkInDateDay}']`).click();
    page.locator(`td[data-date='${checkOutDate}']`).click();
    

});