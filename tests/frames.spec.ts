import {test, expect, Locator} from '@playwright/test';

test("Handling Frames", async ({page}) => {
    await page.goto("https://ui.vision/demo/iframes");
    // switch to frame using name or id attribute

    const frames = page.frames();
    console.log("Total frames in the page: " + frames.length);

    const frame = page.frame({url: 'https://docs.google.com/forms/d/e/1FAIpQLScP-K8zi-9ar0MCq93D3VIFhegSNPveBfdLqiMfTYR9Q1iSKQ/viewform?embedded=true'});

    if(frame) {
        // Perform actions within the frame
        await frame.locator("input[aria-label='First name']").fill("Avinash");
        await frame.locator("input[aria-label='Last name']").fill("Baldwin");
        await frame.locator("input[aria-label='Email address']").fill("avinash.baldwin@example.com");
    }
});

test("Handling inner Frames", async ({page}) => {
    await page.goto("https://ui.vision/demo/iframes");
    // switch to frame using name or id attribute

    const frames = page.frames();
    console.log("Total frames in the page: " + frames.length);

    const frame = page.frame("iframe[src='https://docs.google.com/forms/d/e/1FAIpQLScP-K8zi-9ar0MCq93D3VIFhegSNPveBfdLqiMfTYR9Q1iSKQ/viewform?embedded=true']");

    if(frame) {
        // Perform actions within the frame
        const childFrame = frame.childFrames();
        console.log("Total child frames in the frame: " + childFrame.length);
    }
});