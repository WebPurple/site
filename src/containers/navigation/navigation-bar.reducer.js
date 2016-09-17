import { TOGGLE_LEFT_NAV } from './navigation-bar.actions';

export default function (state = { leftNavOpen: true }, action) {
    switch (action.type) {
        case TOGGLE_LEFT_NAV:
            return {
                ...state,
                leftNavOpen: !state.leftNavOpen,
            };
        default:
            return state;
    }
}
