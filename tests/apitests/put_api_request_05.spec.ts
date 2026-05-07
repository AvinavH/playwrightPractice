import {test, expect, request} from '@playwright/test';
import * as fs from 'fs';

// utility function to read JSON file
function readJSON(filePath: string) {
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return jsonData;
}

test('Update a booking using PUT API Request', { tag: '@api' }, async ({request}) => {
    
    // 1. Create a new booking to get the booking ID using POST request
    const createResponse = await request.post('/booking', {
    data: readJSON('testdata/post_request_body.json')
    });
    expect(createResponse.ok()).toBeTruthy();
    const createResponseBody = await createResponse.json();
    const bookingId = createResponseBody.bookingid;
    console.log(`Booking created with ID: ${bookingId}`);

    // 2. Generate Token using auth API
    const authResponse = await request.post('/auth', {
        data: readJSON('testdata/token_request_body.json')
    });
   
    expect(authResponse.ok()).toBeTruthy();
    const authResponseBody = await authResponse.json();
    const token = authResponseBody.token;
    console.log(`Token generated: ${token}`);

    // 3. Update the booking using PUT request
    const updatedData = readJSON('testdata/put_request_body.json');
    const updateResponse = await request.put(`/booking/${bookingId}`, 
        {
            headers: {'Cookie': `token=${token}`},
            data: updatedData
        }
    );

    expect(updateResponse.ok()).toBeTruthy();
    expect(updateResponse.status()).toBe(200);
    const updateResponseBody = await updateResponse.json();
    console.log(updateResponseBody);

});
