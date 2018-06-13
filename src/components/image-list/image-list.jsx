import React from 'react'
import PropTypes from 'prop-types'
import Masonry from 'react-masonry-component'

import styled from 'styled-components'

import {
  media,
  isPhone,
  isDesktop,
  isHD,
  isTablet,
} from '../../utils/css-utils'

const getGutterSpace = () => {
  let gutter = 20
  if (isHD()) {
    gutter = 12
  } else if (isDesktop()) {
    gutter = 16
  } else if (isTablet()) {
    gutter = 8
  }
  return gutter
}

const ImagesWrapper = styled(
  ({ children, className }) =>
    isPhone() ? (
      <ul className={className}>{children}</ul>
    ) : (
      <Masonry
        className={className}
        elementType="ul"
        options={{ gutter: getGutterSpace(), fitWidth: true }}>
        {children}
      </Masonry>
    ),
)`
  list-style: none;
  padding: 0;
  margin: 3.6rem auto 0;
  ${media.desktop`margin-top: 10rem;`};
`

const ImageWrapper = styled.li`
  position: relative;
  width: 100%;
  filter: grayscale(100%);
  filter: grayscale(1);
  filter: gray;
  background-image: url(${props => props.image});
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-size 0.3s;
  box-sizing: border-box;
  overflow: hidden;
  margin-bottom: ${getGutterSpace() / 10}rem;
  ${media.phone`
    width: 29rem;    
  `};
  ${media.tablet`
    width: 16.4rem;
  `};
  ${media.desktop`
    width: 20rem;
  `};
  ${media.hd`
    width: 23rem;
  `};
  &:first-child {
    margin-top: 0;
  }

  &:hover {
    background-size: 110% 110%;
  }
`

const ImageStyled = styled.img`
  max-width: 100%;
  visibility: hidden;
`

const Footer = styled.div`
  margin-top: 3.6rem;
  text-align: center;

  ${media.tablet`
    margin-top: 6.4rem;
  `};
`

const MorePicsButton = styled.button`
  width: 100%;
  background: #ffffff;
  border: 0.3rem solid ${props => props.theme.lipstick};
  color: ${props => props.theme.lipstick};
  font-family: Rubik, sans-serif;
  font-size: 1.8rem;
  font-weight: bold;
  line-height: 6rem;
  text-align: center;
  padding: 0;
  text-transform: uppercase;
  outline: none;
  cursor: pointer;

  ${media.phone`
    width: 31.4rem;
  `};
  ${media.tablet`
    width: 32.4rem;
    line-height: 8rem;
  `};
  ${media.desktop`
    width: 19.4rem;
  `};
  ${media.hd`
    width: 22.4rem;
  `};
`

class ImageList extends React.Component {
  static defaultImagesPerPage = 10

  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    imagesPerPage: PropTypes.number,
  }

  constructor(props) {
    super(props)

    this.state = {
      count: this.props.imagesPerPage || ImageList.defaultImagesPerPage,
    }

    this.showMore = this.showMore.bind(this)
  }

  showMore() {
    const delta = this.props.imagesPerPage || ImageList.defaultImagesPerPage
    this.setState({ count: this.state.count + delta })
  }

  render() {
    return (
      <div>
        <ImagesWrapper>
          {this.props.images.slice(0, this.state.count).map(url => (
            <ImageWrapper image={url} key={url}>
              <ImageStyled src={url} role="presentation" />
            </ImageWrapper>
          ))}
        </ImagesWrapper>
        {this.props.images.length > this.state.count ? (
          <Footer>
            <MorePicsButton onClick={this.showMore}>More Pics</MorePicsButton>
          </Footer>
        ) : null}
      </div>
    )
  }
}

export default ImageList
