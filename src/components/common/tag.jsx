import React from 'react';
import styled, { withTheme } from 'styled-components';
import Color from 'color';

import { Set } from 'immutable';

export const Tag = styled.li`
    font-family: 'Oxygen', sans-serif;
    font-size: 1.6rem;
    color: #fff;
    padding: .4rem 1.6rem;
    white-space: nowrap;
    cursor: pointer;
    transition: all .2s ease-out;
    
    background: ${props => props.color};
    &:hover {
        background: ${props => props.hoverColor};
    }
`;

const TagListLabel = styled.span`
    font-family: 'Rubik', sans-serif;
    font-size: 1.8rem;
    color: ${props => props.theme.greyishBrown};
    margin-right: 2.4rem;
`;

const tagColors = [
    'lipstick',
    'vividPurple',
    'rouge',
    'warmPurple',
];

const Tags = styled.ul`
    list-style: none;
    display: inline-flex;
    flex-wrap: wrap;
    padding: 0;
`;

export const TagList = withTheme(({ tags, selectedTags, label, theme, onTagClick }) => (
    <div>
        {label && <TagListLabel>{label}</TagListLabel>}

        <Tags>
            {tags.map((tag, i) => {
                const selectedOrHoverColor = theme[tagColors[i % tagColors.length]];
                const fadeColor = new Color(selectedOrHoverColor).fade(0.5).string();

                return (
                    <Tag
                        key={tag}
                        color={selectedTags && selectedTags.has(tag) ? selectedOrHoverColor : fadeColor}
                        hoverColor={selectedOrHoverColor}
                        onClick={onTagClick && (() => onTagClick(tag))}>
                        {tag}
                    </Tag>
                );
            })}
        </Tags>
    </div>
));

TagList.propTypes = {
    tags: React.PropTypes.arrayOf(String).isRequired,
    selectedTags: React.PropTypes.instanceOf(Set),
    label: React.PropTypes.string,
    onTagClick: React.PropTypes.func,
};
