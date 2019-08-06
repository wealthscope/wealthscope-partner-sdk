import { WealthscopeApiClient } from '../../src/index';
import * as jwt from 'jsonwebtoken';
import "babel-polyfill";

// Parcel bundler can "fake" fs.readFileSync during compilation.
import fs from 'fs';
const privateKey = fs.readFileSync('private.key', 'utf-8');
// const publicKey = fs.readFileSync('public.key', 'utf-8');

async function run() {
  // add options if needed
  const options = {
    wealthscopeUrl: 'https://api.staging-bus.wealthscope.ca/v1'
  };
  
  const api = new WealthscopeApiClient(options);
  const loginPayload = constructJwtPayload();
  
  console.log('Performing login.');
  await api.login(loginPayload);
  console.log('RESULT: login, token field should be populated', api);

  // Wait 2 seconds before next API call
  await waitMs(2000);

  console.log('Performing portfolio/analytics call.');
  const results = await api.post('portfolio/analytics', {
    symbols: "KXI,L:CA,MDLZ,QQQ,RQH:CA,WN:CA,XCV:CA,XDV:CA,XIN:CA,XIU:CA,XMW:CA,XSP:CA",
    weights: "0.0639,0.0942,0.0932,0.1409,0.0959,0.0196,0.0398,0.0761,0.0798,0.0295,0.1934,0.0737",
    region: "CA",
    target: 0.01,
    init_date: "2007-08-01",
    end_date: "2018-11-30"
  });
  console.log('RESULT: portfolio/analytics', await results.json());

  // Wait 2 seconds before next API call
  await waitMs(2000);
}

run();


// helper functions

/**
 * Constructs the JWT payload. Typically, you would do this on the backend.
 */
function constructJwtPayload() {
  const payload = {
    "partner_name": "testpartner",
    "user_id": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjI5NTI4NjgsImV4cCI6MTU2Mjk1NjQ2OCwiYXVkIjoid2VhbHRoc2NvcGUvd2VhbHRoc2NvcGUiLCJpc3MiOiJ3ZWFsdGhpY2EiLCJzdWIiOiI1NTgxYTgxMjAwMWIzYjExMDAwYWUzOWEifQ.VNlAAoQ769KqkroHIuMcBLetOCkye5hQtqP0RL_wIqA",
    "accounts": []
  }

  return jwt.sign(payload, privateKey, {algorithm: 'RS512'});
}

/**
 * Sleep function to throttle calls to the API
 * @param {Promise} timeMs 
 */
function waitMs(timeMs) {
  console.log('Sleeping for ' + timeMs + ' milliseconds.');
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), timeMs);
  });
}
