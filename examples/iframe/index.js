import { WealthscopeSdk } from '../src/index.js';
import db from './database';

const DEFAULT_FRONTEND_URL = 'https://staging-bus.wealthscope.ca';

function setAlert(message, el = $('#error')) {
  el.html(message);
  el.css({
    display: 'block'
  });
}

function clearAlert(el = $('#error')) {
  el.html('');
  el.css({
    display: 'none'
  });
}

// Set cookie helper
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Get cookie helper
function getCookie(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Used to parse serialized form data into an object
function parseFormData(data) {
  const formData = {};

  data.split('&').forEach(inputData => {
    const [name, value] = inputData.split('=');
    formData[name] = value;
  });

  return formData;
}

async function saveFormData(data) {
  for (const key of Object.keys(data)) {
    await db.formData.put({
      key,
      value: data[key]
    });
  }
}

// Generate a JWT using options passed through cfg
async function generateJWT(cfg) {
  const { partnerId, privateKey, payload } = cfg;

  // Check if required parameters were passed
  const validConfig = partnerId && privateKey && payload;
  if (!validConfig) {
    throw new TypeError('Invalid JWT data.');
  }
  
  // Create the token header
  const timeNow = KJUR.jws.IntDate.get('now');
  const timeEnd = KJUR.jws.IntDate.get('now + 1day');
  const header = {
    alg: 'RS512',
    typ: 'JWT',
    nbf: timeNow,
    exp: timeEnd
  };

  // Decode and parse the payload
  const payloadObj = JSON.parse(decodeURIComponent(payload));
  
  // JSON stringify the header and payload
  const jsonHeader = JSON.stringify(header);
  const jsonPayload = JSON.stringify({
    ...payloadObj,
    partner_name: partnerId
  });

  // Create a private key object
  // const rsa = new RSAKey();
  // rsa.readPrivateKeyFromPEMString(privateKey);
  const rsa = KEYUTIL.getKey(decodeURIComponent(privateKey));
  
  // Generate the JWT
  const jwt = KJUR.jws.JWS.sign(null, jsonHeader, jsonPayload, rsa);

  return jwt;
}

// Re/configure the SDK and refresh the page
async function configureSDK(cfg) {
  const opts = Object.assign(
    {},
    {
      partnerId: '',
      privateKey: '',
      payload: {},
      frontendUrl: '',
    },
    cfg
  );

  const {
    frontendUrl,
    partnerId,
    privateKey,
    payload
  } = opts;

  const validJWTConfig = partnerId && privateKey && payload;
  if (!validJWTConfig) {
    throw new TypeError('Invalid JWT data.');
  }

  // Generate the JWT token with the provided data
  let token;
  try {
    token = await generateJWT({
      partnerId,
      privateKey,
      payload
    });

    await login(token);
  } catch (e) {
    console.error(e);
    throw new Error('Invalid JWT data.');
  }
  
  // Save all the data
  const dataToSave = {
    partnerId,
    privateKey,
    payload,
  };

  if (frontendUrl) {
    dataToSave['frontendUrl'] = frontendUrl;
  }

  await saveFormData({
    partnerId,
    privateKey,
    payload,
    frontendUrl
  });

  if (frontendUrl) {
    window.location.reload();
  }

  // Save the JWT as a cookie to avoid generating it again
  setCookie('jwt', token);
}

async function login(jwt) {
  if (!jwt) {
    throw new TypeError('JWT is required to login.');
  }

  if (!window.ws) {
    throw new Error('Attempted to login when the WealthscopeSdk has not been initialized yet.');
  }

  // Proceed to login with the SDK
  window.ws.login(jwt);
  
  // Clear all errors
  clearAlert($('#error'));
  clearAlert($('#modal-error'));
  clearAlert($('#warning'));
}

async function initialize() {
  const storedJWT = getCookie('jwt');
  const savedFormData = await db.formData.toArray();
  const frontendUrl = savedFormData.find(({ key }) => key === 'frontendUrl');
  
  // Restore the saved options
  savedFormData.forEach(({ key, value }) => {
    $(`input[name=${key}]`).val(decodeURIComponent(value));
    $(`textarea[name=${key}]`).val(decodeURIComponent(value));
  });

  // Initialize the WealthscopeSdk
  window.ws = new WealthscopeSdk({
    wealthscopeUrl: (
      (frontendUrl && frontendUrl.value && decodeURIComponent(frontendUrl.value))
      || DEFAULT_FRONTEND_URL
    )
  });

  // Render the iFrame
  window.ws.render(document.getElementById('ws'));

  // Display warning if no previous data has been saved
  if (storedJWT) {
    try {
      await login(storedJWT);
    } catch (e) {
      console.error(e);
      setAlert(e.message || e, $('#error'));
    }
    return;
  }

  // Set an alert warning that they need to configure the SDK
  setAlert('You must configure the SDK before you can use it.', $('#warning'));
}

$(document).ready(async () => {
  $('#options-form').submit(async function(e) {
    e.preventDefault();

    // Get the form data
    const formData = parseFormData($(this).serialize());
    
    // Configure the SDK
    try {
      await configureSDK(formData);
    } catch (e) {
      console.error(e);
      return setAlert(e.message || e, $('#modal-error'));
    }

    clearAlert($('#modal-error'));
    $('#configureSDKModal').modal('hide');
  });
  
  // Handle configure SDK modal on save
  $('#configureSDKButton').click(e => {
    $('#options-form').submit();
  });

  initialize();
});
