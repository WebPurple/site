export const SET_EVENT = 'current-event/set_event';
export const SET_ATTENDEES = 'current-event/set_attendees';
export const SET_PHOTOS = 'current-event/set_photos';
export const REQUEST_EVENT = 'current-event/request_event';
export const CLEAR_EVENT = 'current-event/clear_event';
export const ADD_ATTENDEE = 'current-event/add_attendee';
export const REMOVE_ATTENDEE = 'current-event/remove_attendee';

export const setEvent = (event) => ({
    type: SET_EVENT,
    payload: event,
});

export const setEventAttendees = (attendees) => ({
    type: SET_ATTENDEES,
    payload: attendees,
});

export const setEventPhotos = (photos) => ({
    type: SET_PHOTOS,
    payload: photos,
});

export const requestEvent = () => ({ type: REQUEST_EVENT });

export const clearEvent = () => ({ type: CLEAR_EVENT });

export const addAttendee = (user) => ({
    type: ADD_ATTENDEE,
    payload: user,
});

export const removeAttendee = (user) => ({
    type: REMOVE_ATTENDEE,
    payload: user,
});
