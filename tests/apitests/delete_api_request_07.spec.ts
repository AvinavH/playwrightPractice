import {test, expect} from '@playwright/test';
import * as fs from 'fs';
import { request } from 'http';

// utility function to read JSON file
function readJSON(filePath: string) {
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return jsonData;
}

test('DELETE a booking using DELETE API Request', { tag: '@api' },  async ({request}) => {
    
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

    // 4. Delete the booking using DELETE request
    const deleteData = readJSON('testdata/patch_request_body.json');
    const deleteResponse = await request.delete(`/booking/${bookingId}`,
        {
            headers: {'Cookie': `token=${token}`}
        }
    );

    //expect(deleteResponse.ok()).toBeTruthy();
    // API has a bug where it is returning 201 status code for DELETE request instead of 200 or 204. So commenting above assertion and adding assertion for status code 201
    expect(deleteResponse.status()).toBe(201);
    expect(deleteResponse.statusText()).toBe('Created');
    console.log(`Booking with ID ${bookingId} deleted successfully`);

    // 5. Try to get the deleted booking to verify if it is deleted successfully
    const getResponse = await request.get(`/booking/${bookingId}`);
    expect(getResponse.status()).toBe(404);
    console.log(`Verified that booking with ID ${bookingId} is deleted successfully`);

});
