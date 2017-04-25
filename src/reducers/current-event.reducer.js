import {
    ADD_ATTENDEE,
    CLEAR_EVENT,
    REMOVE_ATTENDEE,
    REQUEST_EVENT,
    SET_ATTENDEES,
    SET_EVENT,
    SET_PHOTOS,
} from './../actions/event.action';

const initialState = {
    event: null,
    attendees: [],
    photos: [],
    isFetching: false,
};

const currentEventReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_EVENT:
            return { ...state, isFetching: true };
        case SET_EVENT:
            return { ...state, event: action.payload, isFetching: false };
        case CLEAR_EVENT:
            return { ...initialState };
        case SET_PHOTOS:
            return { ...state, photos: action.payload };
        case SET_ATTENDEES:
            return { ...state, attendees: action.payload };
        case ADD_ATTENDEE:
            return { ...state, attendees: state.attendees.push(action.payload) };
        case REMOVE_ATTENDEE:
            return { ...state, attendees: state.attendees.filter(attendee => attendee._id !== action.payload._id) };
        default:
            return state;
    }
};

export default currentEventReducer;
