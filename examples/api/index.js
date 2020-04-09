import { WealthscopeApiClient } from '../../src/index';
import * as jwt from 'jsonwebtoken';
import "babel-polyfill";
import fs from 'fs'; // Parcel bundler can "fake" fs.readFileSync during compilation.

// Read the private key from `./private.key`
const privateKey = fs.readFileSync('private.key', 'utf-8');

/**
 * Constructs the JWT payload.
 * Typically, you would do this on the backend.
 */
function constructJwtPayload() {
  const payload = {
    // Your partner_name will be provided to you by Wealthscope.
    "partner_name": "testpartner",
    // This is a key that uniquely identifies the partner's user ID to Wealthscope.
    // This could be derived from some unique property of the user, such as email or database ID.
    "user_id": "testpartner-user-id-xyz123",
    // The partner user's account.
    "accounts": []
  };

  return jwt.sign(payload, privateKey, {algorithm: 'RS512'});
}

/**
 * Main function for this example.
 */
async function run() {
  // Set options for the client instance
  const options = {
    wealthscopeUrl: 'https://api.bus.wealthscope.ca/v1'
  };

  // Construct the API client instance
  const api = new WealthscopeApiClient(options);

  // Simulate server-side construction of the login payload JWT
  const loginPayload = constructJwtPayload();

  // Perform login
  console.log('Performing login.');
  await api.login(loginPayload);
  console.log('RESULT: login, token field should be populated', api);

  // Wait 2 seconds before next API call
  await waitMs(2000);

  // At this point, we start doing various calls with example payloads

  console.log('Performing portfolio/analytics call.');
  const analyticsResults = await api.post('portfolio/analytics', {
    symbols: "IVV,XBB:CA",
    weights: "0.5,0.5"
  });
  console.log('RESULT: portfolio/analytics', await analyticsResults.json());

  // Wait 2 seconds before next API call
  await waitMs(2000);

  console.log('Performing portfolio/analytics/compare call.');
  const compareResults = await api.post('portfolio/analytics/compare', {
    symbols1: "IVV,XIC:CA",
    weights1: "0.5,0.5",
    symbols2: "IVV,XIC:CA,TDB888:CA",
    weights2: "0.1,0.1,0.8"
  });
  console.log('RESULT: portfolio/analytics/compare', await compareResults.json());

  // Wait 2 seconds before next API call
  await waitMs(2000);

  console.log('Performing planning/post-retirement call.');
  const postRetirementResults = await api.post('planning/post-retirement', {
    symbols: "IVV",
    weights: "1",
    age: 30,
    retAge: 65,
    gender: "M",
    exp: 50000,
    cpp: 10000,
    cppAge: 65,
    oas: 8000,
    oasAge: 65
  });
  console.log('RESULT: planning/post-retirement', await postRetirementResults.json());

  // Wait 2 seconds before next API call
  await waitMs(2000);

  console.log('Performing planning/couple-post-retirement call.');
  const couplePostRetirementResults = await api.post('planning/couple-post-retirement', {
    symbols: "IVV",
    weights: "1",
    age: 40,
    retAge: 65,
    gender: "M",
    cpp: 10000,
    cppAge: 65,
    oas: 8000,
    oasAge: 65,
    wage: 0,
    age2: 35,
    retAge2: 65,
    gender2: "F",
    cpp2: 9000,
    cppAge2: 65,
    oas2: 7000,
    oasAge2: 65,
    wage2: 0,
    exp: 80000
  });
  console.log('RESULT: planning/couple-post-retirement', await couplePostRetirementResults.json());

  // Wait 2 seconds before next API call
  await waitMs(2000);

  console.log('Performing planning/pre-retirement call.');
  const preRetirementResults = await api.post('planning/pre-retirement', {
    init: 10000,
    targ: 1000000,
    symbols: "IVV",
    weights: "1",
    horz: 25
  });
  console.log('RESULT: planning/pre-retirement', await preRetirementResults.json());

  // Wait 2 seconds before next API call
  await waitMs(2000);

  console.log('Performing planning/longevity call.');
  const longevityResults = await api.post('planning/longevity', {
    symbols: "IVV",
    weights: "1",
    retAge: 65,
    gender: "M",
    cf: 50000,
    init: 700000
  });
  console.log('RESULT: planning/longevity', await longevityResults.json());

  // Wait 2 seconds before next API call
  await waitMs(2000);

  console.log('Performing planning/cpp-estimator call.');
  const cppEstimatorResults = await api.post('planning/cpp-estimator', {
    start_cpp_age: "65",
    years_contrib: "40",
    primary_caregiver: true,
    years_primary_caregiver: 8,
    is_earning_over_average: false,
    perc_under_average: 20
  });
  console.log('RESULT: planning/cpp-estimator', await cppEstimatorResults.json());

  // Wait 2 seconds before next API call
  await waitMs(2000);

  console.log('Performing planning/oas-estimator call.');
  const oasEstimatorResults = await api.post('planning/oas-estimator', {
    is_resident_10: true,
    resident_years: "30",
    start_age: "65"
  });
  console.log('RESULT: planning/oas-estimator', await oasEstimatorResults.json());
}

run();

// helper functions

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
