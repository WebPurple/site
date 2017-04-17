import { fromJS, List, Set } from 'immutable';
import { createSelector } from 'reselect';
import { getFormValues, change } from 'redux-form';
import unionWith from 'lodash.unionwith';

import { getJson, mapQueryStringToObject } from '../../utils/ajax';

const REQUEST_EVENTS = 'events/request-events';
const RECEIVE_EVENTS = 'events/receive-events';

const TOGGLE_TAG = 'events/toggle-tag';

export const FORM_KEY = 'events-page';
const SEARCH_KEY = 'search';

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

export const search = searchValue => change(FORM_KEY, SEARCH_KEY, searchValue);

// SELECTORS

export const selectedTagsSelector = state => state.events.get('selectedTags');

export const allEventsSelector = state => state.events.get('eventList');

export const showFilterSelector = (state, props) => mapQueryStringToObject(props.location.search).show || 'all';

const formSelector = state => getFormValues(FORM_KEY)(state);

const searchSelector = createSelector(
    formSelector,
    form => form && form[SEARCH_KEY]
);

export const eventListSelector = createSelector(
    allEventsSelector,
    showFilterSelector,
    selectedTagsSelector,
    searchSelector,

    (events, show, selectedTags, searchValue) => events.filter(event => {
        const date = new Date(event.date);
        const now = new Date();

        if ((show === 'upcoming' && date < now)
            || (show === 'past' && date > now)) {
            return false;
        }

        if (searchValue) {

            searchValue = searchValue.toLowerCase(); // eslint-disable-line no-param-reassign

            const doesAnyFieldContainSearchString = ['date', 'title', 'talks', 'location']
                .map(fieldName => {

                    if (fieldName === 'talks') {
                        return event.talks.map(talk => talk.title).join(' ').toLowerCase();
                    }

                    return event[fieldName].toLowerCase();
                })
                .some(fieldValue => fieldValue.indexOf(searchValue) !== -1);

            if (!doesAnyFieldContainSearchString) {
                return false;
            }
        }

        return selectedTags.isEmpty() || selectedTags.isSubset(event.tags);
    })
);

export const eventTagsSelector = createSelector(
    eventListSelector,
    events => unionWith(...events.map(event => event.tags), (a, b) => a === b)
);

const talksSelector = createSelector(
    allEventsSelector,
    events => events
        .map(event => event.talks.map(talk => ({ ...talk, event })))
        .reduce((allTalks, eventTalks) => allTalks.concat(eventTalks), [])
);

export const pastTalksSelector = createSelector(
    talksSelector,
    talks => talks.filter(talk => new Date(talk.event.date) < new Date())
);

export const speakersSelector = createSelector(
    talksSelector,
    searchSelector,
    (talks, searchValue) => talks
            .filter(({ speaker }) => searchValue ? (speaker.displayName.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) : true)
            .reduce((result, talk) => {
                const index = result.findIndex(speaker => speaker._id === talk.speaker._id);
                if (index !== -1) {
                    result[index].talks.push(talk.title);
                } else {
                    result.push(Object.assign(talk.speaker, { talks: [talk.title] }));
                }

                return result;
            }, [])
);
