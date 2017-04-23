import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import SubscriptionForm from '../../components/subscription-form/subscription-form';
import SpeakersList from '../../components/speakers-list/speakers-list';
import { loadEvents, searchSpeakers, speakersSelector } from '../events/events-reducer';

class SpeakersPageContainer extends React.Component {
    componentDidMount() {
        this.props.loadEvents();
    }
    render() {
        return (
            <div>
                <SubscriptionForm />
                <SpeakersList {...this.props} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isFetching: state.events.get('isFetching'),
    speakersList: speakersSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    loadEvents,
    onSearch: searchSpeakers,
}, dispatch);

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(SpeakersPageContainer),
);
