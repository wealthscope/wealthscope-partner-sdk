const {version} = require('../package.json');
const urlJoin = require('url-join');

// class WsInitializationError extends Error {}

// function requirePresence(options, property) {
//   if (!options || !options[property]) {
//     throw new WsInitializationError(`Option ${property} is mandatory`);
//   }
// }

const SDK_READY = 'SDK_READY';

export class WealthscopeSdk {
  constructor(opts) {
    // A queue to hold messages that are to be dispatched
    this.msgQueue = [];

    // Flag which signifies whether the iFrame is ready
    this.isReady = false;

    // Flag which signifies if the SDK has been initiated
    this.isInit = false;

    // A timeout which holds the next dequeue attempt
    this.nextDequeueAttempt = null;

    // User options
    this.opts = Object.assign(
        {
        // place defaults here
          wealthscopeUrl: 'https://bus.wealthscope.ca',
          width: '100%',
          height: '100%'
        },
        opts
    );
  }

  static version() {
    return version;
  }

  render(element) {
    return new Promise((resolve) => {
      this.element = element;

      const iframe = document.createElement('iframe');
      iframe.src = this.opts.wealthscopeUrl;
      iframe.width = this.opts.width;
      iframe.height = this.opts.height;
      element.appendChild(iframe);

      this.iframe = iframe;

      if (!this.isInit) {
        window.addEventListener('message', (msg) => {
          const {data} = msg;
          const {type} = data;

          if (type === SDK_READY) {
            this.isReady = true;
            return resolve();
          }
        });

        // Signify that the SDK has been initialized
        this.isInit = true;
      }
    });
  }

  // This will load the SDK with the extra step of resetting it if already
  // loaded.
  // NOTE: When it's reset, you will have to log back in.
  load(element) {
    if (this.isReady) {
      this.logout();
      this.isReady = false;
    }

    if (this.element) {
      this.element.innerHTML = ''; // Clear previous element
    }

    return this.render(element);
  }

  login(jwtData) {
    const message = {
      type: 'auth',
      token: jwtData
    };

    this._enqueue(message);
  }

  logout() {
    const message = {
      type: 'logout'
    };

    this._enqueue(message);
  }

  // Add a message to the queue
  _enqueue(message) {
    this.msgQueue.push(message);
    this._dequeue(); // Attempt to dequeue the message
  }

  // Attempt to dequeue the entire queue of messages
  _dequeue() {
    // Clear the current task, if there is one
    clearTimeout(this.nextDequeueAttempt);
    this.nextDequeueAttempt = null;

    if (this.msgQueue.length <= 0) {
      return;
    }

    if (this.isReady) {
      // Dequeue the queue if the iFrame is ready
      const {contentWindow} = this.iframe;
      while (this.msgQueue.length > 0) {
        const message = this.msgQueue.shift();
        contentWindow.postMessage(message, this.opts.wealthscopeUrl);
      }
    } else {
      // Set a timeout to attempt again in 250ms
      if (!this.nextDequeueAttempt) {
        this.nextDequeueAttempt = setTimeout(() => this._dequeue(), 250);
      }
    }
  }
}

export class WealthscopeApiClient {
  constructor(opts) {
    // This is the login token for Wealthscope,
    // call login to get a valid token, callll logout to reset it to null
    this.token = null;

    // Default options, currently just the base URL for Wealthscope
    this.opts = Object.assign(
        {
          wealthscopeUrl: 'https://api.staging-bus.wealthscope.ca/v1',
        },
        opts
    );
  }

  // This get's the current version of Wealthscope
  static version() {
    return version;
  }

  // This retrieves a valid token and sets this.token to be the valid token
  login(jwtData) {
    // const loginOptions = this._getFetchOptions('POST', { token: jwtData });
    return fetch(this.opts.wealthscopeUrl + '/auth/authenticate/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token: jwtData})
    })
        .then((response) => response.json())
        .then(({token}) => {
          this.token = token;
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log('ERROR REQUESTING TOKEN: ', err);
        });
  }

  // This resets the token to null
  logout() {
    this.token = null;
  }

  // fetch call returning a Promise, requires a URL rout and a vailid token
  get(url) {
    const options = {
      method: 'GET',
      //mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.token,
      },
    };

    return fetch(this._constructUrl(url), options)
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  // Fetch call returning a Promise, requires a URL rout, a body and a valid
  // token
  // NOTE: Body needs to be a JSON object here, it gets stringified when it is
  // added to the options object for the fetch
  put(url, body) {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.token,
      },
      body: JSON.stringify(body),
    };

    return fetch(this._constructUrl(url), options)
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  post(url, body) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.token,
      },
      body: JSON.stringify(body),
    };

    return fetch(this._constructUrl(url), options)
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  del(url, body) {
    const options = {
      method: 'DELETE',
      //mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.token,
      },
      body: JSON.stringify(body),
    };

    return fetch(this._constructUrl(url), options)
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  // this function generates a URL
  _constructUrl(url) {
    // trailing slash is important in order for `fetch` to work
    return urlJoin(this.opts.wealthscopeUrl, url) + '/'
  }

  // This function constructs the options object that will be used by the
  // various fetch calls below
  _getFetchOptions(method, body) {
    // An empty options object
    const fetchOption = {
      headers: {}
    };

    // The Method portion of the object
    fetchOption.method = method;
    //fetchOption.mode = 'no-cors';
    // A check to make sure token is present before adding it to the options
    // return an error if token isn't present
    if (this.token != null) {
      fetchOption.headers.Authentication = 'JWT ' + this.token;
    } else {
      throw new Error('You must be logged in to perform this action.');
    }

    // A check for a body before it's added to the options, allows the same
    // construction functon to be used for calls without a body component
    // Returns the object without the body if body is empty, adds the body to
    // the object if it's present
    if (body != null) {
      fetchOption.headers['Content-Type'] = 'application/json';
      fetchOption.body = JSON.stringify(body);
    }

    return fetchOption;
  }

}


window.API = WealthscopeApiClient;
