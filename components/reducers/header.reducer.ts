import {RECEIVE_USER} from "../actions/user.actions";

const header = (state = {}, action: {type: string, payload: any}) => {
    switch (action.type) {
        case RECEIVE_USER:
            return Object.assign({}, state, {
                user: action.payload
            });
        default:
            return state;
    }
};

export default header;