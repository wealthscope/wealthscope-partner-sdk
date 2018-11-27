var pkg = require('../package.json');
var assert = require('assert');
var WealthscopeSdk = require('../lib/index').WealthscopeSdk;

describe('class WealthscopeSdk', function() {
    it('constructs successfully', function() {
        assert.ok(new WealthscopeSdk())
    });

    it('reports the version present in package.json', function() {
        const version = WealthscopeSdk.version();
        assert.equal(version, pkg.version)
    });
});