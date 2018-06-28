import React from 'react'
import PropTypes from 'prop-types'
import { withState } from 'recompose'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'
import { Portal } from 'react-portal'
import { Manager, Popper, Reference } from 'react-popper'

import hoverLink from '../../utils/hover-link'
import { Arrow, Popup } from '../popup'

const CountOfTalks = styled.span`
  font-size: 2.2rem;
  font-weight: bold;
  cursor: pointer;
  color: ${props => props.theme.lipstick};
  ${props => hoverLink(props.theme.lipstick)};
`

const Talks = styled.ul`
  list-style: none;
  font-size: 1.6rem;
  color: ${props => props.theme.greyishBrown};
`

const SpeakerTalks = ({ talks, visible, toggle }) => {
  if (talks === void 0 || talks.length === 0) {
    return null
  }
  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <Box ml="1.5rem">
            <CountOfTalks
              innerRef={ref}
              onMouseEnter={() => toggle(true)}
              onMouseOut={() => toggle(false)}>
              {talks.length} {talks.length > 1 ? 'talks' : 'talk'}
            </CountOfTalks>
          </Box>
        )}
      </Reference>

      {visible && (
        <Portal>
          <Popper placement="bottom">
            {({ ref, style, placement, arrowProps }) => (
              <Popup innerRef={ref} style={style} data-placement={placement}>
                <Flex
                  is={Talks}
                  m={0}
                  p="10px 18px"
                  mt="10px"
                  flexDirection="column">
                  {talks.map(talk => (
                    <Box key={talk.title} m="5px 0">
                      — {talk.title}
                    </Box>
                  ))}
                </Flex>

                <Arrow innerRef={arrowProps.ref} style={arrowProps.style} />
              </Popup>
            )}
          </Popper>
        </Portal>
      )}
    </Manager>
  )
}

SpeakerTalks.propTypes = {
  talks: PropTypes.array,
}

export default withState('visible', 'toggle', false)(SpeakerTalks)
