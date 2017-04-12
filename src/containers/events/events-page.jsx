import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';

import SubscriptionForm from '../../components/subscription-form/subscription-form';
import {
    loadEvents,
    eventListSelector,
    showFilterSelector,
    eventTagsSelector,
    selectedTagsSelector,
    toggleTag,
    FORM_KEY,
    search,
} from './events-reducer';
import EventsFeed from '../../components/events-page/events-feed';

class EventsPageContainer extends React.Component {

    static loadEvents = React.PropTypes.func.isRequired;
    static events = React.PropTypes.array.isRequired;
    static tags = React.PropTypes.array.isRequired;

    componentDidMount() {
        this.props.loadEvents();
    }

    render() {
        return (
            <div>
                <SubscriptionForm />
                <EventsFeed {...this.props} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    events: eventListSelector(state, ownProps),
    tags: eventTagsSelector(state, ownProps),
    selectedTags: selectedTagsSelector(state, ownProps),
    show: showFilterSelector(state, ownProps),
    isFetching: state.events.get('isFetching'),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    loadEvents,
    onTagClick: toggleTag,
    onSearch: search,
}, dispatch);


export default withRouter(
    reduxForm({ form: FORM_KEY })(
        connect(
            mapStateToProps,
            mapDispatchToProps
        )(EventsPageContainer)
    )
);
