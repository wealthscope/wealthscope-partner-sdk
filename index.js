const {version} = require('./package.json');

module.exports = class WealthscopeSdk {
  static getVersion() {
    return version;
  }
};
