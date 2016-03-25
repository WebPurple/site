import {IAction} from "./actions";

export const TOGGLE_LEFT_NAV = 'toggle_left_nav';

export function toggleLeftNav(): IAction<void> {
    return {
        type: TOGGLE_LEFT_NAV
    }
}