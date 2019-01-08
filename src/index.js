const {version} = require('../package.json');

// class WsInitializationError extends Error {}

// function requirePresence(options, property) {
//   if (!options || !options[property]) {
//     throw new WsInitializationError(`Option ${property} is mandatory`);
//   }
// }

export class WealthscopeSdk {
  constructor(opts) {
    this.isReady = false;
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

      window.addEventListener('message', (msg) => {
        const {data} = msg;
        const {type} = data;

        if (type === 'ready') {
          this.isReady = true;
          return resolve();
        }
      });
    });
  }

  login(jwtData) {
    const options = {
      type: 'auth',
      token: jwtData
    };

    if (!this.isReady) {
      throw new Error('iFrame has not finished loading.');
    }

    this.iframe.contentWindow.postMessage(options, this.opts.wealthscopeUrl);
  }

  logout() {
    const options = {
      type: 'logout'
    };

    if (!this.isReady) {
      throw new Error('iFrame has not finished loading.');
    }

    this.iframe.contentWindow.postMessage(options, this.opts.wealthscopeUrl);
  }
}
