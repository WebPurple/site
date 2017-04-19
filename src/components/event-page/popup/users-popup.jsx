import React from 'react';
import styled, { withTheme } from 'styled-components';

import RoundAvatar from './../../common/round-avatar';
import Popup from './../../common/popup';

const Wrapper = styled.div`
    padding-left: 2.2rem;
    margin: 0 -4rem -4rem; // Exceed parent container sizes to fit design layout
`;

const Header = styled.h4`
    font-family: Rubik;
    font-size: 2.4rem;
    font-weight: 800;
    line-height: 1;
    color: ${props => props.theme.lipstick};
    margin: 0;
`;

const List = styled.div`
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: flex-start;
    padding-bottom: 0.5rem;
    margin-top: 2.4rem;
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 60rem;

    &::-webkit-scrollbar {
        width: 1.4rem;
        height: 100%;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 7px;
        background-color: rgba(0, 0, 0, 0.15);
    }
`;

const AvatarWrapper = styled.span`
    padding: 1.2rem;
`;

const UsersPopup = ({ users, isOpened, onClose }) => (
    <Popup
        isOpen={isOpened}
        contentLabel="Attendees"
        handleCloseModal={() => onClose()}
        onRequestClose={() => onClose()}
        width={600}>
        <Wrapper>
            <Header>{users.length} people are coming</Header>
            <List>
                {users.map(
                    user => (
                        <AvatarWrapper key={user._id}>
                            <RoundAvatar displayName={user.displayName} url={user.vkPhotoUrl} size="6.4rem" showName />
                        </AvatarWrapper>
                    )
                )}
            </List>
        </Wrapper>
    </Popup>
);

UsersPopup.propTypes = {
    users: React.PropTypes.arrayOf(React.PropTypes.object),
    isOpened: React.PropTypes.bool,
    onClose: React.PropTypes.func,
};

export default withTheme(UsersPopup);
