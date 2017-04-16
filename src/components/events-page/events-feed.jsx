import React from 'react';
import styled from 'styled-components';

import { List, Set } from 'immutable';

import {
    isPhone,
    isTablet,
} from '../../utils/css-utils';
import BlockHeader from '../common/block-header';
import MainContainer from '../common/main-container';
import { TagList } from '../common/tag';
import Loader from '../common/loader';
import {
    FilterBlock,
    FilterTab,
    Search,
} from '../page-filter';
import EventList from './event-list';

const FlexRow = styled.div`
    display: flex;
`;

const StyledLoader = styled(Loader)`
    margin: 15rem auto;
`;

const NoEventsBlock = styled.div`
    margin: 10rem 0;
    text-align: center;
    font-family: 'Oxygen', sans-serif;
    font-size: 2.5rem;
    color: ${props => props.theme.warmPurple};
`;

class EventsFeed extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showSearch: false };

        this.toggleSearch = this.toggleSearch.bind(this);
        this.handleSearchFocus = this.handleSearchFocus.bind(this);
        this.handleSearchBlur = this.handleSearchBlur.bind(this);
    }

    toggleSearch(showSearch) {
        this.setState({ showSearch });
    }

    shouldExpandSearch() {
        return isPhone() || isTablet();
    }

    handleSearchFocus() {
        if (this.shouldExpandSearch()) {
            this.toggleSearch(true);
        }
    }

    handleSearchBlur() {
        if (this.shouldExpandSearch()) {
            this.toggleSearch(false);
        }
    }

    render() {
        const {
            events,
            tags,
            selectedTags,
            isFetching,
            show,
            onTagClick,
            onSearch,
            onCreateEvent,
        } = this.props;
        const { showSearch } = this.state;

        return (
            <MainContainer>
                <BlockHeader>Events</BlockHeader>
                <FilterBlock>
                    {!showSearch && (/* TODO: animate */
                        <FlexRow>
                            {['All', 'Upcoming', 'Past'].map(filter => (
                                <FilterTab key={filter} to={`/events?show=${filter.toLowerCase()}`} data-active={show === filter.toLowerCase()}>{filter}</FilterTab>
                            ))}
                            <button onClick={onCreateEvent}>Add event</button>
                        </FlexRow>
                    )}
                    <Search
                        placeholder="Keyword..."
                        onChange={event => onSearch(event.target.value)}
                        onFocus={this.handleSearchFocus}
                        onBlur={this.handleSearchBlur} />
                </FilterBlock>

                {(tags.length > 0 || !selectedTags.isEmpty()) && (
                    <TagList label="Events tags" tags={tags.length > 0 ? tags : selectedTags.toList()} selectedTags={selectedTags} onTagClick={onTagClick} />
                )}

                {isFetching ? <StyledLoader size="80" border="8" />
                    : events.size === 0
                        ? <NoEventsBlock>There is no events satisfying your query...</NoEventsBlock>
                        : <EventList events={events} />
                }
            </MainContainer>
        );
    }
}

EventsFeed.propTypes = {
    events: React.PropTypes.instanceOf(List).isRequired,
    tags: React.PropTypes.arrayOf(String),
    selectedTags: React.PropTypes.instanceOf(Set),
    show: React.PropTypes.string,
    onTagClick: React.PropTypes.func,
    onCreateEvent: React.PropTypes.func,
    isFetching: React.PropTypes.bool,
};

export default EventsFeed;
