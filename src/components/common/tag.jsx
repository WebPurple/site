import React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'

export const Tag = styled.li`
  font-size: 1.6rem;
  color: #fff;
  padding: 0.4rem 1.6rem;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease-out;

  background: ${props => props.color};
  opacity: 0.5;
  &:hover,
  &.active {
    opacity: 1;
  }
`;

const TagListLabel = styled.button`
  font-size: 1.8rem;
  color: ${props => props.theme.greyishBrown};
  margin-right: 2.4rem;
  background: none;
  border: none;
  position: relative;
  padding-right: 1.8rem;
  cursor: pointer;
  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    border: .4rem solid #545454;
    border-left-color: transparent;
    border-top-color: transparent;
    top: .4rem;
    right: .4rem;
    transform: rotate(45deg);
    transform-origin: 75% 75%;
  }
  &.toggled:after {
    transform: rotate(225deg);
  }
`;

const tagColors = ['lipstick', 'vividPurple', 'rouge', 'warmPurple'];

const Tags = styled.ul`
  list-style: none;
  display: inline-flex;
  flex-wrap: wrap;
  padding: 0;
	max-height: 9999px;
  transition: max-height .8s cubic-bezier(0.5, 0, 1, 0);
  overflow: hidden;
  &.toggled {
    max-height: 0px;
    transition-timing-function: cubic-bezier(0, 1, 0, 1);
    transition-delay: -.1s;
  }
`;

const toggleTagList = e => {
  e.target.classList.toggle('toggled');
  e.target.nextElementSibling.classList.toggle('toggled')
};

export const TagList = withTheme(
  ({ tags, selectedTags, label, theme, onTagClick }) => (
    <div>
      {label && <TagListLabel onClick={toggleTagList}>{label}</TagListLabel>}

      {tags &&
        tags.length > 0 && (
          <Tags>
            {tags.map((tag, i) => (
              <Tag
                key={tag}
                color={theme[tagColors[i % tagColors.length]]}
                className={selectedTags.includes(tag) ? 'active' : ''}
                onClick={() => onTagClick(tag)}>
                #{tag}
              </Tag>
            ))}
          </Tags>
        )}
    </div>
  ),
);

TagList.propTypes = {
  tags: PropTypes.arrayOf(String).isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
  onTagClick: PropTypes.func,
};

TagList.defaultProps = {
  selectedTags: [],
  onTagClick: () => null,
};
