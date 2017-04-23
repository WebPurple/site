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
    searchEvents,
    addEvent,
} from './events-reducer';
import EventsFeed from '../../components/events-page/events-feed';
import EditEventForm from './edit-event-form';

class EventsPageContainer extends React.Component {

    static propTypes = {
        loadEvents: React.PropTypes.func.isRequired,
        onAddEvent: React.PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = { editFormOpen: false };
        this.handleCreateEvent = this.handleCreateEvent.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.onSubmitEvent = this.onSubmitEvent.bind(this);
    }

    componentDidMount() {
        this.props.loadEvents();
    }

    onSubmitEvent(event) {
        this.props.onAddEvent(event)
            .then(this.handleCloseModal); // TODO: use redux
    }

    handleCreateEvent() {
        this.setState({ editFormOpen: true });
    }

    handleCloseModal() {
        this.setState({ editFormOpen: false });
    }

    render() {
        return (
            <div>
                <SubscriptionForm />
                <EventsFeed {...this.props} onCreateEvent={this.handleCreateEvent} />
                {this.state.editFormOpen && <EditEventForm onSubmit={this.onSubmitEvent} onRequestClose={this.handleCloseModal} />}
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
    onSearch: searchEvents,
    onAddEvent: addEvent,
}, dispatch);

export default withRouter(
    reduxForm({ form: FORM_KEY })(
        connect(
            mapStateToProps,
            mapDispatchToProps,
        )(EventsPageContainer),
    ),
);
