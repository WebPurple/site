import { expect } from 'chai';

import leftNavReducer from './../../../src/containers/navigation/navigation-bar.reducer';
import { TOGGLE_LEFT_NAV } from './../../../src/containers/navigation/navigation-bar.actions';

describe('left-nav.reducer', () => {
    const state = Object.freeze({ leftNavOpen: true });
    const toggleAction = { type: TOGGLE_LEFT_NAV };

    it('should create empty object on init', () => expect(leftNavReducer(undefined, {})).to.be.defined);

    it('should return old state on unknown action', () => expect(leftNavReducer(state, {})).to.equal(state));

    it('should toggle correctly', () => {
        const newState = leftNavReducer(state, toggleAction);
        expect(newState.leftNavOpen).to.be.false;

        expect(leftNavReducer(newState, toggleAction).leftNavOpen).to.be.true;
    });
});
