import React from 'react';
import { connect } from 'react-redux';

import {
    loadEvents,
    pastTalksSelector,
    upcomingEventSelector,
} from '../events/events-reducer';

import PastEvents from '../../components/home-page/past-events';
import UpcomingEvents from '../../components/home-page/upcoming-events-block';
import SocialLinks from '../../components/home-page/social-links-block';
import SubscriptionForm from '../../components/subscription-form/subscription-form';

class HomePage extends React.Component {

    static propTypes = {
        loadEvents: React.PropTypes.func.isRequired,
        pastTalks: React.PropTypes.array,
        upcomingEvent: React.PropTypes.object,
    };

    componentDidMount() {
        this.props.loadEvents();
    }

    render() {
        const { pastTalks, upcomingEvent } = this.props;

        return (
            <div>
                {upcomingEvent && <UpcomingEvents event={upcomingEvent} />}
                <PastEvents talks={pastTalks} />
                <SubscriptionForm />
                <SocialLinks />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    pastTalks: pastTalksSelector(state),
    upcomingEvent: upcomingEventSelector(state),
});

const mapDispatchToProps = dispatch => ({
    loadEvents: () => dispatch(loadEvents()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomePage);
