import React from 'react';
import { Link } from 'react-router';
import styled, { withTheme } from 'styled-components';

import { media } from '../../utils/css-utils';
import BlockHeader from '../common/block-header';
import {
    ClockIcon,
    PlaceholderIcon,
    SearchIcon,
} from '../icons';

import events, { tags } from './events-stub';

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

const TagList = styled.ul`
    list-style: none;
    display: inline-flex;
    flex-wrap: wrap;
    padding: 0;
`;

const TagListLabel = styled.span`
    font-family: 'Rubik', sans-serif;
    font-size: 1.8rem;
    color: ${props => props.theme.greyishBrown};
    margin-right: 2.4rem;
`;

const tagColors = [
    '#f290b7',
    '#c788fe',
    '#d88e9e',
    '#a193b3',
];

// TODO: replace with theme colors
const hoverTagColors = [
    '#e62270',
    '#9012fe',
    '#b21d3d',
    '#662d91',
];

const Tag = styled.li`
    font-family: 'Oxygen', sans-serif;
    font-size: 1.6rem;
    color: #fff;
    padding: .4rem 1.6rem;
    white-space: nowrap;
    cursor: pointer;
    transition: all .2s ease-out;
    
    background: ${props => tagColors[props.index % tagColors.length]};
    &:hover {
        background: ${props => hoverTagColors[props.index % tagColors.length]};
    }
`;

const FilterBlock = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 4rem 0;
    border-bottom: 2px solid #ededed;
`;

const TimeFilterTabs = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
`;

const FilterTab = styled(Link)`
    position: relative;
    display: block;
    box-sizing: border-box;
    padding: 1.6rem 0;
    ${media.desktop`padding: 2.4rem 0;`}
    margin: 0 4.8rem 0 0;
    text-decoration: none;
    color: ${props => props.theme.greyishBrown}
    font-size: 1.8rem;
    ${media.desktop`font-size: 2.4rem;`}
    font-weight: bold;
    font-family: 'Rubik', sans-serif;
    
    &:hover {
    
        &:after {
            content: '';
            position: absolute;
            width: 100%;
            left: 0;
            bottom: -2px;
            border-bottom: 4px solid ${props => props.theme.lipstick};
        }
    }
`;

const SearchBlock = styled.div`
    display: none;
    ${media.desktop`display: flex;`}
    align-items: center;
`;
const SearchInput = styled.input`
    border: 0;
    font-size: 2.4rem;
    font-family: 'Oxygen', sans-serif;
    outline: none;
`;

const StyledSearchIcon = styled(SearchIcon)`
    height: 2.8rem;
    width: 2.8rem;
    margin-left: 1rem;
    fill: #ccc;
`;

export default withTheme(theme => (
    <Container>
        <BlockHeader>Events</BlockHeader>
        <FilterBlock>
            <TimeFilterTabs>
                <li><FilterTab to="/events?show=upcomming">Upcoming</FilterTab></li>
                <li><FilterTab to="/events?show=past">Past</FilterTab></li>
                <li><FilterTab to="/events?show=all">All</FilterTab></li>
            </TimeFilterTabs>
            <SearchBlock>
                <SearchInput type="text" placeholder="Keywords..." />
                <StyledSearchIcon />
            </SearchBlock>
        </FilterBlock>
        <div>
            <TagListLabel>Events tags</TagListLabel>
            <TagList>
                {tags.map((tag, i) => <Tag key={tag} index={i}>{tag}</Tag>)}
            </TagList>
        </div>
        <EventList>
            {events.map((event, eventIndex) => (
                <EventSnippet key={event.title}>
                    <BackgroundShape>
                        <BackgroundImage url={event.background} />
                    </BackgroundShape>
                    <header>
                        <Info>
                            <ClockIcon style={{ marginRight: '1.6rem' }} />
                            <time>{event.date.toLocaleDateString()}</time>
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
                    <TagList>
                        {event.tags.map((tag, i) => <Tag key={tag} index={i}>{tag}</Tag>)}
                    </TagList>
                </EventSnippet>
            ))}
        </EventList>
    </Container>
));
