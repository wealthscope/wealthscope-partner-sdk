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
    "accounts": [
      {
        "institution": "ABC Brokers", // The broker's name
        "label":"123412341234-Margin/Option", // The account's identifier
        "balance":104000.25, // The value of the account
        "cash":1234.57,
        "holdings": [
          {
            "ticker": "GOOG", // American tickers are as-is, Canadian ones must end with `:CA`
            "quantity": 2, // The number of shares
            "market_value": 5000.00,
            "name":"Alphabet Inc Class C",
            "security_type":"Stock"
          },
          {
            "ticker": "BNS:CA",
            "quantity": 3,
            "market_value":6000.00,
            "name":"Bank of Nova Scotia",
            "security_type":"Stock"
          },
        ]
      }
    ]
  };

  return jwt.sign(payload, privateKey, {algorithm: 'RS512'});
}

/**
 * Main function for this example.
 */
async function run() {
  // Set options for the client instance
  const options = {
    wealthscopeUrl: 'https://api.staging-bus.wealthscope.ca/v1'
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
    symbols: "KXI,L:CA,MDLZ,QQQ,RQH:CA,WN:CA,XCV:CA,XDV:CA,XIN:CA,XIU:CA,XMW:CA,XSP:CA",
    weights: "0.0639,0.0942,0.0932,0.1409,0.0959,0.0196,0.0398,0.0761,0.0798,0.0295,0.1934,0.0737",
    region: "CA",
    target: 0.01,
    init_date: "2007-08-01",
    end_date: "2018-11-30"
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

  console.log('Performing portfolio/post-retirement call.');
  const postRetirementResults = await api.post('portfolio/post-retirement', {
    region: "CA", 
    init_date: "2007-04-01", 
    end_date: "2018-01-31", 
    symbols: "ACWV,FXM:CA,IVV,QQQ,XFN:CA,XIT:CA,CGL:CA", 
    weights: "0.20,0.10,0.20,0.10,0.10,0.10,0.20", 
    age: 65, 
    retAge: 65, 
    gender: "M", 
    annuityRate: 0.02, 
    exp: 20000, 
    cpp: 10000, 
    cppAge: 65, 
    oas: 4500, 
    oasAge: 65, 
    pension: 0, 
    pensionAge: 0, 
    pensionInf: "No", 
    other: 0, 
    otherAge: 65, 
    otherInf: "No", 
    Inf: 0.02
  });
  console.log('RESULT: portfolio/post-retirement', await postRetirementResults.json());

  // Wait 2 seconds before next API call
  await waitMs(2000);

  console.log('Performing portfolio/couple-post-retirement call.');
  const couplePostRetirementResults = await api.post('portfolio/couple-post-retirement', {
    region: "CA", 
    init_date: "2007-04-01", 
    end_date: "2018-01-31", 
    symbols: "ACWV,FXM:CA,IVV,QQQ,XFN:CA,XIT:CA,CGL:CA", 
    weights: "0.20,0.10,0.20,0.10,0.10,0.10,0.20", 
    age: 30, 
    retAge: 65, 
    gender: "M", 
    cpp: 10000, 
    cppAge: 65, 
    oas: 8000, 
    oasAge: 65, 
    pension: 0, 
    pensionAge: 65, 
    pensionInf: "No", 
    other: 0, 
    otherAge: 65, 
    otherInf: "No", 
    wage: 0, 
    age2: 30, 
    retAge2: 70, 
    gender2: "F", 
    cpp2: 9000, 
    cppAge2: 70, 
    oas2: 7000, 
    oasAge2: 70, 
    pension2: 0, 
    pensionAge2: 65, 
    pensionInf2: "No",
    other2: 0, 
    otherAge2: 65, 
    otherInf2: "No", 
    wage2: 0, 
    exp: 60000, 
    inf: 0.02 
  });
  console.log('RESULT: portfolio/couple-post-retirement', await couplePostRetirementResults.json());

  // Wait 2 seconds before next API call
  await waitMs(2000);

  console.log('Performing portfolio/pre-retirement call.');
  const preRetirementResults = await api.post('portfolio/pre-retirement', {
    init: 5000, 
    targ: 18000, 
    symbols: "ACWV,FXM:CA,IVV,QQQ,XFN:CA,XIT:CA,CGL:CA", 
    weights: "0.20,0.10,0.20,0.10,0.10,0.10,0.20", 
    region: "CA", 
    horz: 10
  });
  console.log('RESULT: portfolio/pre-retirement', await preRetirementResults.json());

  // Wait 2 seconds before next API call
  await waitMs(2000);

  console.log('Performing portfolio/longevity call.');
  const longevityResults = await api.post('portfolio/longevity', {
    region: "CA",
    init_date: "2007-04-01",
    end_date: "2018-01-31",
    symbols: "ACWV,FXM:CA,IVV,QQQ,XFN:CA,XIT:CA,CGL:CA",
    weights: "0.20,0.10,0.20,0.10,0.10,0.10,0.20",
    retAge: 65,
    gender: "M",
    cf: 50000,
    init: 700000,
    inf: 0.02,
    lifeExp: 25
  });
  console.log('RESULT: portfolio/longevity', await longevityResults.json());

  // Wait 2 seconds before next API call
  await waitMs(2000);

  console.log('Performing portfolio/cpp-estimator call.');
  const cppEstimatorResults = await api.post('portfolio/cpp-estimator', {
    start_cpp_age: "65",
    years_contrib: "40",
    primary_caregiver: true,
    years_primary_caregiver: 8,
    is_earning_over_average: false,
    perc_under_average: 20
  });
  console.log('RESULT: portfolio/cpp-estimator', await cppEstimatorResults.json());

  // Wait 2 seconds before next API call
  await waitMs(2000);

  console.log('Performing portfolio/oas-estimator call.');
  const oasEstimatorResults = await api.post('portfolio/oas-estimator', {
    is_resident_10: true,
    resident_years: "30",
    start_age: "65"
  });
  console.log('RESULT: portfolio/oas-estimator', await oasEstimatorResults.json());
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
