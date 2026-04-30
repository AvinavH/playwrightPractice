/* Types of Authentication in API:
1. No Authentication: These APIs are open to the public and do not require any authentication. 
   They can be accessed by anyone without providing credentials.
2. Basic Authentication: This is a simple authentication scheme where the client sends the username and password encoded in Base64 format in the HTTP header. It is not considered secure as the credentials can be easily decoded if intercepted.
3. Token-Based Authentication: In this method, the client first authenticates with the server using credentials (like username and password) and receives a token in response. The client then uses this token for subsequent requests to access protected resources. The token is usually time-limited and can be revoked by the server.
4. OAuth: OAuth is an open standard for access delegation commonly used for token-based authentication. It allows users to grant third-party applications limited access to their resources without sharing their credentials.
5. API Key Authentication: In this method, clients are issued a unique API key that they include in their requests to authenticate themselves. The server validates the API key and grants access to the requested resources.
6. JWT (JSON Web Token) Authentication: JWT is a compact,

*/

import {test, expect} from '@playwright/test';

// 1. No Authentication
test('Accessing API without authentication', async ({request}) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users'); 
    expect(response.ok()).toBeTruthy();
    const responseData = await response.json();
    console.log(responseData);
});

// 2. Basic Authentication
test('Accessing API with Basic Authentication', async ({request}) => {
    const response = await request.get('https://httpbin.org/basic-auth/user/passwd', {
        headers: {
            'Authorization': 'Basic ' + Buffer.from('user:pass').toString('base64')
        }
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseData = await response.json();
    console.log(responseData);
});

// 3. Token-Based Authentication
test('Accessing API with Token-Based Authentication', async ({request}) => {
    // Step 1: Authenticate and get token
    const authResponse = await request.get('https://api.github.com/user/repos',
        {
            headers: {'Authorization':'Bearer ghp_your_github_token_here'}
        }
    );
    expect(authResponse.ok()).toBeTruthy();
    const authData = await authResponse.json();
    console.log(authData);

});