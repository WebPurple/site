import { expect } from 'chai';

import leftNavReducer from './../../src/reducers/left-nav.reducer';
import { TOGGLE_LEFT_NAV } from './../../src/actions/left-nav.actions';

describe('left-nav.reducer', () => {
    const toggleAction = { type: TOGGLE_LEFT_NAV };

    it('should toggle correctly', () => {
        expect(leftNavReducer({ leftNavOpen: true }, toggleAction).leftNavOpen).to.be.false;

        expect(leftNavReducer({ leftNavOpen: false }, toggleAction).leftNavOpen).to.be.true;
    });
});
