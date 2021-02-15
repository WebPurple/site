import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import { Media } from '../../utils/css-utils'
import { DownArrowIcon } from '../icons'

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
  font-size: 1.8rem;
  color: ${props => props.theme.greyishBrown};
  margin-right: 2.4rem;
`

const tagColors = ['lipstick', 'vividPurple', 'rouge', 'warmPurple']
const morePlaqueColor = '#545454'

const Tags = styled.ul`
  list-style: none;
  display: inline-flex;
  flex-wrap: wrap;
  padding: 0;
`

export class TagListCutter extends Component {
  constructor(props) {
    super(props)
    this.state = { allOpen: false }
  }
  handleChange() {
    this.setState({ allOpen: !this.state.allOpen })
  }
  render() {
    const { tagNumberDesktop, tagNumberMobile, tags } = this.props

    return (
      <Media.MobileOnly>
        {isMobile => {
          let currentNumber = isMobile ? tagNumberMobile : tagNumberDesktop
          return currentNumber && currentNumber < tags.length
            ? this.props.children(
                this.state.allOpen ? tags : tags.slice(0, currentNumber),
                ToogleLabel(() => this.handleChange(), this.state.allOpen),
                MoreTag(() => this.handleChange(), this.state.allOpen),
              )
            : this.props.children(tags)
        }}
      </Media.MobileOnly>
    )
  }
}

const ToogleLabel = (onLableClick, allOpen) => (label, theme) => (
  <div style={{ display: 'flex' }}>
    <TagListLabel>{label}</TagListLabel>
    <ToogleButton onClick={onLableClick} down={!allOpen}>
      <DownArrowIcon fill={theme.greyishBrown} />
    </ToogleButton>
  </div>
)

const ToogleButton = styled.div`
  display: flex;
  transform: ${props => (props.down ? 'rotate(0deg)' : 'rotate(180deg)')};
  cursor: pointer;
`

const MoreTag = (onLableClick, allOpen) => () =>
  allOpen ? null : (
    <Tag
      key="moreTagsHere"
      color={morePlaqueColor}
      onClick={() => onLableClick()}>
      more tags...
    </Tag>
  )

export const TagList = withTheme(
  ({
    tags,
    selectedTags,
    label,
    theme,
    onTagClick,
    LabelComponent = label => <TagListLabel>{label}</TagListLabel>,
    MoreTag = () => null,
  }) => (
    <div>
      {label && LabelComponent(label, theme)}
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
            {MoreTag()}
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

TagListCutter.propTypes = {
  tags: PropTypes.arrayOf(String).isRequired,
  tagNumberDesktop: PropTypes.number,
  tagNumberMobile: PropTypes.number,
}

TagListCutter.defaultProps = {
  tagNumberDesktop: 0,
  tagNumberMobile: 0,
}
