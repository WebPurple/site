import { css } from 'styled-components';

const sizes = {
    hd: 1800,
    desktop: 1200,
    tablet: 768,
    phone: 599,
};

export const media = Object.keys(sizes).reduce((accumulator, label) => {
    // use em in breakpoints to work properly cross-browser and support users
    // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
    const emSize = sizes[label] / 16;

    // eslint-disable-next-line no-param-reassign
    accumulator[label] = (...args) => css`
    @media (min-width: ${emSize}em) {
      ${css(...args)}
    }
    `;

    return accumulator;
}, {});

export const isPhone = () => window.innerWidth <= sizes.phone;

export const isTablet = () => window.innerWidth <= sizes.tablet && !isPhone();
