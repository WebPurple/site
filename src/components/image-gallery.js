// @flow
import * as React from 'react'
import Masonry from 'react-masonry-component'
import styled, { withTheme } from 'styled-components'
import { Flex, Box } from 'grid-styled'

import { Media } from '../utils/css-utils'
import Button from './common/button'

const ImagesWrapper = styled(({ children, className }) => (
  <React.Fragment>
    <Media.MobileOnly>
      <ul className={className}>{children}</ul>
    </Media.MobileOnly>
    <Media.TabletPlus>
      <Masonry
        className={className}
        elementType="ul"
        options={{ gutter: 20, fitWidth: true }}>
        {children}
      </Masonry>
    </Media.TabletPlus>
  </React.Fragment>
))`
  list-style: none;
  padding: 0;
  margin: 0;
`

const ImageWrapper = styled.li`
  position: relative;
  filter: grayscale(1);
  background: url(${props => props.image}) no-repeat center;
  background-size: 100% 100%;
  transition: background-size 0.3s;
  overflow: hidden;
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

type ImageListProps = { images: string[], imagesPerPage: number, theme: any }

type ImageListState = { count: number }

class ImageGallery extends React.Component<ImageListProps, ImageListState> {
  static defaultProps = {
    imagesPerPage: 10,
  }

  constructor(props) {
    super(props)

    this.state = {
      count: this.props.imagesPerPage,
    }
  }

  showMore = () =>
    this.setState({ count: this.state.count + this.props.imagesPerPage })

  render() {
    return (
      <div>
        <Box is={ImagesWrapper} mt={['3.6rem', '3.6rem', '10rem']}>
          {this.props.images.slice(0, this.state.count).map(url => (
            <Box
              is={ImageWrapper}
              image={url}
              key={url}
              width={['100%', '16.4rem', '20rem', '23rem']}
              mb="2rem">
              <ImageStyled src={url} role="presentation" />
            </Box>
          ))}
        </Box>

        {this.props.images.length > this.state.count ? (
          <Flex my={['3.6rem', '6.4rem']} justifyContent="center">
            <Button
              defaultSheme={this.props.theme.lipstick}
              hoverColor={'#fff'}
              onClick={this.showMore}>
              More Pics
            </Button>
          </Flex>
        ) : null}
      </div>
    )
  }
}

export default withTheme(ImageGallery)
