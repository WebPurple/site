import React from 'react';
import styled, { withTheme } from 'styled-components';

const StyledSVG = styled.svg`
    position: absolute;
    top: 0;
    right: 0;
    width: 120%;
    filter: grayscale(1);
    z-index: -1;
    opacity: 0.1;
`;

const EventBackground = ({ image }) => (
    <StyledSVG
        viewBox="0 0 2059 719"
        xmlns="http://www.w3.org/2000/svg">
        <defs xmlns="http://www.w3.org/2000/svg">
            <pattern id="tex_event_bg" patternUnits="userSpaceOnUse" width="100%" height="100%">
                <image
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xlinkHref={image}
                    x="0" y="0"
                    width="100%" />
            </pattern>
        </defs>
        <path d="M 0 0 L 503 0 L 863 287 L 1343 0 L 2059 0 L 863 719 z" fill="url(#tex_event_bg)" />
    </StyledSVG>
);

EventBackground.propTypes = {
    image: React.PropTypes.string,
};

export default withTheme(EventBackground);
