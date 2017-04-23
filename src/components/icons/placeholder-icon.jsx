import React from 'react';
import styled from 'styled-components';

const PlaceholderIcon = props => {
    const { opaque, color, ...rest } = props;

    return (
        <svg {...rest} viewBox="0 0 14 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.779 2.051A6.807 6.807 0 0 0 6.9 0a6.81 6.81 0 0 0-4.88 2.051C-.39 4.5-.69 9.105 1.371 11.896L6.901 20l5.517-8.093c2.072-2.802 1.771-7.407-.64-9.856zM6.964 9.497c-1.39 0-2.52-1.147-2.52-2.557s1.13-2.556 2.52-2.556c1.387 0 2.517 1.147 2.517 2.556 0 1.41-1.13 2.557-2.517 2.557z" fill={color || '#9012FE'} fillRule="evenodd" opacity={opaque ? '1' : '.6'} />
        </svg>
    );
};

PlaceholderIcon.propTypes = {
    opaque: React.PropTypes.bool,
    color: React.PropTypes.string,
};

export default styled(PlaceholderIcon)`
    display: inline-block;
    height: 2rem;
    width: 2rem;
`;
