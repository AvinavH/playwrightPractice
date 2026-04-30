import {test, expect, Locator} from '@playwright/test';

test("Text Input actions", async ({page}) => {
  await page.goto("https://testautomationpractice.blogspot.com/"); 
  const firstNameTextBox: Locator = page.getByPlaceholder("Enter Name");
  await expect(firstNameTextBox).toBeVisible();
  await expect(firstNameTextBox).toBeEnabled();

  const maxLength: string | null = await firstNameTextBox.getAttribute("maxlength");
  expect(maxLength).toBe("15"); // When assertion is applied to any values await does not required because it is not related to any element state. It is related to value of the attribute which is already fetched by getAttribute method and stored in maxLength variable.
  await firstNameTextBox.fill("Hector");
   
  const enteredValue: string = await firstNameTextBox.inputValue();
  expect(enteredValue).toBe("Hector");
  console.log("Value entered in the text box is: " + enteredValue);
  await page.waitForTimeout(2000);
});

test("Radio Button Actions", async ({page}) => {
  await page.goto("https://testautomationpractice.blogspot.com/"); 
  const maleRadio: Locator = page.getByRole('radio', { name: 'Male', exact: true });
  await expect(maleRadio).toBeVisible();
  await expect(maleRadio).toBeEnabled();
  expect(maleRadio.isChecked()).resolves.toBe(false);
  // await expect(maleRadio).toBeChecked({ timeout: 5000 }); // to wait until the radio button is checked for 5 seconds
});

test.only("Checkbox Actions", async ({page}) => {
  await page.goto("https://testautomationpractice.blogspot.com/"); 
  const sundayCheckbox: Locator = page.getByRole('checkbox', { name: 'Sunday', exact: true });      
    await expect(sundayCheckbox).toBeVisible();
    await expect(sundayCheckbox).toBeEnabled();
    expect(sundayCheckbox.isChecked()).resolves.toBe(false);
    await sundayCheckbox.check();
    await expect(sundayCheckbox).toBeChecked();
    await page.waitForTimeout(2000);
    await sundayCheckbox.uncheck();
    await expect(sundayCheckbox).not.toBeChecked();
    await page.waitForTimeout(2000);

    // Select All Checkboxes
     const days: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    // for(let day of days){
    //   const checkbox: Locator = page.getByRole('checkbox', { name: day, exact: true });
    //   await checkbox.check();
    //   await expect(checkbox).toBeChecked();
    // }

    // Alternative approach: using Map Function
    const checkboxes: Locator[] = days.map(index => page.getByRole('checkbox', { name: index, exact: true }));
    for(let checkbox of checkboxes){
      await checkbox.check();
      await expect(checkbox).toBeChecked();
    }
    expect(checkboxes.length).toBe(7);

    // Uncheck last 3 checkboxes and assert
    for (const checkbox of checkboxes.slice(-3)) {
      await checkbox.uncheck();
      await expect(checkbox).not.toBeChecked();
    }

    // toggle checkbox: if it is checked then it will be unchecked and if it is unchecked then it will be checked
    for (let checkbox of checkboxes){
      if(await checkbox.isChecked()){
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
      }
        else{   
        await checkbox.check();
        await expect(checkbox).toBeChecked();
      }
    }

    // Randomly select 3 checkboxes and assert
    const randomIndexes: number[] = [1, 3, 5]; // you can generate random indexes using Math.random() method
    for(let index of randomIndexes){
      const checkbox: Locator = checkboxes[index];
      await checkbox.check();
      await expect(checkbox).toBeChecked();
    }

    // Select the checkbox based on the value of the checkbox
    const valueToSelect: string = "Friday";
    for ( const label of days){
      if(label === valueToSelect){
        const checkbox: Locator = page.getByRole('checkbox', { name: label, exact: true });
        await checkbox.check();
        await expect(checkbox).toBeChecked();
        break; // to exit the loop after selecting the checkbox
      }
    }
});