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

    describe('initialization', function() {
        it('renders an iframe', function() {
            const div = document
                .createElement('div');
                
            div.setAttribute('id', 'output');
            document.body.append(div);
            const renderedDiv = document.getElementById('output');
            // make sure the div exists
            assert.ok(renderedDiv);
    
            const ws = new WealthscopeSdk();
            ws.render(renderedDiv);
    
            assert.ok(div.getElementsByTagName('iframe')[0])
        })
    })
});