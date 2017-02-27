import leftNavReducer from './../../../src/containers/navigation/navigation-bar.reducer';
import { TOGGLE_LEFT_NAV } from './../../../src/containers/navigation/navigation-bar.actions';

describe('left-nav.reducer', () => {
    const state = Object.freeze({ leftNavOpen: true });
    const toggleAction = { type: TOGGLE_LEFT_NAV };

    it('should create empty object on init', () => expect(leftNavReducer(undefined, {})).toBeDefined());

    it('should return old state on unknown action', () => expect(leftNavReducer(state, {})).toEqual(state));

    it('should toggle correctly', () => {
        const newState = leftNavReducer(state, toggleAction);
        expect(newState.leftNavOpen).toBe(false);

        expect(leftNavReducer(newState, toggleAction).leftNavOpen).toBe(true);
    });
});
