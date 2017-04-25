import {
    isHD,
    isDesktop,
    isTablet,
    isPhone,
} from './../../src/utils/css-utils';

const setWidth = width => {
    window.innerWidth = width;
};

const enchancer = func => width => {
    setWidth(width);
    return func();
};

const enchFunctions = {
    isHD: enchancer(isHD),
    isDesktop: enchancer(isDesktop),
    isTablet: enchancer(isTablet),
    isPhone: enchancer(isPhone),
};

describe('CSS-utils', () => {

    beforeEach(() => setWidth(2000));

    describe('#isHD', () => {
        it('should return true if `window.innerWidth >= 1800`',
            () => [1920, 1800].forEach(screenWidth => expect(enchFunctions.isHD(screenWidth)).toBe(true)));

        it('should return false in all other cases',
            () => [1600, 1200, 1024, 768, 640, 599, 320].forEach(screenWidth => expect(enchFunctions.isHD(screenWidth)).toBe(false)));
    });

    describe('#isDesktop', () => {
        it('should return true if `1200 <= window.innerWidth < 1800`',
            () => [1600, 1200].forEach(screenWidth => expect(enchFunctions.isDesktop(screenWidth)).toBe(true)));

        it('should return false in all other cases',
            () => [1920, 1800, 1024, 768, 640, 599, 320].forEach(screenWidth => expect(enchFunctions.isDesktop(screenWidth)).toBe(false)));
    });

    describe('#isTablet', () => {
        it('should return true if `768 <= window.innerWidth < 1200`',
            () => [1024, 768].forEach(screenWidth => expect(enchFunctions.isTablet(screenWidth)).toBe(true)));

        it('should return false in all other cases',
            () => [1920, 1800, 1600, 1200, 640, 599, 320].forEach(screenWidth => expect(enchFunctions.isTablet(screenWidth)).toBe(false)));
    });

    describe('#isPhone', () => {
        it('should return true if `599 <= window.innerWidth < 768`',
            () => [640, 599].forEach(screenWidth => expect(enchFunctions.isPhone(screenWidth)).toBe(true)));

        it('should return false in all other cases',
            () => [1920, 1800, 1600, 1200, 1024, 768, 320].forEach(screenWidth => expect(enchFunctions.isPhone(screenWidth)).toBe(false)));
    });

    describe('very small screen size', () => {
        it('should return false for all functions if `window.innerWidth < 599`',
            () => [...enchFunctions].forEach(func => expect(func(320)).toBe(false)));
    });
});
