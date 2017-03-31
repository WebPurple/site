import React from 'react';
import styled, { withTheme } from 'styled-components';

import { List, Set } from 'immutable';

import { media } from '../../utils/css-utils';
import BlockHeader from '../common/block-header';
import { TagList } from '../common/tag';
import Loader from '../common/loader';
import {
    FilterBlock,
    FilterTab,
    Search,
} from '../page-filter';
import {
    ClockIcon,
    PlaceholderIcon,
} from '../icons';

const Container = styled.section`
    padding: 6rem 2rem;
    ${media.desktop`padding: 10rem;`}
    ${media.hd`padding: 12rem;`}
`;

const EventList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 3.6rem 0 0;
    ${media.desktop`margin-top: 10rem;`}
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const EventSnippet = styled.li`
    position: relative;
    width: 100%;
    ${media.tablet`width: 30rem;`}
    ${media.hd`width: 35rem;`}
    padding: 2.5rem;
    margin-bottom: 2rem;
    ${media.desktop`margin-bottom: 7rem;`}
    box-sizing: border-box;
    overflow: hidden;
    box-shadow: 0 0 8px 1px #bbb;
`;

const BackgroundShape = styled.div`
    position: absolute;
    top: 0;
    left: -60%;
    width: 230%;
    height: 100%;
    transform: skew(-60deg, 0);
    overflow: hidden;
    z-index: -1;
`;

const BackgroundImage = styled.div`
    width: 100%;
    height: 100%;
    filter: grayscale(100);
    opacity: .15;
    background: url(${props => props.url});
    background-repeat: no-repeat;
    background-size: cover;
    transform: skew(60deg, 0);
`;

const Title = styled.a`
    margin: 2.4rem 0;
    font-family: 'Rubik', sans-serif;
    font-size: 3.6rem;
    font-weight: bold;
    text-decoration: none;
    color: ${props => props.color || props.theme.vividPurpleTwo};
`;

const Info = styled.span`
    display: flex;
    margin-bottom: 1.6rem;
    font-size: 1.6em;
    font-family: 'Oxygen', sans-serif;
    color: ${props => props.theme.greyishBrown};
    vertical-align: middle;
`;

const TalkList = styled.ul`
    list-style: disc;
    font-family: 'Oxygen', sans-serif;
    font-size: 1.6rem;
    margin: 2.4rem 0;
    color: #4a4a4a;
`;

const Talk = styled.li`
    margin: 1.6rem 0;
`;

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

const EventsFeed = ({ events, tags, selectedTags, isFetching, show, theme, onTagClick }) => (
    <Container>
        <BlockHeader>Events</BlockHeader>
        <FilterBlock>
            <FlexRow>
                {['All', 'Upcoming', 'Past'].map(filter => (
                    <FilterTab key={filter} to={`/events?show=${filter.toLowerCase()}`} data-active={show === filter.toLowerCase()}>{filter}</FilterTab>
                ))}
            </FlexRow>
            <Search placeholder="Keyword..." />
        </FilterBlock>

        {(tags.length > 0 || !selectedTags.isEmpty()) && (
            <TagList label="Events tags" tags={tags.length > 0 ? tags : selectedTags.toList()} selectedTags={selectedTags} onTagClick={onTagClick} />
        )}

        {isFetching ? <StyledLoader size="80" border="8" />
            : events.size === 0 ? <NoEventsBlock>There is no events satisfying your query...</NoEventsBlock>
            : (
                <EventList>
                    {events.map((event, eventIndex) => (
                        <EventSnippet key={event._id}>
                            <BackgroundShape>
                                <BackgroundImage url={event.image} />
                            </BackgroundShape>
                            <header>
                                <Info>
                                    <ClockIcon style={{ marginRight: '1.6rem' }} />
                                    <time>{new Date(event.date).toLocaleDateString()}</time>
                                </Info>
                                <Info>
                                    <PlaceholderIcon style={{ marginRight: '1.6rem' }} />
                                    <span>{event.location}</span>
                                </Info>
                                <Title color={eventIndex % 2 ? theme.vividPurpleTwo : theme.lipstick} href={`#${event.title}`}>{event.title}</Title>
                            </header>
                            <TalkList>
                                {event.talks.map((talk, i) => <Talk key={i}>{talk.title}</Talk>)}
                            </TalkList>
                            <TagList tags={event.tags} />
                        </EventSnippet>
                    ))}
                </EventList>
            )}
    </Container>
);

EventsFeed.propTypes = {
    events: React.PropTypes.instanceOf(List).isRequired,
    tags: React.PropTypes.arrayOf(String),
    selectedTags: React.PropTypes.instanceOf(Set),
    show: React.PropTypes.string,
    onTagClick: React.PropTypes.func,
};

export default withTheme(EventsFeed);
