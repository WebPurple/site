import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import {
    loadEvent,
    cleanEvent,
    becomeAttendee,
    stopBeingAttendee,
} from './../../reducers/current-event.reducer';

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
        match: React.PropTypes.object, // react-router filling this prop
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
                attendees={this.props.attendees}
                currentUser={this.props.currentUser}
                images={this.props.photos}
                becomeAttendee={this.becomeAttendee}
                stopBeingAttendee={this.stopBeingAttendee} />
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.user.account,
    event: state.currentEvent.get('event'),
    attendees: Array.from(state.currentEvent.get('attendees').values()),
    photos: Array.from(state.currentEvent.get('photos')),
    isFetching: state.currentEvent.get('isFetching'),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    loadEvent,
    cleanEvent,
    becomeAttendee,
    stopBeingAttendee,
}, dispatch);

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(EventPageContainer),
);
