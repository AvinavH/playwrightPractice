// Test : Create booking using POST API Request
//Request Type: POST
// Request body: Random/dynamic data
// Pre-requisite : install faker package
// npm install @faker-js/faker 
// Pre-requisite : install luxon package to handle date and time
// npm install luxon

import {test, expect} from '@playwright/test';
//import * as fs from 'fs';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

test('Create POST Request using JSON file',{ tag: '@api' }, async ({request}) => {

    // data generation using faker
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalPrice = faker.number.int({ min: 100, max: 5000 });
    const depositPaid = faker.datatype.boolean();
    const checkInDate = DateTime.now().minus({ days: 10 }).toISODate();
    const checkOutDate = DateTime.now().plus({ days: 60 }).toISODate();
    const additionalneeds = faker.helpers.arrayElement(['Breakfast', 'Lunch', 'Dinner', 'Balcony View', 'Extra Pillows', 'Late Checkout']);
    
    // request body using faker
    const requestBody = {
    "firstname" : firstName,
    "lastname" : lastName,
    "totalprice" : totalPrice,
    "depositpaid" : depositPaid,
    "bookingdates" : {
        "checkin" : checkInDate,
        "checkout" : checkOutDate
    },
    "additionalneeds" : additionalneeds
    }
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