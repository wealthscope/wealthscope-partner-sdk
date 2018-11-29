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
* User-level authentication using SHA-512 JWT tokens
* Flexible API-based data integration

## Installation

You can install the SDK using the command `npm install --add wealthscope-sdk`.
If you are using Yarn, you can instead do `yarn add wealthscope-sdk`

## Integration Requirements

1. The client must be registered with Wealthscope.
1. The client must be able to generate and retrieve a SHA-512-based JWT token. 
1. The client must support the latest web browsers, and have JavaScript enabled.
1. The client must possess a CLIENT_ID. Speak to your Wealthscope contact for more information.
1. The client must have shared a SHA-512 public key with Wealthscope. Speak to your Wealthscope contact for more information.

## Javascript Integration example

```javascript
import { WealthscopeSdk } from 'wealthscope-sdk';

// The CLIENT_ID will be provided by Wealthscope
const CLIENT_ID = "<your CLIENT_ID here>"

// Fetch or generate your user's data. This must be a signed SHA-512 based JWT token.
const jwtData = generateUserData();

// Instantiate WealthscopeSdk. This does NOT initialize the iFrame automatically.
const options = {
    clientName: CLIENT_ID
};
const ws = new WealthscopeSdk(options);

// Initialize the iFrame. This will render a placeholder page on your 
// Assuming there's an element `<div id="out" />` in your DOM
const div = document.getElementById('out');
ws.render(div);

// Log your user into the application
ws.login(jwtData)
```

### Options

* clientEndpoint - The endpoint you are using to authenticate your data. See Integration Requirements section for more details.
* clientName - Your client name, as provided by Wealthscope. See Integration Requirements section for more details.
* width - The desired width of the iframe, e.g. "500px" or "50%"
* height - The desired height of the iframe, e.g. "500px" or "50%"

### Generating user data

The `ws.login()` function accepts user data in the format of a SHA-512-signed JWT with the following payload shape:

```javascript
// Please note, this is subject to change
{
    userId: "a unique identifier for your user",
    securities: [
        {
            symbol: "RBF9999:CA",
            exchange: "CMF",
            securityType: "fund"
        },
        // ...
    ]
}
```