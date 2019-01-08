import {WealthscopeSdk} from '../src/index.js';

// Instantiate WealthscopeSdk
// This does NOT initialize the iFrame
const ws = new WealthscopeSdk();

// Initialize the iFrame as a child to the indicated element
ws.render(document.getElementById('out'));

window.ws = ws;
