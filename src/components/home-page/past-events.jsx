import * as React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'

import { media, isTablet } from '../../utils/css-utils'
import Diamond from '../../components/diamond'
import EventDiamond from '../../components/event-diamond'
import BlockHeader from '../../components/common/block-header'

let PastEventsContainer = styled.section`
  padding: 6rem 2rem;
  ${media.tablet`padding: 9rem 7rem;`} ${media.desktop`padding: 10rem;`};
`

let DiamondsRow = styled.div`
  display: flex;
  justify-content: center;
`

let DiamondsColumn = styled.div`
  flex-direction: column;
  justify-content: flex-start;
`

let middleDiamondTopShift = '18.5rem'

let PastEvents = ({ talks, theme }) => {
  if (!talks || talks.length < 7) {
    return null
  }

  let [talk1, talk2, talk3, talk4, talk5, talk6, talk7] = talks

  return (
    <PastEventsContainer>
      <BlockHeader>Passed events</BlockHeader>
      <DiamondsRow style={{ marginTop: '16rem' }}>
        {/* Left part */}
        <div>
          <DiamondsRow>
            <Diamond
              color={theme.rouge}
              backSrc="https://pp.vk.me/c604521/v604521206/36c32/HtwS8cHJZes.jpg"
              backPosition="120% 0%">
              <EventDiamond talk={talk1} />
            </Diamond>
            <Diamond isTurnLeft="true" color={theme.lipstick}>
              <EventDiamond isTurnLeft="true" talk={talk2} />
            </Diamond>
          </DiamondsRow>
          <DiamondsRow>
            <Diamond color={theme.cerise}>
              <EventDiamond talk={talk3} />
            </Diamond>
            <Diamond isEmpty="true" />
          </DiamondsRow>
          <DiamondsRow>
            <Diamond isEmpty="true" />
            <Diamond
              isTurnLeft="true"
              color={theme.vividPurpleTwo}
              backSrc="https://pp.vk.me/c636319/v636319206/17ded/P0Ku4LJZznI.jpg"
              backPosition="40% 20%">
              <EventDiamond isTurnLeft="true" talk={talk4} />
            </Diamond>
          </DiamondsRow>

          {isTablet() && (
            <DiamondsRow>
              <Diamond isEmpty="true" />
              <Diamond isTurnLeft="true" color={theme.vividPurple}>
                <EventDiamond isTurnLeft="true" talk={talk6} />
              </Diamond>
            </DiamondsRow>
          )}
        </div>
        {/* Right part */}
        <DiamondsRow>
          <DiamondsColumn style={{ paddingTop: middleDiamondTopShift }}>
            <Diamond
              isTurnLeft="true"
              color={theme.grape}
              backSrc="https://pp.vk.me/c604521/v604521206/36c32/HtwS8cHJZes.jpg"
              backPosition="120% 0%">
              <EventDiamond isTurnLeft="true" talk={talk5} />
            </Diamond>

            {isTablet() && (
              <div>
                <Diamond isEmpty="true" />
                <Diamond isTurnLeft="true" color={theme.warmPurple}>
                  <EventDiamond isTurnLeft="true" talk={talk7} />
                </Diamond>
              </div>
            )}
          </DiamondsColumn>

          {!isTablet() && (
            <DiamondsColumn>
              <Diamond isTurnLeft="true" color={theme.vividPurple}>
                <EventDiamond isTurnLeft="true" talk={talk6} />
              </Diamond>
              <Diamond isTurnLeft="true" color={theme.warmPurple}>
                <EventDiamond isTurnLeft="true" talk={talk7} />
              </Diamond>
            </DiamondsColumn>
          )}
        </DiamondsRow>
      </DiamondsRow>
    </PastEventsContainer>
  )
}

PastEvents.propTypes = {
  talks: PropTypes.array,
  theme: PropTypes.object.isRequired,
}

export default withTheme(PastEvents)
