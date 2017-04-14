import React from 'react';

import styled from 'styled-components';
import TwitterIcon from '../icons/social/twitter-icon';
import FacebookIcon from '../icons/social/facebook-square-icon';
import GithubIcon from '../icons/social/github-icon';

const ContactsContainer = styled.div`
    display: flex;
`;

const ICON_SIZE = 2.8;

const Icon = styled.a`
    display: block;
    width: ${ICON_SIZE}rem;
    height: ${ICON_SIZE}rem;
    margin-right: 1.5rem;
`;

const styledSize = (component, size) => styled(component)`
    height: ${size}rem;
    width: ${size}rem;
`;

const StyledGithubIcon = styledSize(GithubIcon, ICON_SIZE);
const StyledTwitterIcon = styledSize(TwitterIcon, ICON_SIZE);
const StyledFacebookIcon = styledSize(FacebookIcon, ICON_SIZE);

const SpeakerContacts = () => (
    <ContactsContainer>
        <Icon href="#">
            <StyledGithubIcon />
        </Icon>
        <Icon href="#">
            <StyledFacebookIcon />
        </Icon>
        <Icon href="#">
            <StyledTwitterIcon />
        </Icon>
    </ContactsContainer>
);

export default SpeakerContacts;
