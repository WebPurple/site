import React from 'react';

import styled from 'styled-components';

const ContactsContainer = styled.div`
    display: flex;
`;

const Icon = styled.a`
    display: block;
    width: 28px;
    height: 28px;
    background: black;
    margin-right: 15px;
`;

const SpeakerContacts = () => (
    <ContactsContainer>
        <Icon href="#" />
        <Icon href="#" />
        <Icon href="#" />
    </ContactsContainer>
);

export default SpeakerContacts;
