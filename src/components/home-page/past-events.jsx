import * as React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import zipWith from 'ramda/src/zipWith'

import { media } from '../../utils/css-utils'
import Diamond, { width, height } from '../diamond'
import EventDiamond from '../event-diamond'
import BlockHeader from '../common/block-header'

const injectResponsiveOption = option => ({ responsiveOptions: config }) => {
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
  return responsiveString
}

let PastEventsContainer = styled.section`
  padding: 6rem 2rem;
  ${media.tablet`padding: 9rem 7rem;`};
  ${media.desktop`padding: 10rem;`};
`

let PastEventsGrid = styled.div`
  margin-top: 4rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, ${width}rem);
  grid-template-rows: repeat(7, ${height / 2}rem);
  justify-content: center;

  @media screen and (max-width: 80rem) {
    grid-template-columns: repeat(3, ${width}rem);
    grid-template-rows: repeat(9, ${height / 2}rem);
  }
  @media screen and (max-width: 62rem) {
    grid-template-columns: repeat(2, ${width}rem);
    grid-template-rows: repeat(7, ${height / 2}rem);
  }
  @media screen and (max-width: 40rem) {
    margin-top: 3rem;
    grid-template-columns: repeat(1, ${width}rem);
    grid-template-rows: repeat(7, ${height / 2}rem);
  }
`

const responsiveGridConfig = [
  /* 1 */
  {
    desktop: {
      row: 1,
      column: 1,
    },
  },
  /* 2 */
  {
    desktop: {
      row: 1,
      column: 2,
    },
    mobile: {
      row: 3,
      column: 1,
    },
  },
  /* 3 */
  {
    desktop: {
      row: 3,
      column: 1,
    },
    mobile: {
      row: 5,
      column: 1,
    },
  },
  /* 4 */
  {
    desktop: {
      row: 5,
      column: 2,
    },
    landscape: {
      row: 5,
      column: 1,
    },
    mobile: 'hidden',
  },
  /* 5 */
  {
    desktop: {
      row: 2,
      column: 3,
    },
    landscape: {
      row: 5,
      column: 2,
    },
    mobile: 'hidden',
  },
  /* 6 */
  {
    desktop: {
      row: 1,
      column: 4,
    },
    tablet: {
      row: 7,
      column: 2,
    },
    landscape: 'hidden',
  },
  /* 7 */
  {
    desktop: {
      row: 3,
      column: 4,
    },
    tablet: {
      row: 6,
      column: 3,
    },
    landscape: 'hidden',
  },
]

const PastEventsGridItem = styled.div`
  ${injectResponsiveOption('desktop')};
  grid-row-end: span 3;
  grid-column-end: span 1;
  @media screen and (max-width: 80rem) {
    ${injectResponsiveOption('tablet')};
  }
  @media screen and (max-width: 62rem) {
    ${injectResponsiveOption('landscape')};
  }

  @media screen and (max-width: 40rem) {
    ${injectResponsiveOption('mobile')};
  }
`

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
      <BlockHeader>Passed events</BlockHeader>
      <PastEventsGrid>
        <PastEventsGridItem responsiveOptions={talk1.responsiveOptions}>
          <Diamond
            color={theme.rouge}
            backSrc="https://pp.vk.me/c604521/v604521206/36c32/HtwS8cHJZes.jpg"
            backPosition="120% 0%"
            turningPoints={{ desktop: 'right', mobile: 'left' }}>
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
            turningPoints={{ desktop: 'right', mobile: 'left' }}>
            <EventDiamond talk={talk3.talk} />
          </Diamond>
        </PastEventsGridItem>
        <PastEventsGridItem responsiveOptions={talk4.responsiveOptions}>
          <Diamond
            color={theme.vividPurpleTwo}
            backSrc="https://pp.vk.me/c636319/v636319206/17ded/P0Ku4LJZznI.jpg"
            backPosition="40% 20%"
            turningPoints={{ desktop: 'left', landscape: 'right' }}>
            <EventDiamond talk={talk4.talk} />
          </Diamond>
        </PastEventsGridItem>
        <PastEventsGridItem responsiveOptions={talk5.responsiveOptions}>
          <Diamond
            color={theme.grape}
            backSrc="https://pp.vk.me/c604521/v604521206/36c32/HtwS8cHJZes.jpg"
            backPosition="120% 0%">
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
    </PastEventsContainer>
  )
}

PastEvents.propTypes = {
  talks: PropTypes.array,
  theme: PropTypes.object.isRequired,
}

export default withTheme(PastEvents)
