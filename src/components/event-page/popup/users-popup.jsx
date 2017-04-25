import React from 'react';
import styled from 'styled-components';

import RoundAvatar from './../../common/round-avatar';
import Popup from './../../common/popup';

const Wrapper = styled.div`
    padding-left: 2.2rem;
    margin: 0 -4rem -4rem; // Exceed parent container sizes to fit design layout
`;

const Header = styled.h4`
    font-family: Rubik, sans-serif;
    font-size: 2.4rem;
    font-weight: 800;
    line-height: 1;
    color: ${props => props.theme.lipstick};
    margin: 0;
`;

const List = styled.ul`
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: flex-start;
    padding-bottom: 0.5rem;
    margin-top: 2.4rem;
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 60rem;
    padding: 0;

    &::-webkit-scrollbar {
        width: 1.4rem;
        height: 100%;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 7px;
        background-color: rgba(0, 0, 0, 0.15);
    }
`;

const AvatarWrapper = styled.li`
    padding: 1.2rem;
    list-style: none;
`;

const UsersPopup = ({ users, isOpened, handleClose }) => (
    <Popup
        isOpen={isOpened}
        contentLabel="Attendees"
        onRequestClose={handleClose}
        width={600}>
        <Wrapper>
            <Header>{users.length} people are coming</Header>
            <List>
                {users.map(
                    user => (
                        <AvatarWrapper key={user._id}>
                            <RoundAvatar name={user.displayName} url={user.vkPhotoUrl} size="6.4rem" key={user._id} />
                        </AvatarWrapper>
                    ),
                )}
            </List>
        </Wrapper>
    </Popup>
);

UsersPopup.propTypes = {
    users: React.PropTypes.arrayOf(React.PropTypes.object),
    isOpened: React.PropTypes.bool,
    handleClose: React.PropTypes.func,
};

export default UsersPopup;
