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
`

const TagListLabel = styled.span`
  font-family: 'Rubik', sans-serif;
  font-size: 1.8rem;
  color: ${props => props.theme.greyishBrown};
  margin-right: 2.4rem;
`

const tagColors = ['lipstick', 'vividPurple', 'rouge', 'warmPurple']

const Tags = styled.ul`
  list-style: none;
  display: inline-flex;
  flex-wrap: wrap;
  padding: 0;
`

export const TagList = withTheme(
  ({ tags, selectedTags, label, theme, onTagClick }) => (
    <div>
      {label && <TagListLabel>{label}</TagListLabel>}

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
)

TagList.propTypes = {
  tags: PropTypes.arrayOf(String).isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
  onTagClick: PropTypes.func,
}

TagList.defaultProps = {
  selectedTags: [],
  onTagClick: () => null,
}
