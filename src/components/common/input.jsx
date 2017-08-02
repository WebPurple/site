import * as React from 'react';
import styled from 'styled-components';

const InputGroup = styled.label`
    align-items: center;
    border: 1px solid #ccc;
    display: flex;
    padding: 2.1em 1.6em;
`;

const InputField = styled.input`
    border: none;
    flex-basis: 100%;
    flex-grow: 0;
    flex-shrink: 10;
    font-family: Oxygen, sans-serif;
    font-size: 1.8em;
    min-width: 0;
    outline: none;
`;

const Input = ({ style, rightIcon, leftIcon, placeholder, type, value }) => (
    <InputGroup style={style}>
        {leftIcon}
        <InputField
            style={{
                marginLeft: leftIcon ? '1.6rem' : 0,
                marginRight: rightIcon ? '1.6rem' : 0,
            }}
            type={type}
            placeholder={placeholder}
            value={value} />
        {rightIcon}
    </InputGroup>
);

export default Input;

Input.propTypes = {
    style: React.PropTypes.object,
    rightIcon: React.PropTypes.element,
    leftIcon: React.PropTypes.element,
    placeholder: React.PropTypes.string,
    type: React.PropTypes.string,
    value: React.PropTypes.string || React.PropTypes.number,
};
