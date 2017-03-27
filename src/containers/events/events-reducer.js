import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import unionWith from 'lodash.unionwith';

import { getJson } from '../../utils/ajax';

const REQUEST_EVENTS = 'events/request-events';
const RECEIVE_EVENTS = 'events/receive-events';

const initialState = fromJS({ eventList: [] });

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_EVENTS:
            return state.set('eventList', action.payload);
        default:
            return state;
    }
}

// ACTION CREATORS

function requestEvents() {
    return { type: REQUEST_EVENTS };
}

function receiveEvents(events) {
    return { type: RECEIVE_EVENTS, payload: events };
}

export function loadEvents() {
    return dispatch => {
        dispatch(requestEvents());
        return getJson('/api/events')
            .then(events => dispatch(receiveEvents(events)));
    };
}

// SELECTORS

export const eventListSelector = state => state.events.get('eventList');

export const eventTagsSelector = createSelector(
    eventListSelector,
    events => unionWith(...events.map(event => event.tags), (a, b) => a === b)
);
