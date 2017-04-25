import { fromJS, List, Set } from 'immutable';
import { createSelector } from 'reselect';
import { createAction } from 'redux-actions';
import { getFormValues, change } from 'redux-form';
import unionWith from 'lodash/unionWith';

import { getJson, mapQueryStringToObject, postJson } from '../../utils/ajax';

const REQUEST_EVENTS = 'events/request-events';
const RECEIVE_EVENTS = 'events/receive-events';
const EVENT_ADDED = 'events/event-added';

const TOGGLE_TAG = 'events/toggle-tag';

export const FORM_KEY = 'events-page';
const SEARCH_EVENTS_KEY = 'search-events';
const SEARCH_SPEAKERS_KEY = 'search-speakers';

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
        case EVENT_ADDED:
            return state.update('eventList', eventList => eventList.unshift(action.payload)); // TODO: sort actions by date
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

const requestEvents = createAction(REQUEST_EVENTS);
const receiveEvents = createAction(RECEIVE_EVENTS);

export function loadEvents() {
    return dispatch => {
        dispatch(requestEvents());
        return getJson('/api/events')
            .then(events => dispatch(receiveEvents(events)));
    };
}

export const toggleTag = createAction(TOGGLE_TAG);

export const searchEvents = searchValue => change(FORM_KEY, SEARCH_EVENTS_KEY, searchValue);
export const searchSpeakers = searchValue => change(FORM_KEY, SEARCH_SPEAKERS_KEY, searchValue);

const eventAdded = createAction(EVENT_ADDED);

export const addEvent = event => dispatch => postJson('api/events', event)
    .then(newEvent => dispatch(eventAdded(newEvent)));

// SELECTORS

export const selectedTagsSelector = state => state.events.get('selectedTags');

export const allEventsSelector = state => state.events.get('eventList');

export const showFilterSelector = (state, props) => mapQueryStringToObject(props.location.search).show || 'all';

const formSelector = state => getFormValues(FORM_KEY)(state);

const searchEventsSelector = createSelector(
    formSelector,
    form => form && form[SEARCH_EVENTS_KEY],
);

const searchSpeakersSelector = createSelector(
    formSelector,
    form => form && form[SEARCH_SPEAKERS_KEY],
);

export const upcomingEventSelector = createSelector(
    allEventsSelector,
    () => new Date(),

    (events, now) => events
        .filter(e => new Date(e.date) > now)
        .maxBy(e => e.date),
);

export const eventListSelector = createSelector(
    allEventsSelector,
    showFilterSelector,
    selectedTagsSelector,
    searchEventsSelector,

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
    }),
);

const extractTags = events => unionWith(...events.map(event => event.tags), (a, b) => a === b);

export const allTagsSelector = createSelector(
    allEventsSelector,
    extractTags,
);

export const eventTagsSelector = createSelector(
    eventListSelector,
    extractTags,
);

const talksSelector = createSelector(
    allEventsSelector,
    events => events
        .map(event => event.talks.map(talk => ({ ...talk, event })))
        .reduce((allTalks, eventTalks) => allTalks.concat(eventTalks), []),
);

export const pastTalksSelector = createSelector(
    talksSelector,
    talks => talks.filter(talk => new Date(talk.event.date) < new Date()),
);

export const speakersSelector = createSelector(
    talksSelector,
    searchSpeakersSelector,
    (talks, searchValue) => talks
            .filter(({ speaker }) => searchValue ? (speaker.displayName.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) : true)
            .reduce((speakers, talk) => {
                const speaker = speakers.find(_speaker => _speaker._id === talk.speaker._id);
                if (speaker) {
                    speaker.talks.push(talk.title);
                } else {
                    speakers.push({ ...talk.speaker, talks: [talk.title] });
                }

                return speakers;
            }, []),
);
