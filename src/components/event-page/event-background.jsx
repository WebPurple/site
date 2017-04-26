import React from 'react';
import styled from 'styled-components';

const RenderingConfig = {
    anchor: {
        x: 0,
        y: 0,
    },
    renderSize: {
        width: 1600,
        height: 900,
    },
    imageSize: {
        width: 1600,
        height: 900,
    },
};

const StyledSVG = styled.svg`
    position: absolute;
    top: 0;
    right: 0;
    width: 120%;
    filter: grayscale(1);
    z-index: -1;
    opacity: 0.1;
`;

/*
    About SVG pattern.
    We create pattern that will be our texture in future.
    We pre-render that pattern in default resoulution {RenderingConfig.size}.
    In `patternTransform` attribute we add scaling to fit 100% of with and height of texturing object `scale(1, 1)`.
    I use 'understandable' format. In that case `tranlate` attribute value apperead.

    If you want to move or zoom BG image you must use only `RenderingConfig` variable.
    To move:
        1) set `anchor` position (left-top corner of image)
    To resize:
        1) set `imageSize` you want your image to be calculated
        2) set `renderSize` to 'viewPort' for texture
            a) `renderSize` < `imageSize` - zoom-in effect
            b) `renderSize` > `imageSize` - zoom-out effect
            c) `renderSize` = `imageSize` - original scaling
        3) you may want to move image. If so use rules above
*/

const EventBackground = ({ image }) => (
    <StyledSVG
        viewBox="0 0 2059 719"
        xmlns="http://www.w3.org/2000/svg">
        <defs xmlns="http://www.w3.org/2000/svg">
            <pattern
                id="TEX_event_bg"
                patternUnits="userSpaceOnUse"
                width={RenderingConfig.renderSize.width}
                height={RenderingConfig.renderSize.height}
                patternTransform="translate(0, 0) scale(1, 1)">
                <image
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref={image}
                    x={RenderingConfig.anchor.x}
                    y={RenderingConfig.anchor.y}
                    width={RenderingConfig.imageSize.width}
                    height={RenderingConfig.imageSize.height} />
            </pattern>
        </defs>
        <path d="M 0 0 L 503 0 L 863 287 L 1343 0 L 2059 0 L 863 719 z" fill="url(#TEX_event_bg)" />
    </StyledSVG>
);

EventBackground.propTypes = {
    image: React.PropTypes.string,
};

export default EventBackground;
