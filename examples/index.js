import {WealthscopeSdk} from '../lib/index.js';

// Instantiate WealthscopeSdk
// This does NOT initialize the iFrame
const options = {
  width: '1000px',
  height: '800px'
};
const ws = new WealthscopeSdk(options);

// Initialize the iFrame inside the indicated element.
ws.render(document.getElementById('out'));

window.ws = ws;
