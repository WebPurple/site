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

const Popup = props => (
    <Modal
        {...props}
        style={{ ...customStyles, content: { ...customStyles.content, width: props.width } }}>
        <ModalHeader>
            <IconButton onClick={props.onRequestClose}>
                <CloseIcon />
            </IconButton>
        </ModalHeader>
        <ModalContent>
            {props.children}
        </ModalContent>
    </Modal>
);

export default Popup;

Popup.propTypes = {
    handleCloseModal: React.PropTypes.func,
    width: React.PropTypes.number,
};
