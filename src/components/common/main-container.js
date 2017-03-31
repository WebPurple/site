import styled from 'styled-components';
import { media } from '../../utils/css-utils';

const MainContainer = styled.section`
    padding: 6rem 2rem;
    ${media.desktop`padding: 10rem;`}
    ${media.hd`padding: 12rem;`}
`;

export default MainContainer;
