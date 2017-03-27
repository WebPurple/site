import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    loadEvents,
    eventListSelector,
    eventTagsSelector,
} from './events-reducer';
import EventsFeed from '../../components/events-page/events-feed';

class EventsFeedContainer extends React.Component {

    static loadEvents = React.PropTypes.func.isRequired;
    static events = React.PropTypes.array.isRequired;
    static tags = React.PropTypes.array.isRequired;

    componentDidMount() {
        this.props.loadEvents();
    }

    render() {
        const { events, tags } = this.props;
        return <EventsFeed events={events} tags={tags} />;
    }
}

const mapStateToProps = state => ({
    events: eventListSelector(state),
    tags: eventTagsSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    loadEvents,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventsFeedContainer);
