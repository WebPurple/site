import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
        return <EventsFeed {...this.props} />;
    }
}

const searchStringToObject = query => query.substr(1).split('&')
    .reduce((result, paramWithValue) => {
        paramWithValue = paramWithValue.split('='); // eslint-disable-line no-param-reassign

        result[paramWithValue[0]] = paramWithValue[1]; // eslint-disable-line no-param-reassign

        return result;
    }, {});

const mapStateToProps = (state, ownProps) => ({
    events: eventListSelector(state),
    tags: eventTagsSelector(state),
    show: searchStringToObject(ownProps.location.search).show,
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
