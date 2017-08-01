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
    border: ${({ border }) => border ? `2px solid ${border}` : ''};
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

const RoundAvatar = ({ url, name, size, displayName = true, border }) => (
    <AvatarWrapper size={size}>
        { url ? <Avatar src={url} size={size} title={name} border={border} /> : <NoAvatar size={size} title={name} border={border} />}
        { name && displayName ? <Name>{name}</Name> : null }
    </AvatarWrapper>
);

RoundAvatar.propTypes = {
    url: React.PropTypes.string,
    name: React.PropTypes.string,
    size: React.PropTypes.string,
    displayName: React.PropTypes.bool,
};

export default RoundAvatar;
