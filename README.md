# Wealthscope SDK Documentation

<b style="color: lightgreen">DRAFT DOCUMENTATION</b>

## Goal

This JavaScript-based SDK has been developed to allow integration with the Wealthscope platform with a minimum of effort from Wealthscope's clients. It is intended to be a 'one stop shop' for integrations with the Wealthscope platform, with minimal additional configuration needed either on the backend or the frontend of the client's platform.

## Approach

Using an iFrame-based JavaScript architecture, the SDK enables client applications to inject Wealthscope directly into their pages, removing the need to build a complete frontend solution to accommodate for Wealthscope's dataset. This enables an extremely rich customer experience to be fully acquired with a minimum of additional development overhead on the part of the client organization.


## Capabilities

* NPM-based installation
* Easy JavaScript-based configuration
* Zero-effort iFrame injection during application runtime
* Complete iFrame management
* User-level authentication using RS512 JWT tokens
* Flexible API-based data integration

## Installation

You can install the SDK using the command `npm install --add wealthscope-sdk`.
If you are using Yarn, you can instead do `yarn add wealthscope-sdk`

## Integration Requirements

1. The client must be registered with Wealthscope.
1. The client must be able to generate and retrieve a RS512 JWT token. 
1. The client must support the latest web browsers, and have JavaScript enabled.
1. The client must possess a partner name. Speak to your Wealthscope contact for more information.
1. The client must have shared a RSA SHA-512 public key with Wealthscope. Speak to your Wealthscope contact for more information.

## Javascript Integration example

```javascript
import { WealthscopeSdk } from 'wealthscope-sdk';

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

* width - The desired width of the iframe, e.g. "500px" or "50%"
* height - The desired height of the iframe, e.g. "500px" or "50%"

### Generating user data

The `ws.login()` function accepts user data in the format of a RS512 JWT with the following payload shape:

```javascript
{
    "partner_name": "a unique identifier representing your company",
    "user_id": "a unique identifier for your user",
    "accounts": [
        {
            "institution": "Virtual Brokers", // The broker's name
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

