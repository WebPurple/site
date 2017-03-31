import { fromJS, List, Set } from 'immutable';
import { createSelector } from 'reselect';
import unionWith from 'lodash.unionwith';

import { getJson, mapQueryStringToObject } from '../../utils/ajax';

const REQUEST_EVENTS = 'events/request-events';
const RECEIVE_EVENTS = 'events/receive-events';

const TOGGLE_TAG = 'events/toggle-tag';

const initialState = fromJS({
    isFetching: false,
    eventList: [],
    selectedTags: new Set(),
});

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case RECEIVE_EVENTS:
            return state
                .set('isFetching', false)
                .set('eventList', new List(action.payload));
        case TOGGLE_TAG:
            return state.update('selectedTags',
                selectedTags => selectedTags.has(action.payload)
                    ? selectedTags.delete(action.payload)
                    : selectedTags.add(action.payload));
        case REQUEST_EVENTS:
            return state.set('isFetching', true);
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

export const toggleTag = tag => ({ type: TOGGLE_TAG, payload: tag });

// SELECTORS

export const selectedTagsSelector = state => state.events.get('selectedTags');

export const allEventsSelector = state => state.events.get('eventList');

export const showFilterSelector = (state, props) => mapQueryStringToObject(props.location.search).show || 'all';

export const eventListSelector = createSelector(
    [allEventsSelector, showFilterSelector, selectedTagsSelector],

    (events, show, selectedTags) => events.filter(event => {
        const date = new Date(event.date);
        const now = new Date();

        if ((show === 'upcoming' && date < now)
            || (show === 'past' && date > now)) {
            return false;
        }

        return selectedTags.isEmpty() || selectedTags.isSubset(event.tags);
    })
);

export const eventTagsSelector = createSelector(
    eventListSelector,
    events => unionWith(...events.map(event => event.tags), (a, b) => a === b)
);
