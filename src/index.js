const {version} = require('../package.json');

class WsInitializationError extends Error {}

function requirePresence(options, property) {
  if (!options || !options[property]) {
    throw new WsInitializationError(`Option ${property} is mandatory`);
  }
}
module.exports = class WealthscopeSdk {
  constructor(opts) {
    requirePresence(opts, 'wealthscopeFrontendUrl');

    this.opts = Object.assign({
      // place defaults here
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
    iframe.src = this.opts.wealthscopeFrontendUrl;
    iframe.width = this.opts.width;
    iframe.height = this.opts.height;
    element.append(iframe);

    this.iframe = iframe;
  }

  auth(email, password) {
    this.iframe.contentWindow
        .postMessage({
          type: 'auth',
          email,
          password
        }, this.opts.wealthscopeFrontendUrl);
  }
};
