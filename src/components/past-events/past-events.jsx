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
                        photoSrc="https://pp.vk.me/c604521/v604521206/36c32/HtwS8cHJZes.jpg"
                        photoPosition="120% 0%"
                        text="Compatible Inkjet Cartridge Which One Will You Choose" />
                    <Diamond
                        isTurnLeft="true"
                        color={theme.lipstick}
                        text="The Right Way to Bundle Your Assets for Faster Sites over HTTP/2" />
                </DiamondsRow>
                <DiamondsRow>
                    <Diamond color={theme.cerise} text="Functional TypeScript" />
                    <Diamond isEmpty="true" />
                </DiamondsRow>
                <DiamondsRow>
                    <Diamond isEmpty="true" />
                    <Diamond
                        isTurnLeft="true"
                        color={theme.vividPurpleTwo}
                        photoSrc="https://pp.vk.me/c636319/v636319206/17ded/P0Ku4LJZznI.jpg"
                        photoPosition="40% 20%"
                        text="Things you probably didn’t know you could do with Chrome’s Developer Console" />
                </DiamondsRow>
            </div>
            { /* Right part */}
            <DiamondsRow>
                <DiamondsRow style={{ paddingTop: middleDiamondTopShift }}>
                    <Diamond
                        isTurnLeft="true"
                        color={theme.grape}
                        photoSrc="https://pp.vk.me/c604521/v604521206/36c32/HtwS8cHJZes.jpg"
                        photoPosition="120% 0%"
                        text="10 Tips for Better Redux Architecture – JavaScript Scene" />
                </DiamondsRow>
                <DiamondsColumn>
                    <Diamond isTurnLeft="true" color={theme.vividPurple} text="Redux side effects and you – JavaScript and Opinions" />
                    <Diamond isTurnLeft="true" color={theme.warmPurple} text="How To Scale React Applications" />
                </DiamondsColumn>
            </DiamondsRow>
        </DiamondsRow>
    </PastEventsContainer>
));
