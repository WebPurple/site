import { css } from 'styled-components';

const sizes = {
    hd: 1800,
    desktop: 1200,
    tablet: 768,
    phone: 599,
};

// eslint-disable-next-line import/prefer-default-export
export const media = Object.keys(sizes).reduce((accumulator, label) => {
    // use em in breakpoints to work properly cross-browser and support users
    // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
    const emSize = sizes[label] / 10;

    // eslint-disable-next-line no-param-reassign
    accumulator[label] = (...args) => css`
    @media (min-width: ${emSize}rem) {
      ${css(...args)}
    }
    `;

    return accumulator;
}, {});
