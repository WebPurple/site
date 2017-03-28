import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    loadEvents,
    eventListSelector,
    showFilterSelector,
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
        return <EventsFeed {...this.props} />;
    }
}

const mapStateToProps = (state, ownProps) => ({
    events: eventListSelector(state, ownProps),
    tags: eventTagsSelector(state, ownProps),
    show: showFilterSelector(state, ownProps),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    loadEvents,
}, dispatch);

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EventsFeedContainer)
);
