var assert = require('assert');
var WealthscopeSdk = require('../lib/index').WealthscopeSdk;

describe('class WealthscopeSdk', function() {
    it('constructs successfully', function() {
        assert.ok(new WealthscopeSdk())
    });
});