// Test : Create booking using POST API Request
//Request Type: POST
// Request body: JSON file

import {test, expect} from '@playwright/test';
import * as fs from 'fs';

test('Create POST Request using JSON file', { tag: '@api' }, async ({request}) => {

    // request body
    const requestBody = JSON.parse(fs.readFileSync('testdata/post_request_body.json', 'utf8'));
    // send POST request
    const response = await request.post('/booking', {
        data: requestBody
    });
    const responseBody = await response.json();
    console.log(responseBody);

    // assertions
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // Validate response body
    expect(responseBody).toHaveProperty('bookingid');
    expect(responseBody).toHaveProperty('booking');
    expect(responseBody.booking).toHaveProperty('additionalneeds');

    // Validate booking details in the response body
    expect(responseBody.booking.firstname).toBe(requestBody.firstname);
    expect(responseBody.booking.lastname).toBe(requestBody.lastname);
    expect(responseBody.booking.totalprice).toBe(requestBody.totalprice);
    expect(responseBody.booking.depositpaid).toBe(requestBody.depositpaid);
    expect(responseBody.booking.bookingdates.checkin).toBe(requestBody.bookingdates.checkin);
    expect(responseBody.booking.bookingdates.checkout).toBe(requestBody.bookingdates.checkout);
    expect(responseBody.booking.additionalneeds).toBe(requestBody.additionalneeds);

    // altertive way to validate response body using object matching
    expect(responseBody.booking).toMatchObject(requestBody);
});