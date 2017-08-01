import React from 'react';
import styled from 'styled-components';
import NoAvatarIcon from '../icons/no-avatar-icon';

const avatarForm = styled.div`
    width: 11rem;
    height: 13rem;
    transform-origin: right top;

    transform: skewY(-30deg);
`;

const SpeakerAvatar = styled(avatarForm)`
    overflow: hidden;
    position: relative;
    box-shadow: 1.2rem 1.4rem rgba(230, 33, 112, 0.5);
`;

const avatarContainer = `
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20rem;
    background-size: auto 100%;
    transform: skewY(30deg) translateY(-3.2rem);
`;

// TODO: solve the issue with size of avatars (background-size: cover;)
const AvatarContainer = styled.div`
    ${avatarContainer}
    background: url(${props => props.avatar}) center center no-repeat;
    transform: skewY(30deg) translateY(-3.2rem);
    background-size: cover;
`;

const NoAvatarIconElement = styled.div`
    ${avatarContainer}
    background-color: #efefef;
    transform: skewY(30deg) translateY(-3.5rem);
`;

const NoAvatarContainer = () => (
    <NoAvatarIconElement>
        <NoAvatarIcon />
    </NoAvatarIconElement>
);

const Avatar = ({ avatar }) => (
    <SpeakerAvatar>
        {avatar ? <AvatarContainer avatar={avatar} /> : <NoAvatarContainer />}
    </SpeakerAvatar>
);

Avatar.propTypes = {
    avatar: React.PropTypes.string,
};

export default Avatar;
