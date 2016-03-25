import {IAction} from '../actions/actions';
import {TOGGLE_LEFT_NAV} from "../actions/left-nav.actions";

export default function (state = {leftNavOpen: true}, action: IAction<any>) {
    switch (action.type) {
        case TOGGLE_LEFT_NAV:
            return Object.assign({}, state, {
                leftNavOpen: !state.leftNavOpen
            });
        default:
            return state;
    }
}