/* AJV is used for JSON Schema Validation in Playwright
1. Install the AJV package
npm install --save-dev playwright ajv

*/
import {test, expect, request} from '@playwright/test';
import Ajv from 'ajv';
import * as fs from 'fs';

test('JSON Schema Validation : Check 01', async ({request}) => {

    const response = await request.get('https://mocktarget.apigee.net/json');
    const responsebody = await response.json();
    console.log(responsebody);
    expect(response.ok()).toBeTruthy();

    // load the JSON schema from the file
    const schemaData = JSON.parse(fs.readFileSync('testdata/json_schema_01.json', 'utf-8'));
    const ajv = new Ajv();
    const validate = ajv.compile(schemaData); // returns a validator function and have to store it in a variable

    const isValid = validate(responsebody);
    expect(isValid).toBeTruthy();
});

test('JSON Schema Validation : Check 02', async ({request}) => {

    const response = await request.get('https://jsonplaceholder.typicode.com/todos/1');
    const responsebody = await response.json();
    console.log(responsebody);
    expect(response.ok()).toBeTruthy();

    // load the JSON schema from the file
    const schemaData = JSON.parse(fs.readFileSync('testdata/json_schema_01.json', 'utf-8'));
    const ajv = new Ajv();
    const validate = ajv.compile(schemaData); // returns a validator function and have to store it in a variable

    const isValid = validate(responsebody);
    expect(isValid).toBeTruthy();
});