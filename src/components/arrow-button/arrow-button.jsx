import styled from 'styled-components';

export default styled.button`
    align-items: center;
    text-decoration: none;
    background-color: transparent;
    border: none;
    color: ${props => props.color || props.theme.lipstick};
    cursor: pointer;
    display: flex;
    font: bold ${props => props.fontSize || '1.8em'} Rubik;
    outline: none;
    padding: 0;
    text-transform: uppercase;

    &:before {
        content: '/';
        font: bold 1.5em;
        margin-right: 0.455em;
    }

    &:after {
        content: '➜';
        font-size: 1em;
        margin-left: 0.556em;
        position: relative;
        transition: all 0.2s ease-in-out;
    }

    &:hover:after {
        transform: translateX(.8em);
    }
`;
