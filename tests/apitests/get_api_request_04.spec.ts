import {test, expect} from '@playwright/test';  
import { request } from 'node:http';

test('Get Booking Details by ID - Path parameter',{ tag: '@api' }, async ({request}) => {

    const bookingId = 4467; // specify the booking ID you want to retrieve

    // send GET request
    const response = await request.get(`/booking/${bookingId}`);
    const responseBody = await response.json();
    console.log(responseBody);

    // add assertions
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
});

test.only('Get Booking Details by Name - Query parameter', { tag: '@api' }, async ({request}) => {

    const firstName = 'John'; // specify the first name to search for
    const lastName = 'Smith'; // specify the last name to search for

    // send GET request
    const response = await request.get("/booking", { params: { firstName, lastName } });
    const responseBody = await response.json();
    console.log(responseBody);

    // add assertions
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // Additional assertions
    expect(responseBody.length).not.toBe(0); // assert that at least one booking is returned
    expect(responseBody[0]).toHaveProperty('bookingid'); // assert that the response contains bookingid

    for (const booking of responseBody) {
        expect(booking).toHaveProperty('bookingid'); // assert that each booking has a bookingid
        expect(typeof booking.bookingid).toBe('number'); // assert that bookingid is a number
        expect(booking.bookingid).toBeGreaterThan(0); // assert that bookingid is a positive integer
    }

});