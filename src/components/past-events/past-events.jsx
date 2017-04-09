import * as React from 'react';
import styled, { withTheme } from 'styled-components';
import { media } from '../../utils/css-utils';
import Diamond from '../diamond';
import BlockHeader from '../common/block-header';

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

export default withTheme(({ theme }) => (
    <PastEventsContainer>
        <BlockHeader>Passed events</BlockHeader>
        <DiamondsRow style={{ marginTop: '16rem' }}>
            { /* Left part */}
            <div>
                <DiamondsRow>
                    <Diamond
                        color={theme.rouge}
                        backSrc="https://pp.vk.me/c604521/v604521206/36c32/HtwS8cHJZes.jpg"
                        backPosition="120% 0%"
                        header="webpurple meetup #14"
                        text="Не вебом единым. Чего еще коснулась благодать Javascript'a"
                        speakerPhoto="speakers-small/pasha.jpg"
                        speakerName="Павел Смирнов" />
                    <Diamond
                        isTurnLeft="true"
                        color={theme.lipstick}
                        header="webpurple meetup #14"
                        text="Scrum In Action"
                        speakerPhoto="speakers-small/yana.jpg"
                        speakerName="Яна Бобровская" />
                </DiamondsRow>
                <DiamondsRow>
                    <Diamond
                        color={theme.cerise}
                        header="webpurple meetup #14"
                        text="Не вебом единым. Чего еще коснулась благодать Javascript'a"
                        speakerPhoto="speakers-small/pasha.jpg"
                        speakerName="Павел Смирнов" />
                    <Diamond isEmpty="true" />
                </DiamondsRow>
                <DiamondsRow>
                    <Diamond isEmpty="true" />
                    <Diamond
                        isTurnLeft="true"
                        color={theme.vividPurpleTwo}
                        backSrc="https://pp.vk.me/c636319/v636319206/17ded/P0Ku4LJZznI.jpg"
                        backPosition="40% 20%"
                        header="webpurple meetup #14"
                        text="Things you probably didn’t know you could do with Chrome’s Developer Console"
                        speakerPhoto="speakers-small/pasha.jpg"
                        speakerName="Дима Кабардинов" />
                </DiamondsRow>
            </div>
            { /* Right part */}
            <DiamondsRow>
                <DiamondsRow style={{ paddingTop: middleDiamondTopShift }}>
                    <Diamond
                        isTurnLeft="true"
                        color={theme.grape}
                        backSrc="https://pp.vk.me/c604521/v604521206/36c32/HtwS8cHJZes.jpg"
                        backPosition="120% 0%"
                        header="webpurple meetup #15"
                        text="What is react native"
                        speakerPhoto="speakers-small/andrey.jpg"
                        speakerName="Андрей Семин" />
                </DiamondsRow>
                <DiamondsColumn>
                    <Diamond
                        isTurnLeft="true"
                        color={theme.vividPurple}
                        header="webpurple meetup #13"
                        text="Redux-talk@1.0.0"
                        speakerPhoto="speakers-small/nik.jpg"
                        speakerName="Никита Кирсанов" />
                    <Diamond
                        isTurnLeft="true"
                        color={theme.warmPurple}
                        header="webpurple meetup #11"
                        text="Vue.js"
                        speakerPhoto="speakers-small/sasha.jpg"
                        speakerName="Саша Зайцев" />
                </DiamondsColumn>
            </DiamondsRow>
        </DiamondsRow>
    </PastEventsContainer>
));
