import React from 'react';
import styled from 'styled-components';

const ClockIcon = props => {
    const { opaque, color, ...rest } = props;

    return (
        <svg {...rest} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0C4.477 0 0 4.477 0 10c0 5.522 4.477 10 10 10 5.522 0 10-4.478 10-10 0-5.523-4.478-10-10-10zm4.323 11.902h-4.24c-.014 0-.027-.004-.041-.004-.014 0-.028.004-.042.004a.692.692 0 0 1-.692-.692V4.15a.692.692 0 1 1 1.383 0v6.369h3.632a.691.691 0 0 1 0 1.383z" fill={color || '#9012FE'} fillRule="evenodd" opacity={opaque ? '1' : '.6'} />
        </svg>
    );
};

ClockIcon.propTypes = {
    opaque: React.PropTypes.bool,
    color: React.PropTypes.string,
};

export default styled(ClockIcon)`
    display: inline-block;
    height: 2rem;
    width: 2rem;
`;
