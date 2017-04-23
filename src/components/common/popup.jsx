import * as React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

import CloseIcon from '../icons/close-icon';

const customStyles = {
    overlay: {
        alignItems: 'center',
        backgroundColor: 'rgba(94, 94, 94, 0.13)',
        display: 'flex',
        justifyContent: 'center',
    },
    content: {
        top: 'auto',
        left: 'auto',
        right: 'auto',
        bottom: 'auto',
        border: 'none',
        borderRadius: 'none',
        maxHeight: '100vh',
        overflow: 'auto',
        padding: '0',
        position: 'static',
    },
};

const ModalHeader = styled.header`
    display: flex;
    flex-direction: row-reverse;
    padding: 1.2em;
`;

const ModalContent = styled.div`
    padding: 0 4em 4em;
`;

const IconButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    
    &:hover #closeIcon {
        stroke: #ababab;
    }
`;

const Popup = ({ width, children, onRequestClose, ...rest }) => (
    <Modal
        {...rest}
        onRequestClose={onRequestClose}
        style={{ ...customStyles, content: { ...customStyles.content, width } }}>
        <ModalHeader>
            <IconButton onClick={onRequestClose}>
                <CloseIcon />
            </IconButton>
        </ModalHeader>
        <ModalContent>
            {children}
        </ModalContent>
    </Modal>
);

export default Popup;

Popup.propTypes = {
    onRequestClose: React.PropTypes.func,
    width: React.PropTypes.number,
};
