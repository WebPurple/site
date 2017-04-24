import * as React from 'react';

const CloseIcon = props => (
    <svg
        width="18px"
        height="18px"
        viewBox="0 0 18 18">
        <g
            strokeLinecap="square">
            <g
                id="closeIcon"
                transform="translate(-896.000000, -179.000000)"
                stroke={props.color || '#cdcdcd'}
                strokeWidth="2">
                <g transform="translate(516.000000, 169.000000)">
                    <g transform="translate(382.000000, 12.000000)">
                        <path
                            d="M0,14.1421356 L14.1421356,0" />
                        <path
                            d="M0,14.1421356 L14.1421356,0"
                            transform="translate(7.071068, 7.071068) scale(-1, 1) translate(-7.071068, -7.071068) " />
                    </g>
                </g>
            </g>
        </g>
    </svg>
);

CloseIcon.propTypes = {
    color: React.PropTypes.string,
};

export default CloseIcon;
