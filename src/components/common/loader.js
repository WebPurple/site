import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    
    to {
        transform: rotate(360deg);
    }
`;

export default styled.div`
    position: relative;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    border-radius: 50%;
    background: linear-gradient(to bottom, ${props => props.theme.vividPurple}, ${props => props.theme.lipstick});
    margin: 0 auto;
    
    &:after {
        content: '';
        top: ${props => props.border}px;
        left: ${props => props.border}px;
        position: absolute;
        width: ${props => props.size - (props.border * 2)}px;
        height: ${props => props.size - (props.border * 2)}px;
        border-radius: 50%;
        background: #fff;
    }
    
    animation: ${spin} .7s linear infinite;
`;
