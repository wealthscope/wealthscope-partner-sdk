const {version} = require('../package.json');

// class WsInitializationError extends Error {}

// function requirePresence(options, property) {
//   if (!options || !options[property]) {
//     throw new WsInitializationError(`Option ${property} is mandatory`);
//   }
// }

module.exports = class WealthscopeSdk {
  constructor(opts) {
    this.opts = Object.assign({
      // place defaults here
      wealthscopeUrl: 'https://bus.wealthscope.ca',
      width: '500px',
      height: '500px',
    }, opts);
  }

  static version() {
    return version;
  }

  render(element) {
    this.element = element;

    const iframe = document.createElement('iframe');
    iframe.src = this.opts.wealthscopeUrl;
    iframe.width = this.opts.width;
    iframe.height = this.opts.height;
    element.append(iframe);

    this.iframe = iframe;
  }

  login(jwtData) {
    const options = {
      type: 'auth',
      token: jwtData
    };

    this.iframe.contentWindow.postMessage(options, this.opts.wealthscopeUrl);
  }

  logout() {
    const options = {
      type: 'logout'
    };

    this.iframe.contentWindow.postMessage(options, this.opts.wealthscopeUrl);
  }
};
