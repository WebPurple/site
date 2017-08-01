import {
    fromJS,
    List,
    Map,
} from 'immutable';
import {
    createAction,
} from 'redux-actions';

import {
    getJson,
    postJson,
    deleteJson,
} from './../utils/ajax';

export const SET_EVENT = 'current-event/set_event';
export const SET_ATTENDEES = 'current-event/set_attendees';
export const SET_PHOTOS = 'current-event/set_photos';
export const REQUEST_EVENT = 'current-event/request_event';
export const CLEAR_EVENT = 'current-event/clear_event';

const initialState = fromJS({
    event: null,
    attendees: new Map(),
    photos: new List(),
    isFetching: false,
});

export default function currentEventReducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_EVENT:
            return state.set('isFetching', true);
        case SET_EVENT:
            return state
                .set('isFetching', false)
                .set('event', action.payload);
        case CLEAR_EVENT:
            return initialState;
        case SET_PHOTOS:
            return state.set('photos', new List(action.payload));
        case SET_ATTENDEES:
            return state.set('attendees', new Map(action.payload.map(attendee => [attendee._id, attendee])));
        default:
            return state;
    }
}

// ACTION CREATORS
export const setEvent = createAction(SET_EVENT);
export const setEventAttendees = createAction(SET_ATTENDEES);
export const setEventPhotos = createAction(SET_PHOTOS);
export const requestEvent = createAction(REQUEST_EVENT);
export const clearEvent = createAction(CLEAR_EVENT);

// ACTION HANDLERS
export function loadEvent(eventId) {
    return dispatch => {
        dispatch(requestEvent());
        getJson(`/api/event/${eventId}`)
            .then(event => {
                dispatch(setEvent(event));
                dispatch(setEventAttendees(event.attendees));
                getJson(`/api/event/${eventId}/photos`)
                    .catch(() => [])
                    .then(photos => dispatch(setEventPhotos(photos)));
            })
            .catch(() => dispatch(clearEvent()));
    };
}

export const cleanEvent = () => dispatch => dispatch(clearEvent());

export function becomeAttendee(eventId) {
    return dispatch => (
        postJson(`/api/event/${eventId}/attendees`)
        .then(({ attendees }) => dispatch(setEventAttendees(attendees)))
        .catch(() => {})
    );
}

export function stopBeingAttendee(eventId) {
    return dispatch => (
        deleteJson(`/api/event/${eventId}/attendees`)
        .then(({ attendees }) => dispatch(setEventAttendees(attendees)))
        .catch(() => {})
    );
}
