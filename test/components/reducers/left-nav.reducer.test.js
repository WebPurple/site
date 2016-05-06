var expect = require('chai').expect;

var leftNavReducer = require('./../../../src/reducers/left-nav.reducer').default;
var TOGGLE_LEFT_NAV = require('./../../../src/actions/left-nav.actions').TOGGLE_LEFT_NAV;

describe('left-nav.reducer', function () {

    var toggleAction = {type: TOGGLE_LEFT_NAV};

    it('should toggle correctly', function () {
        expect(leftNavReducer({leftNavOpen: true}, toggleAction).leftNavOpen).to.be.false;

        expect(leftNavReducer({leftNavOpen: false}, toggleAction).leftNavOpen).to.be.true;
    });
});