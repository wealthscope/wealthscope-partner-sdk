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
1. The client must have a RSA SHA-512 private key shared by Wealthscope. Speak to your Wealthscope contact for more information.

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
    "language": "en", // Indicate the language (en or fr) to be used in the iFrame
    "accounts": [
        {
            "institution": "ABC Brokers", // The broker or institution the account is with
            "name":"123412341234-Margin", // The account's identifier
            "balance":6086.35, // The balance the account
            "cash":1000, // The amount of cash in the account
            "currency": "CAD", // One of "CAD" and "USD", indicating the denomination for account balance, cash, and holdings' market values
            "holdings": [
                {
                    "ticker": "GOOG", // Ticker symbol of the holding, also see important remarks below
                    "quantity": 2, // The number of shares of the holding
                    "market_value": 3394.35, // The market value in CAD of the holding
                    "name":"Alphabet Inc Class C", // The name of the holding
                    "security_type":"Stock" // One of the following: Stock, Mutual Fund, ETF (Other types are not supported by Wealthscope)
                },
                {
                    "ticker": "BNS:CA",
                    "quantity": 30,
                    "market_value":1692.00,
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

The JWT token will be verified on Wealthscope's API. Authentication will be performed based on verification of the JWT via the RSA SHA-512 public key during the registration process.

If authentication is successful, the main application will load inside the iFrame.

An authentication error will be thrown if login fails.

**Important Remarks**
1. All dollar values must have at most 2 decimal places.
2. Supported types of securites are Canadan and U.S. stocks, Canadian and U.S. ETF's, and Canadian mutual funds.
3. Ticker symbols for the U.S. listed securties should be entered as is, without any exchange suffix. For Canadian listed securities, the following exchange suffix should be appended to the ticker symbols:
    * securities listed on TSX should end with `:CA`
    * securities listed on NEO ATS (NEO-N) should end with `:AQN`
    * securities listed on NEO-L should end with `:AQL`
    * securities listed on Alpha Exchange should end with `:APH`
4. For Canadian mutual funds, the fund code should end with `:CA` (e.g., `RBF460:CA` for RBC Select Balanced Portfolio Series A)

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
