import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { getJson, putJson, deleteJson } from './../../utils/ajax';

import Loader from './../../components/common/loader';
import NotFound from './../../components/common/not-found';

import EventPage from './../../components/event-page/event-page';

const StyledLoader = styled(Loader) `
    margin: 15rem auto;
`;

class EventPageContainer extends React.Component {

    static propTypes = {
        event: React.PropTypes.object,
        currentUser: React.PropTypes.object,
        match: React.PropTypes.any, // react-router filling this prop
        openModal: React.PropTypes.func,
        closeModal: React.PropTypes.func,
    }

    constructor() {
        super();

        this.state = {
            event: null,
            isFetching: true,
            images: [],
        };

        this.becomeAttendee = this.becomeAttendee.bind(this);
        this.stopBeingAttendee = this.stopBeingAttendee.bind(this);
    }

    componentWillMount() {
        this.getEventObject();
        this.getEventPhotos();
    }

    getEventObject() {
        return getJson(`/api/event/${this.props.match.params.eventId}`)
            .then(event => this.setState({ ...this.state, event, isFetching: false }))
            .catch(() => this.setState({ ...this.state, event: null, isFetching: false }));
    }

    getEventPhotos() {
        return getJson(`/api/event/${this.props.match.params.eventId}/photos`)
            .then(photos => this.setState({ ...this.state, images: photos }))
            .catch(() => this.setState({ ...this.state, images: [] }));
    }

    becomeAttendee(event) {
        return putJson(`/api/event/${event._id}/attendees`);
    }

    stopBeingAttendee(event) {
        return deleteJson(`/api/event/${event._id}/attendees`);
    }

    render() {
        // if event data is fetching - show loader
        if (this.state.isFetching) {
            return <StyledLoader size="80" border="8" />;
        }
        // if event data is fetched and there are no event data - show NotFound page
        if (!this.state.event) {
            return <NotFound />;
        }
        // data fetched and exist
        return (
            <EventPage
                event={this.state.event}
                currentUser={this.props.currentUser}
                images={this.state.images}
                becomeAttendee={this.becomeAttendee}
                stopBeingAttendee={this.stopBeingAttendee} />
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.user.account,
});

export default withRouter(
    connect(
        mapStateToProps,
    )(EventPageContainer)
);
