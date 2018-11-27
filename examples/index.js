import { WealthscopeSdk } from '../lib/index.js';

const div = document.getElementById('out');

const ws = new WealthscopeSdk({
    wealthscopeFrontendUrl: 'http://localhost:3001',
    width: '1000px',
    height: '800px'
});

ws.render(div);

window.ws = ws;