# Common

## Goal

This JavaScript-based SDK has been developed to allow integration with the Wealthscope platform with minimum effort from Wealthscope's clients. It is intended to be a 'one stop shop' for integrations with the Wealthscope platform, with minimal additional configuration needed either on the backend or the frontend of the client's platform.

## Installation

You can install the SDK using the command `npm install --add wealthscope-partner-sdk`.
If you are using Yarn, you can instead do `yarn add wealthscope-partner-sdk`

## Integration Requirements

1. The client must be registered with Wealthscope.
1. The client must be able to generate and retrieve a RS512 JWT token.
1. The client must support the latest web browsers, and have JavaScript enabled.
1. The client must possess a partner name. Speak to your Wealthscope contact for more information.
1. The client must have shared a RSA SHA-512 public key with Wealthscope. Speak to your Wealthscope contact for more information.

# Wealthscope SDK Documentation

<b style="color: lightgreen">DOCUMENTATION</b>

## Approach

Using an iFrame-based JavaScript architecture, the SDK enables client applications to inject Wealthscope directly into their pages, removing the need to build a complete frontend solution to accommodate Wealthscope's analytics data. This enables an extremely rich customer experience to be fully acquired with a minimum amount of additional development overhead on the part of the client organization.

## Capabilities

* NPM-based installation
* Easy JavaScript-based configuration
* Zero-effort iFrame injection during application runtime
* Complete iFrame management
* User-level authentication using RS512 JWT tokens
* Flexible API-based data integration

## Javascript Integration example

```javascript
import { WealthscopeSdk } from 'wealthscope-partner-sdk';

// Instantiate WealthscopeSdk.
// This does NOT initialize the iFrame.
const ws = new WealthscopeSdk();

// Initialize the iFrame inside the indicated element.
ws.render(document.getElementById('out'));

// Fetch or generate your user's data.
// See Generating User Data section for more information.
const jwtData = generateUserData();

// Log your user into the application.
// Successful login will load the main application.
ws.login(jwtData);
```

### Options

* width - The desired width of the iframe, e.g. "500px" or "50%". Defaults to "100%".
* height - The desired height of the iframe, e.g. "500px" or "50%". Defaults to "100%".

### Generating user data

The `ws.login()` function accepts user data in the format of a RS512 JWT with the following payload shape:

```javascript
{
    "partner_name": "a unique identifier representing your company",
    "user_id": "a unique identifier for your user",
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
                ...
            ]
        },
        ...   
    ]
}
```

The JWT token will be verified on Wealthscope's API. Authentication will be performed based on verification of the JWT via the RSA SHA-512 public key shared by the client with Wealthscope during the registration process.

If authentication is successful, the main application will load inside the iFrame.

An authentication error will be thrown if login fails.


# Wealthscope Client API

## Approach

Using simple HTTP calls, this allows the client to retrieve the information they need from Wealthscope, and format and display it however they choose.

## Capabilities

* Simple HTTP calls to retrieve information from Wealthscope
* Allows customization of how the information is formatted and displayed

## Javascript Integration Example

```javascript
import {WealthscopeApiClient} from 'wealthscope-partner-sdk';

// Instantiate Wealthscope Client API
const client = new WealthscopeApiClient()

// Pass jwtToken and receive back your Authentication token
client.login(jwtToken);

// Call to post data to the relevant route
// URL is a string, body is a json object
client.post(url, body);

// Revoke the token, effectively logging the user out
client.logout();
```

### Options

* wealthscopeUrl - The base URL the API is pointing to.

Example:

```es6
const options = {
    wealthscopeUrl: "https://api.bus.wealthscope.ca"
}
```


# Changelog
`v1.1.0` - Added the WealthscopeApiClient, a powerful new way to directly call Wealthscope's API endpoints.
