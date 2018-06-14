import * as React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import zipWith from 'ramda/src/zipWith'

import { media } from '../../utils/css-utils'
import Diamond from '../../components/diamond'
import EventDiamond from '../../components/event-diamond'
import BlockHeader from '../../components/common/block-header'

let defaultAngle = 30
let sinusAngle = Math.sin((90 - defaultAngle) / 180 * Math.PI)
let width = 32
let halfHeight = width / (sinusAngle * 2)

let PastEventsContainer = styled.section`
  padding: 6rem 2rem;
  ${media.tablet`padding: 9rem 7rem;`} ${media.desktop`padding: 10rem;`};
`

let DiamondsGrid = styled.div`
  margin-top: 4rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, ${width}rem);
  grid-template-rows: repeat(7, ${halfHeight}rem); //57.8125% of width
  justify-content: center;

  @media screen and (max-width: 1280px) {
    grid-template-columns: repeat(3, ${width}rem);
    grid-template-rows: repeat(9, ${halfHeight}rem); //57.8125% of width
  }
  @media screen and (max-width: 980px) {
    grid-template-columns: repeat(2, ${width}rem);
    grid-template-rows: repeat(7, ${halfHeight}rem); //57.8125% of width
  }
  @media screen and (max-width: 630px) {
    grid-template-columns: repeat(1, ${width}rem);
    grid-template-rows: repeat(7, ${halfHeight}rem);
  }
`

const responsiveGridConfig = [
  /* 1 */
  {
    desktop: {
      row: 1,
      column: 1,
      turn: 'right',
    },
    mobile: {
      turn: 'left',
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
      turn: 'right',
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
      turn: 'right',
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
      <DiamondsGrid>
        <Diamond
          color={theme.rouge}
          backSrc="https://pp.vk.me/c604521/v604521206/36c32/HtwS8cHJZes.jpg"
          backPosition="120% 0%"
          responsiveOptions={talk1.responsiveOptions}>
          <EventDiamond talk={talk1.talk} />
        </Diamond>
        <Diamond
          color={theme.lipstick}
          responsiveOptions={talk2.responsiveOptions}>
          <EventDiamond talk={talk2.talk} />
        </Diamond>
        <Diamond
          color={theme.cerise}
          responsiveOptions={talk3.responsiveOptions}>
          <EventDiamond talk={talk3.talk} />
        </Diamond>
        <Diamond
          color={theme.vividPurpleTwo}
          backSrc="https://pp.vk.me/c636319/v636319206/17ded/P0Ku4LJZznI.jpg"
          backPosition="40% 20%"
          responsiveOptions={talk4.responsiveOptions}>
          <EventDiamond talk={talk4.talk} />
        </Diamond>
        <Diamond
          color={theme.grape}
          backSrc="https://pp.vk.me/c604521/v604521206/36c32/HtwS8cHJZes.jpg"
          backPosition="120% 0%"
          responsiveOptions={talk5.responsiveOptions}>
          <EventDiamond talk={talk5.talk} />
        </Diamond>
        <Diamond
          color={theme.vividPurple}
          responsiveOptions={talk6.responsiveOptions}>
          <EventDiamond talk={talk6.talk} />
        </Diamond>
        <Diamond
          color={theme.warmPurple}
          responsiveOptions={talk7.responsiveOptions}>
          <EventDiamond talk={talk7.talk} />
        </Diamond>
      </DiamondsGrid>
    </PastEventsContainer>
  )
}

PastEvents.propTypes = {
  talks: PropTypes.array,
  theme: PropTypes.object.isRequired,
}

export default withTheme(PastEvents)
