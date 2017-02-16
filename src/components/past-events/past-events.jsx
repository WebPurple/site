import * as React from 'react';
import styled, { withTheme } from 'styled-components';
import { media } from '../../utils/css-utils';

const Header = styled.h2`
    font-family: Rubik;
    font-size: 48px;
    font-weight: 500;
    color: ${(props) => props.theme.lipstick};
    text-align: center;
    vertical-align: middle;
    line-height: 100px;
    ${media.tablet`line-height: 200px;`}
    ${media.hd`line-height: 300px;`}
    margin-bottom: 50px;
    
    &:before, &:after {
        background-color: ${(props) => props.theme.lipstick};
        content: "";
        display: inline-block;
        height: 3px;
        position: relative;
        vertical-align: middle;
        width: 20%;
    }
    
    &:before {
        right: 3%;
    }
    
    &:after {
        left: 3%;
    }
`;

const DiamondsRow = styled.div`
    display: flex;
    justify-content: center;
`;

const DiamondsColumn = styled.div`
    flex-direction: column;
    justify-content: flex-start;
`;

const DiamondAngle = '26deg';
const DiamondSize = 250;
const DiamondBackShift = DiamondSize / 2;

const EmptyDiamond = styled.div`
    width: ${DiamondSize}px;
    height: ${DiamondSize}px;
`;

const DiamondRight = styled.div`
    width: ${DiamondSize}px;
    height: ${DiamondSize}px;
    overflow: hidden;
    
    color: white;
    
    transform: skewY(${DiamondAngle});
`;

const DiamondRightWithPhoto = styled.div`
    width: ${DiamondSize}px;
    height: ${DiamondSize}px;
    overflow: hidden;
    
    color: white;
    
    transform: skewY(${DiamondAngle});
    
    &:after {
        opacity: 0.7;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        height: 100%;
        width: 100%;
        
        background-color: ${(props) => props.cover};
    }
`;

const DiamondRightPhoto = styled.div`
    transform: skewY(-${DiamondAngle}) translateY(-${DiamondBackShift}px);
    
    background-size: cover;
    filter: grayscale(100%);
    width: 200%;
    height: 200%;
    
    background-image: url(${(props) => props.src});
    background-position: ${(props) => props.position};
`;

const DiamondRightDescription = styled.div`
    transform: skewY(-${DiamondAngle});
    
    display:inline-block;
    color: white;
    position: absolute;
    top: 0;
    z-index: 1;
`;

const DiamondLeft = styled.div`
    width: ${DiamondSize}px;
    height: ${DiamondSize}px;
    overflow: hidden;
    
    color: white;
    
    transform: skewY(-${DiamondAngle});
`;

const DiamondLeftDescription = styled.div`
    transform: skewY(${DiamondAngle});
    
    display:inline-block;
    color: white;
    position: absolute;
    top: 0;
    z-index: 1;
`;

const DiamondLeftWithPhoto = styled.div`
    width: ${DiamondSize}px;
    height: ${DiamondSize}px;
    overflow: hidden;
    
    color: white;
    
    transform: skewY(-${DiamondAngle});
    
    &:after {
        opacity: 0.7;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        height: 100%;
        width: 100%;
        
        background-color: ${(props) => props.cover};
    }
`;

const DiamondLeftPhoto = styled.div`
    transform: skewY(${DiamondAngle});
    
    background-size: cover;
    filter: grayscale(100%);
    width: 200%;
    height: 200%;
    
    background-image: url(${(props) => props.src});
    background-position: ${(props) => props.position};
`;

export default withTheme(({ theme }) => (
    <div>
        <Header>Passed events</Header>
        <DiamondsRow>
            <div>
                <DiamondsRow>
                    <DiamondRightWithPhoto cover={theme.rouge}>
                        <DiamondRightPhoto src="https://pp.vk.me/c604521/v604521206/36c32/HtwS8cHJZes.jpg" position="120% 0%" />
                        <DiamondRightDescription>Compatible Inkjet Cartridge Which One Will You Choose</DiamondRightDescription>
                    </DiamondRightWithPhoto>
                    <DiamondLeft style={{ backgroundColor: theme.vividPurple }}>
                        <DiamondLeftDescription>The Right Way to Bundle Your Assets for Faster Sites over HTTP/2</DiamondLeftDescription>
                    </DiamondLeft>
                </DiamondsRow>
                <DiamondsRow>
                    <DiamondRight style={{ backgroundColor: theme.cerise }}>
                        <DiamondRightDescription>Functional TypeScript</DiamondRightDescription>
                    </DiamondRight>
                    <EmptyDiamond />
                </DiamondsRow>
                <DiamondsRow>
                    <EmptyDiamond />
                    <DiamondLeftWithPhoto cover="#9013fe">
                        <DiamondLeftPhoto src="https://pp.vk.me/c636319/v636319206/17ded/P0Ku4LJZznI.jpg" position="40% 20%" />
                        <DiamondLeftDescription>Things you probably didn’t know you could do with Chrome’s Developer Console</DiamondLeftDescription>
                    </DiamondLeftWithPhoto>
                </DiamondsRow>
            </div>
            <DiamondsRow>
                <DiamondsRow style={{ paddingTop: 128 }}>
                    <DiamondLeftWithPhoto cover="#432867">
                        <DiamondLeftPhoto src="https://pp.vk.me/c604521/v604521206/36c32/HtwS8cHJZes.jpg" position="120% 0%" />
                        <DiamondLeftDescription>10 Tips for Better Redux Architecture – JavaScript Scene</DiamondLeftDescription>
                    </DiamondLeftWithPhoto>
                </DiamondsRow>
                <DiamondsColumn style={{ paddingTop: 6 }}>
                    <DiamondLeft style={{ backgroundColor: theme.vividPurple }}>
                        <DiamondLeftDescription>Redux side effects and you – JavaScript and Opinions</DiamondLeftDescription>
                    </DiamondLeft>
                    <DiamondLeft style={{ backgroundColor: theme.warmPurple }}>
                        <DiamondLeftDescription>How To Scale React Applications</DiamondLeftDescription>
                    </DiamondLeft>
                </DiamondsColumn>
            </DiamondsRow>
        </DiamondsRow>
    </div>
));
