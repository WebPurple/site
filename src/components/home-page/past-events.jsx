import * as React from 'react';
import styled, { withTheme } from 'styled-components';

import { media, isTablet } from '../../utils/css-utils';
import Diamond from '../../components/diamond';
import EventDiamond from '../../components/event-diamond';
import BlockHeader from '../../components/common/block-header';

const PastEventsContainer = styled.section`
    padding: 6rem 2rem;
    ${media.tablet`padding: 9rem 7rem;`}
    ${media.desktop`padding: 10rem;`}
`;

const DiamondsRow = styled.div`
    display: flex;
    justify-content: center;
`;

const DiamondsColumn = styled.div`
    flex-direction: column;
    justify-content: flex-start;
`;

const middleDiamondTopShift = '18.5rem';

const PastEvents = ({talks, theme}) => {

  if (!talks || talks.length < 7) {
    return null;
  }

  const [talk1, talk2, talk3, talk4, talk5, talk6, talk7] = talks;

  return (
    <PastEventsContainer>
      <BlockHeader>Passed events</BlockHeader>
      <DiamondsRow style={{ marginTop: '16rem' }}>
        { /* Left part */}
        <div>
          <DiamondsRow>
            <Diamond
              color={theme.rouge}
              backSrc="https://pp.vk.me/c604521/v604521206/36c32/HtwS8cHJZes.jpg"
              backPosition="120% 0%">
              <EventDiamond
                header={talk1.event.title}
                text={talk1.title}
                speakerPhoto={talk1.speaker.vkPhotoUrl}
                speakerName={talk1.speaker.displayName}/>
            </Diamond>
            <Diamond
              isTurnLeft="true"
              color={theme.lipstick}>
              <EventDiamond
                isTurnLeft="true"
                header={talk2.event.title}
                text={talk2.title}
                speakerPhoto={talk2.speaker.vkPhotoUrl}
                speakerName={talk2.speaker.displayName}/>
            </Diamond>
          </DiamondsRow>
          <DiamondsRow>
            <Diamond
              color={theme.cerise}>
              <EventDiamond
                header={talk3.event.title}
                text={talk3.title}
                speakerPhoto={talk3.speaker.vkPhotoUrl}
                speakerName={talk3.speaker.displayName}/>
            </Diamond>
            <Diamond isEmpty="true"/>
          </DiamondsRow>
          <DiamondsRow>
            <Diamond isEmpty="true"/>
            <Diamond
              isTurnLeft="true"
              color={theme.vividPurpleTwo}
              backSrc="https://pp.vk.me/c636319/v636319206/17ded/P0Ku4LJZznI.jpg"
              backPosition="40% 20%">
              <EventDiamond
                isTurnLeft="true"
                header={talk4.event.title}
                text={talk4.title}
                speakerPhoto={talk4.speaker.vkPhotoUrl}
                speakerName={talk4.speaker.displayName} />
            </Diamond>
          </DiamondsRow>

          {isTablet() &&
          <DiamondsRow>
            <Diamond isEmpty="true" />
            <Diamond
              isTurnLeft="true"
              color={theme.vividPurple}>
              <EventDiamond
                isTurnLeft="true"
                header={talk6.event.title}
                text={talk6.title}
                speakerPhoto={talk6.speaker.vkPhotoUrl}
                speakerName={talk6.speaker.displayName} />
            </Diamond>
          </DiamondsRow>
          }

        </div>
        { /* Right part */}
        <DiamondsRow>
          <DiamondsColumn style={{ paddingTop: middleDiamondTopShift }}>
            <Diamond
              isTurnLeft="true"
              color={theme.grape}
              backSrc="https://pp.vk.me/c604521/v604521206/36c32/HtwS8cHJZes.jpg"
              backPosition="120% 0%">
              <EventDiamond
                isTurnLeft="true"
                header={talk5.event.title}
                text={talk5.title}
                speakerPhoto={talk5.speaker.vkPhotoUrl}
                speakerName={talk5.speaker.displayName} />
            </Diamond>

            {isTablet() &&
            <div>
              <Diamond isEmpty="true" />
              <Diamond
                isTurnLeft="true"
                color={theme.warmPurple}>
                <EventDiamond
                  isTurnLeft="true"
                  header={talk7.event.title}
                  text={talk7.title}
                  speakerPhoto={talk7.speaker.vkPhotoUrl}
                  speakerName={talk7.speaker.displayName} />
              </Diamond>
            </div>
            }

          </DiamondsColumn>

          {!isTablet() &&
          <DiamondsColumn>
            <Diamond
              isTurnLeft="true"
              color={theme.vividPurple}>
              <EventDiamond
                isTurnLeft="true"
                header={talk6.event.title}
                text={talk6.title}
                speakerPhoto={talk6.speaker.vkPhotoUrl}
                speakerName={talk6.speaker.displayName} />
            </Diamond>
            <Diamond
              isTurnLeft="true"
              color={theme.warmPurple}>
              <EventDiamond
                isTurnLeft="true"
                header={talk7.event.title}
                text={talk7.title}
                speakerPhoto={talk7.speaker.vkPhotoUrl}
                speakerName={talk7.speaker.displayName} />
            </Diamond>
          </DiamondsColumn>
          }

        </DiamondsRow>
      </DiamondsRow>
    </PastEventsContainer>
  );
};

PastEvents.propTypes = {
  talks: React.PropTypes.array,
  theme: React.PropTypes.object.isRequired,
};

export default withTheme(PastEvents);
