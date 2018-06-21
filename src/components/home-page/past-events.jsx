import * as React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import { NavLink } from 'react-router-dom'
import zipWith from 'ramda/src/zipWith'
import { Box } from 'grid-styled'

import { media } from '../../utils/css-utils'
import ArrowButton from '../arrow-button/arrow-button'
import Diamond, { calculateHeight } from '../diamond'
import EventDiamond from '../event-diamond'
import BlockHeader from '../common/block-header'
import ResizeObserver from '../../utils/resize.observer'

let injectResponsiveOption = option => ({ responsiveOptions: config }) => {
  if (config === void 0 || config[option] === void 0) {
    return ''
  }
  if (config[option] === 'hidden') {
    return 'display: none'
  }
  let responsiveString = ''
  if (config[option].row) {
    responsiveString += `grid-row-start: ${config[option].row};`
  }
  if (config[option].column) {
    responsiveString += `grid-column-start: ${config[option].column};`
  }
  return `${responsiveString} display: initial;`
}

let PastEventsContainer = styled.section`
  padding-bottom: 6rem;
  ${media.tablet`padding-bottom: 7rem;`};
  ${media.desktop`padding-bottom: 10rem`};
`

let PastEventsGrid = styled.div`
  width: 100%;
  display: grid;
  justify-content: center;
  margin-top: 3rem;
  grid-template-columns: repeat(1, ${props => props.width / 10}rem);
  grid-auto-rows: ${props => calculateHeight(props.width) / 30}rem;
  ${media.phone`
    margin-top: 4rem;
    grid-template-columns: repeat(2, ${props => props.width / 20}rem);
    grid-auto-rows: ${props => calculateHeight(props.width / 2) / 30}rem;
  `};
  ${media.tablet`
    grid-template-columns: repeat(3, ${props => props.width / 30}rem);
    grid-auto-rows: ${props => calculateHeight(props.width / 3) / 30}rem;
  `};
  ${media.desktop`
    margin-top: 8rem;
    grid-template-columns: repeat(4, ${props => props.width / 40}rem);
    grid-auto-rows: ${props => calculateHeight(props.width / 4) / 30}rem;
  `};
`

let PastEventsGridItem = styled.div`
  grid-row-end: span 3;
  grid-column-end: span 1;
  ${injectResponsiveOption('mobile')};
  ${media.phone`
    ${injectResponsiveOption('landscape')};
  `};
  ${media.tablet`
    ${injectResponsiveOption('tablet')};
  `};
  ${media.desktop`
    ${injectResponsiveOption('desktop')};
  `};
`

let ArrowLink = ArrowButton.withComponent(NavLink)

let ArrowLinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  ${media.tablet`
    margin-top: 6rem;
  `};
`

let responsiveGridConfig = [
  /* 1 */
  {
    mobile: {
      row: 1,
      column: 1,
    },
  },
  /* 2 */
  {
    mobile: {
      row: 3,
      column: 1,
    },
    landscape: {
      row: 1,
      column: 2,
    },
  },
  /* 3 */
  {
    mobile: {
      row: 5,
      column: 1,
    },
    landscape: {
      row: 3,
      column: 1,
    },
  },
  /* 4 */
  {
    mobile: 'hidden',
    landscape: {
      row: 5,
      column: 1,
    },
    tablet: {
      row: 5,
      column: 2,
    },
  },
  /* 5 */
  {
    mobile: 'hidden',
    landscape: {
      row: 5,
      column: 2,
    },
    tablet: {
      row: 2,
      column: 3,
    },
  },
  /* 6 */
  {
    mobile: 'hidden',
    tablet: {
      row: 7,
      column: 2,
    },
    desktop: {
      row: 1,
      column: 4,
    },
  },
  /* 7 */
  {
    mobile: 'hidden',
    tablet: {
      row: 6,
      column: 3,
    },
    desktop: {
      row: 3,
      column: 4,
    },
  },
]

let PastEvents = ({ talks, theme }) => {
  if (!talks || talks.length < 7) {
    return null
  }

  let [talk1, talk2, talk3, talk4, talk5, talk6, talk7] = zipWith(
    (talk, responsiveOptions) => ({ talk, responsiveOptions }),
    talks,
    responsiveGridConfig,
  )

  return (
    <PastEventsContainer>
      <Box p={['6rem 2rem 0 2rem', '9rem 7rem 0 7rem', '10rem 10rem 0 10rem']}>
        <BlockHeader>Passed events</BlockHeader>
      </Box>
      <ResizeObserver>
        {width => (
          <PastEventsGrid width={width}>
            <PastEventsGridItem responsiveOptions={talk1.responsiveOptions}>
              <Diamond
                color={theme.rouge}
                backSrc="https://pp.vk.me/c604521/v604521206/36c32/HtwS8cHJZes.jpg"
                backPosition="-94% center"
                turningPoints={{ mobile: 'left', landscape: 'right' }}>
                <EventDiamond talk={talk1.talk} />
              </Diamond>
            </PastEventsGridItem>
            <PastEventsGridItem responsiveOptions={talk2.responsiveOptions}>
              <Diamond color={theme.lipstick}>
                <EventDiamond talk={talk2.talk} />
              </Diamond>
            </PastEventsGridItem>
            <PastEventsGridItem responsiveOptions={talk3.responsiveOptions}>
              <Diamond
                color={theme.cerise}
                turningPoints={{ landscape: 'right', mobile: 'left' }}>
                <EventDiamond talk={talk3.talk} />
              </Diamond>
            </PastEventsGridItem>
            <PastEventsGridItem responsiveOptions={talk4.responsiveOptions}>
              <Diamond
                color={theme.vividPurpleTwo}
                backSrc="https://pp.vk.me/c636319/v636319206/17ded/P0Ku4LJZznI.jpg"
                backPosition="25% 50%"
                turningPoints={{ tablet: 'left', mobile: 'right' }}>
                <EventDiamond talk={talk4.talk} />
              </Diamond>
            </PastEventsGridItem>
            <PastEventsGridItem responsiveOptions={talk5.responsiveOptions}>
              <Diamond
                color={theme.grape}
                backSrc="https://sun1-2.userapi.com/c834200/v834200219/1473a0/m_uTLXGP7Cw.jpg"
                backPosition="39% center">
                <EventDiamond talk={talk5.talk} />
              </Diamond>
            </PastEventsGridItem>
            <PastEventsGridItem responsiveOptions={talk6.responsiveOptions}>
              <Diamond color={theme.vividPurple}>
                <EventDiamond talk={talk6.talk} />
              </Diamond>
            </PastEventsGridItem>
            <PastEventsGridItem responsiveOptions={talk7.responsiveOptions}>
              <Diamond color={theme.warmPurple}>
                <EventDiamond talk={talk7.talk} />
              </Diamond>
            </PastEventsGridItem>
          </PastEventsGrid>
        )}
      </ResizeObserver>
      <ArrowLinkWrapper>
        <ArrowLink to="/events?show=past">More Events</ArrowLink>
      </ArrowLinkWrapper>
    </PastEventsContainer>
  )
}

PastEvents.propTypes = {
  talks: PropTypes.array,
  theme: PropTypes.object.isRequired,
}

export default withTheme(PastEvents)
