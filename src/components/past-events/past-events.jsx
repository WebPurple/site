import * as React from 'react';
import styled from 'styled-components';

import classes from './past-events.less';

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

const PastEvents = () => (
    <div className={classes['diamonds-layout']}>
        <div>
            <div id="#firstLeftRow" className={classes.content}>
                <DiamondRightWithPhoto cover="#b21d3d">
                    <DiamondRightPhoto src="https://pp.vk.me/c604521/v604521206/36c32/HtwS8cHJZes.jpg" position="120% 0%" />
                    <DiamondRightDescription>Compatible Inkjet Cartridge Which One Will You Choose</DiamondRightDescription>
                </DiamondRightWithPhoto>
                <DiamondLeft className={classes.lipstick}>
                    <DiamondLeftDescription>The Right Way to Bundle Your Assets for Faster Sites over HTTP/2</DiamondLeftDescription>
                </DiamondLeft>
            </div>
            <div id="#secondLeftRow" className={classes.content}>
                <DiamondRight className={classes.cerise}>
                    <DiamondRightDescription>Functional TypeScript</DiamondRightDescription>
                </DiamondRight>
                <EmptyDiamond />
            </div>
            <div id="#thirdLeftRow" className={classes.content}>
                <EmptyDiamond />
                <DiamondLeftWithPhoto cover="#9013fe">
                    <DiamondLeftPhoto src="https://pp.vk.me/c636319/v636319206/17ded/P0Ku4LJZznI.jpg" position="40% 20%" />
                    <DiamondLeftDescription>Things you probably didn’t know you could do with Chrome’s Developer Console</DiamondLeftDescription>
                </DiamondLeftWithPhoto>
            </div>
        </div>

        <div className={classes['right-part']}>
            <div id="firstRightRow" className={classes.content} style={{ paddingTop: 128 }}>
                <DiamondLeftWithPhoto cover="#432867">
                    <DiamondLeftPhoto src="https://pp.vk.me/c604521/v604521206/36c32/HtwS8cHJZes.jpg" position="120% 0%" />
                    <DiamondLeftDescription>10 Tips for Better Redux Architecture – JavaScript Scene</DiamondLeftDescription>
                </DiamondLeftWithPhoto>
            </div>
            <div id="secondRightRow" className={classes['content-column']} style={{ paddingTop: 6 }}>
                <DiamondLeft className={classes['vivid-purple']}>
                    <DiamondLeftDescription>Redux side effects and you – JavaScript and Opinions</DiamondLeftDescription>
                </DiamondLeft>
                <DiamondLeft className={classes['warm-purple']}>
                    <DiamondLeftDescription>How To Scale React Applications</DiamondLeftDescription>
                </DiamondLeft>
            </div>
        </div>
    </div>
);
export default PastEvents;
