import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import {
    setEvent,
    setEventAttendees,
    setEventPhotos,
    clearEvent,
    addAttendee,
    removeAttendee,
    requestEvent,
} from './../../actions/event.action';

import { getJson, postJson, deleteJson } from './../../utils/ajax';

import Loader from './../../components/common/loader';
import NotFound from './../../components/common/not-found';

import EventPage from './../../components/event-page/event-page';

const StyledLoader = styled(Loader) `
    margin: 15rem auto;
`;

class EventPageContainer extends React.Component {

    static propTypes = {
        event: React.PropTypes.object,
        attendees: React.PropTypes.arrayOf(React.PropTypes.object),
        photos: React.PropTypes.arrayOf(React.PropTypes.string),
        isFetching: React.PropTypes.bool,
        currentUser: React.PropTypes.object,
        match: React.PropTypes.any, // react-router filling this prop
        loadEvent: React.PropTypes.func,
        cleanEvent: React.PropTypes.func,
        becomeAttendee: React.PropTypes.func,
        stopBeingAttendee: React.PropTypes.func,
    }

    constructor() {
        super();

        this.becomeAttendee = this.becomeAttendee.bind(this);
        this.stopBeingAttendee = this.stopBeingAttendee.bind(this);
    }

    componentWillMount() {
        this.props.loadEvent(this.props.match.params.eventId);
    }

    componentWillUnmount() {
        this.props.cleanEvent();
    }

    becomeAttendee() {
        return this.props.becomeAttendee(this.props.match.params.eventId, this.props.currentUser);
    }

    stopBeingAttendee() {
        return this.props.stopBeingAttendee(this.props.match.params.eventId, this.props.currentUser);
    }

    render() {
        // if event data is fetching - show loader
        if (this.props.isFetching) {
            return <StyledLoader size="80" border="8" />;
        }
        // if event data is fetched and there are no event data - show NotFound page
        if (!this.props.event) {
            return <NotFound />;
        }
        // data fetched and exist
        return (
            <EventPage
                event={this.props.event}
                currentUser={this.props.currentUser}
                images={this.props.photos}
                becomeAttendee={this.becomeAttendee}
                stopBeingAttendee={this.stopBeingAttendee} />
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.user.account,
    event: state.currentEvent.event,
    attendees: state.currentEvent.attendees,
    photos: state.currentEvent.photos,
    isFetching: state.currentEvent.isFetching,
});

const mapDispatchToProps = dispatch => ({
    loadEvent: (eventId) => {
        dispatch(requestEvent());
        return getJson(`/api/event/${eventId}`)
            .then(event => {
                dispatch(setEvent(event));
                dispatch(setEventAttendees(event.attendees));
                getJson(`/api/event/${eventId}/photos`)
                    .catch(() => [])
                    .then(photos => dispatch(setEventPhotos(photos)));
            })
            .catch(() => dispatch(clearEvent()));
    },
    cleanEvent: () => dispatch(clearEvent()),
    becomeAttendee: (eventId, user) => (
        postJson(`/api/event/${eventId}/attendees`)
            .then(() => dispatch(addAttendee(user)))
            .catch(() => {})
    ),
    stopBeingAttendee: (eventId, user) => (
        deleteJson(`/api/event/${eventId}/attendees`)
            .then(() => dispatch(removeAttendee(user)))
            .catch(() => {})
    ),
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(EventPageContainer)
);
