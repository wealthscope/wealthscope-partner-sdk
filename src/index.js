const {version} = require('../package.json');

// class WsInitializationError extends Error {}

// function requirePresence(options, property) {
//   if (!options || !options[property]) {
//     throw new WsInitializationError(`Option ${property} is mandatory`);
//   }
// }

export class WealthscopeSdk {
  constructor(opts) {
    // A queue to hold messages that are to be dispatched
    this.msgQueue = [];

    // Flag which signifies whether the iFrame is ready
    this.isReady = false;

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

    if (this.msgQueue.length > 0) {
      if (this.isReady) {
        // Dequeue the queue if the iFrame is ready
        const {contentWindow} = this.iframe;
        while (this.msgQueue.length > 0) {
          const message = this.msgQueue.shift();
          contentWindow.postMessage(message, this.opts.wealthscopeUrl);
        }
      } else {
        // Set a timeout to attempt again in 250ms
        if (this.nextDequeueAttempt == null) {
          this.nextDequeueAttempt = setTimeout(this._dequeue.bind(this), 250);
        }
      }
    }
  }
}
