// @flow
import * as React from 'react'
import * as R from 'ramda'
import Masonry from 'react-masonry-component'
import styled, { withTheme } from 'styled-components'
import { Flex, Box } from 'grid-styled'
import Lightbox from 'react-images'

import { Media } from '../utils/css-utils'
import Button from './common/button'
import type { VkPhotoGroup } from '../model'
import { typesOrderedBySize } from '../model'

let ImagesWrapper = styled(({ children, className }) => (
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

let ImageStyled = styled.img`
  max-width: 100%;
  transition: transform 0.3s;
`

let ImageWrapper = styled.li`
  filter: grayscale(1);
  overflow: hidden;

  &:hover {
    ${ImageStyled} {
      transform: scale(1.1);
    }
  }
`

let maxImage = sizes =>
  R.reduce(
    R.maxBy(({ type }) => typesOrderedBySize.indexOf(type)),
    sizes[0],
    sizes,
  )

type ImageListProps = {
  images: VkPhotoGroup[],
  imagesPerPage: number,
  theme: any,
}

type ImageListState = {
  count: number,
  lightboxIsOpen: boolean,
  currentImage: number,
}

class ImageGallery extends React.Component<ImageListProps, ImageListState> {
  static defaultProps = {
    imagesPerPage: 10,
  }

  constructor(props) {
    super(props)

    this.state = {
      count: this.props.imagesPerPage,
      lightboxIsOpen: false,
      currentImage: 0,
    }
  }

  toggleLightbox = (v, i = 0) =>
    this.setState({ lightboxIsOpen: v, currentImage: i })

  next = () =>
    this.setState(({ currentImage }) => ({ currentImage: currentImage + 1 }))

  prev = () =>
    this.setState(({ currentImage }) => ({ currentImage: currentImage - 1 }))

  showMore = () =>
    this.setState({ count: this.state.count + this.props.imagesPerPage })

  render() {
    let images = this.props.images.map(({ sizes }) => ({
      src: maxImage(sizes).url,
      srcSet: sizes.map(s => `${s.url} ${s.width}w`).join(', '),
    }))

    return (
      <div>
        <Box is={ImagesWrapper} mt={['3.6rem', '3.6rem', '10rem']}>
          {images.slice(0, this.state.count).map(({ src, srcSet }, i) => (
            <Box
              is={ImageWrapper}
              onClick={() => this.toggleLightbox(true, i)}
              key={src}
              width={['100%', '16.4rem', '20rem', '23rem']}
              mb="2rem">
              <ImageStyled src={src} srcSet={srcSet} role="presentation" />
            </Box>
          ))}
        </Box>

        <Lightbox
          showThumbnails
          images={images}
          isOpen={this.state.lightboxIsOpen}
          currentImage={this.state.currentImage}
          onClickNext={this.next}
          onClickPrev={this.prev}
          onClickThumbnail={i => this.setState({ currentImage: i })}
          onClose={() => this.toggleLightbox(false)}
        />

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
