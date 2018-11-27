const {version} = require('./package.json');

module.exports = class WealthscopeSdk {
  static version() {
    return version;
  }
};
