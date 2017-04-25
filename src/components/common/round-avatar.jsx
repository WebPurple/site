import React from 'react';
import styled from 'styled-components';

import NoAvatarIcon from './../icons/no-avatar-icon';

const AvatarWrapper = styled.span`
    display: inline-block;
    width: ${props => props.size ? props.size : '3.6rem'};
`;

const Avatar = styled.img`
    width: ${props => props.size ? props.size : '3.6rem'};
    height: ${props => props.size ? props.size : '3.6rem'};
    border-radius: 50%;
`;

const NoAvatar = styled(NoAvatarIcon)`
    width: ${props => props.size ? props.size : '3.6rem'};
    height: ${props => props.size ? props.size : '3.6rem'};
    border-radius: 50%;
`;

const Name = styled.div`
    font-family: Oxygen, sans-serif;
    font-size: 1.4rem;
    line-height: 1;
    color: ${props => props.theme.greyishBrown};
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const RoundAvatar = ({ url, name, size }) => (
    <AvatarWrapper size={size}>
        { url ? <Avatar src={url} size={size} /> : <NoAvatar size={size} />}
        { name ? <Name>{name}</Name> : null }
    </AvatarWrapper>
);

RoundAvatar.propTypes = {
    url: React.PropTypes.string,
    name: React.PropTypes.string,
    showName: React.PropTypes.bool,
    size: React.PropTypes.string,
    theme: React.PropTypes.object,
};

export default RoundAvatar;
