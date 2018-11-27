const {version} = require('../package.json');

module.exports = class WealthscopeSdk {
  static version() {
    return version;
  }

  render(element) {
    this.element = element;

    const iframe = document.createElement('iframe');
    const html = '<body style="color: red;">Hello World</body>';
    iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(html);
    element.appendChild(iframe);

    this.iframe = iframe;
  }
};
