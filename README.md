# Wealthscope SDK

## Purpose

This SDK allows easy integration with the Wealthscope API via an iframe.

## Usage

```javascript
import { WealthscopeSdk } from '../lib/index.js';

// assuming there's a <div id="out" /> in your DOM
const div = document.getElementById('out');

const ws = new WealthscopeSdk({
    wealthscopeFrontendUrl: 'http://localhost:3001',
    width: '1000px',
    height: '800px'
});

ws.render(div);
```


## Options

* wealthscopeFrontendUrl - The base URL of the frontend
* width - The desired width of the iframe
* width - The desired height of the iframe
