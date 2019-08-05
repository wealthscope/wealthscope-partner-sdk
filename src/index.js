const {version} = require('../package.json');
const urlJoin = require('url-join');

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
  /**
   * Constructor for the Wealthscope Client API.
   * Initializes authorization token for the current session to null, and the base URL.
   * opts object options can be:
   * wealthscopeUrl
   * @param {object} opts 
   */
  constructor(opts) {
    this.token = null;

    this.opts = Object.assign({
      wealthscopeUrl: 'https://api.bus.wealthscope.ca/v1',
    }, opts);
  }

  /**
   * Function that returns the current version from the package.json.
   * @returns {string}
   */
  static version() {
    return version;
  }

  /**
   * This generates an Authentication token and sets this.token to the generated token.
   * @param {string} jwtData 
   * @returns {Promise<Response>}
   */ 
  login(jwtData) {
    return fetch(this._constructUrl('/auth/authenticate/'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token: jwtData})
    })
    .then(async (response) => {
      const json = await response.json();
      this.token = json.token;
      return response;
    });
  }

  /**
   * This resets the token to null.
   * @returns {Promise}
   */
  logout() {
    this.token = null;
    Promise.resolve();
  }

  /**
   * This is an HTTP call using the GET method.  It requires a URL.
   * Login must also succesfully be called before calling this method.
   * The URL of the Wealthscope endpoint you are trying to reach
   * The Wealthscope endpoint URL
   * @param {string} url 
   * @returns {Promise<Response>}
   */
  get(url) {
    return this._doFetch(url, 'GET');
  }

  /**
   * This is an HTTP call using the PUT method.  It requires a URL and a body.  
   * Login must also succesfully be called before calling this method.
   * NOTE: Body needs to be a JSON object here, it gets stringified when it is
   * added to the options object for the fetch.
   * The Wealthscope endpoint URL
   * @param {string} url 
   * The json object that is the payload for the call
   * @param {object} body 
   * @returns {Promise<Response>}
   */
  put(url, body) {
    return this._doFetch(url, 'PUT', body);
  }

  /**
   * This is an HTTP call using the POST method.  It requires a URL and a body.  
   * Login must also succesfully be called before calling this method.
   * NOTE: Body needs to be a JSON object here, it gets stringified when it is
   * added to the options object for the fetch.
   * The Wealthscope endpoint URL
   * @param {string} url 
   * The json object that is the payload for the call
   * @param {object} body 
   * @returns {Promise<Response>}
   */
  post(url, body) {
    return this._doFetch(url, 'POST', body);
  }

  /**
   * This is an HTTP call using the DELETE method.  It requires a URL and a body.
   * Login must also succesfully be called before calling this method.
   * NOTE: Body needs to be a JSON object here, it gets stringified when it is
   * added to the options object for the fetch.
   * The Wealthscope endpoint URL
   * @param {string} url 
   * The json object that is the payload for the call
   * @param {object} body 
   * @returns {Promise<Response>}
   */
  del(url, body) {
    return this._doFetch(url, 'DELETE', body);
  }

  /**
   * Generates a URL, and ensures a trailing '/'
   * The Wealthscope endpoint URL
   * @param {string} url
   * @returns {string} 
   * @private
   */
  _constructUrl(url) {
    // trailing slash is important in order for `fetch` to work with the Django backend.
    return urlJoin(this.opts.wealthscopeUrl, url) + '/'
  }

  /**
   * This function constructs the options object that will be used by the
   * various fetch calls below.
   * NOTE: method must be in ALL CAPS, body must be a json object
   * The HTTP method for the fetch call (GET, PUT, POST, or DELETE)
   * @param {string} method 
   * The json object that is the payload for the call
   * @param {object} body 
   * @returns {object}
   * @private
   */
  _getFetchOptions(method, body) {
    // An options object with empty headers
    const fetchOption = {
      headers: {}
    };

    // The Method portion of the object
    fetchOption.method = method;

    // A check to make sure token is present before adding it to the options
    // return an error if token isn't present
    if (this.token !== null) {
      fetchOption.headers.Authorization = 'JWT ' + this.token;
    } else {
      throw new Error('You must be logged in to perform this action.');
    }

    // A check for a body before it's added to the options, allows the same
    // construction functon to be used for calls without a body component
    // Returns the object without the body if body is empty, adds the body to
    // the object if it's present
    if (body) {
      fetchOption.headers['Content-Type'] = 'application/json';
      fetchOption.body = JSON.stringify(body);
    }

    return fetchOption;
  }

  /**
   * This function handles fetch calls by being passed parameters from each of GET, PUT, POST, and DELETE
   * The Wealthscope endpoint URL
   * @param {string} url 
   * The HTTP method for the fetch call (GET, PUT, POST, or DELETE)
   * @param {string} method 
   * The json object that is the payload for the call
   * @param {object} body 
   * @returns {Promise<Response>}
   * @private
   */
  _doFetch(url, method, body) {
    const options = this._getFetchOptions(method, body);
    return fetch(this._constructUrl(url), options)
    .catch(err => console.error(err));
  }

}