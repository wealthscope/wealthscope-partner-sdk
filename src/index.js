const {version} = require('../package.json');
const urlJoin = require('url-join');

const SDK_READY = 'SDK_READY';
const WS_UI_LOADED = 'WS_UI_LOADED';

import {iframeResizer} from 'iframe-resizer';

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
          scrolling: 'no',
          id: 'wealthscope',
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
      iframe.id = this.opts.id;
      iframe.src = this.opts.wealthscopeUrl;
      iframe.width = this.opts.width;
      iframe.height = this.opts.height;
      iframe.allow = 'clipboard-read; clipboard-write';
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

          if (type === WS_UI_LOADED) {
            const event =
              new CustomEvent('wealthscope_ui_load',
                  {detail: true}
              );
            window.parent.document.dispatchEvent(event);
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

      this.iframe.onload = iframeResizer({log: false}, this.iframe);

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
   * Initializes authorization token for the current session to null, and the
   * base URL.
   * @param {object} opts options object.
   */
  constructor(opts) {
    this.token = null;

    this.opts = Object.assign({
      wealthscopeUrl: 'https://api.bus.wealthscope.ca/v1',
    }, opts);
  }

  /**
   * Function that returns the current version from the package.json.
   * @return {string} the current version of the package
   */
  static version() {
    return version;
  }

  /**
   * This generates an Authentication token and sets this.token to the
   * generated token.
   * @param {string} jwtData The login payload for your user.
   * @return {Promise<Response>}
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
   * This simply resets the token to null. No API call is actually made.
   * @return {Promise}
   */
  logout() {
    this.token = null;
    return Promise.resolve();
  }

  /**
   * This is an HTTP call using the GET method.  It requires a URL.
   * Login must also succesfully be called before calling this method.
   * @param {string} url The URL of the desired Wealthscope endpoint
   * @return {Promise<Response>}
   */
  get(url) {
    return this._doFetch(url, 'GET');
  }

  /**
   * This is an HTTP call using the PUT method.  It requires a URL and a body.
   * Login must also succesfully be called before calling this method.
   * NOTE: Body needs to be a JSON object here, it gets stringified when it is
   * added to the options object for the fetch.
   * @param {string} url The URL of the desired Wealthscope endpoint
   * @param {object} body The json object that is the payload for the call
   * @return {Promise<Response>}
   */
  put(url, body) {
    return this._doFetch(url, 'PUT', body);
  }

  /**
   * This is an HTTP call using the POST method.  It requires a URL and a body.
   * Login must also succesfully be called before calling this method.
   * NOTE: Body needs to be a JSON object here, it gets stringified when it is
   * added to the options object for the fetch.
   * @param {string} url The URL of the desired Wealthscope endpoint
   * @param {object} body The json object that is the payload for the call
   * @return {Promise<Response>}
   */
  post(url, body) {
    return this._doFetch(url, 'POST', body);
  }

  /**
   * This is an HTTP call using the DELETE method. It requires a URL and a body
   * Login must also succesfully be called before calling this method.
   * NOTE: Body needs to be a JSON object here, it gets stringified when it is
   * added to the options object for the fetch.
   * @param {string} url The URL of the desired Wealthscope endpoint
   * @param {object} body The json object that is the payload for the call
   * @return {Promise<Response>}
   */
  del(url, body) {
    return this._doFetch(url, 'DELETE', body);
  }

  /**
   * @private
   * Generates a URL based on options.wealthscopeUrl, and ensures a trailing '/'
   * @param {string} url The URL of the desired Wealthscope endpoint
   * @return {string} A fully constructed URL
   */
  _constructUrl(url) {
    // trailing slash is important in order for `fetch` to work with the Django
    // backend.
    return urlJoin(this.opts.wealthscopeUrl, url) + '/';
  }

  /**
   * @private
   * This function constructs the options object that will be used by the
   * various fetch calls below.
   * NOTE: method must be in ALL CAPS, body must be a json object
   * @param {string} method The HTTP method for the fetch call (GET, PUT...)
   * @param {object} body The json object that is the payload for the call
   * @return {object}
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
   * @private
   * This function handles fetch calls by being passed parameters from each
   * of GET, PUT, POST, and DELETE
   * @param {string} url The URL of the desired Wealthscope endpoint
   * @param {string} method The HTTP method (GET, PUT, POST, or DELETE)
   * @param {object} body The json object that is the payload for the call
   * @return {Promise<Response>}
   */
  _doFetch(url, method, body) {
    const options = this._getFetchOptions(method, body);
    return fetch(this._constructUrl(url), options)
        .catch((err) => console.error(err));
  }
}
