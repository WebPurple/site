import React from 'react';
import styled from 'styled-components';

import RoundAvatar from './../common/round-avatar';
import { media } from './../../utils/css-utils';
import UsersPopup from './popup/users-popup';

const maxAttendeesShow = 5;

const Avatar = styled(RoundAvatar) `
    width: 4rem;
    height: 4rem;

    ${media.phone`
        width: 3.6rem;
        height: 3.6rem;
    `}
`;

const Wrapper = styled.ul`
    padding: 0;
`;

const AvatarWrapper = styled.li`
    display: inline;
    list-style: none;
    margin: 0;
    
    & + & {
        margin-left: 1.2rem;
    }
`;

const AdditionalAttendeesIcon = styled.button`
    display: inline-block;
    width: 4rem;
    height: 4rem;
    border: none;
    border-radius: 50%;
    background: ${props => props.theme.lipstick};
    font-family: Oxygen, sans-serif;
    font-size: 1.4rem;
    font-weight: bold;
    color: #ffffff;
    vertical-align: top;
    text-align: center;
    line-height: 4rem;
    cursor: pointer;
    outline: none;

    ${media.phone`
        width: 3.6rem;
        height: 3.6rem;
        line-height: 3.6rem;
    `}
`;

class Attendees extends React.Component {
    static propTypes = {
        users: React.PropTypes.arrayOf(React.PropTypes.object),
    };

    constructor(props) {
        super(props);

        this.state = {
            isPopupOpened: false,
        };

        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }

    openPopup() {
        this.setState({ isPopupOpened: true });
    }

    closePopup() {
        this.setState({ isPopupOpened: false });
    }

    render() {
        return (
            <Wrapper>
                {this.props.users.slice(0, maxAttendeesShow).map(attendee => (
                    <AvatarWrapper key={attendee._id}>
                        <Avatar url={attendee.vkPhotoUrl} />
                    </AvatarWrapper>
                ))}
                {
                    this.props.users.length - maxAttendeesShow <= 0 ?
                        null :
                        <AvatarWrapper>
                            <AdditionalAttendeesIcon onClick={this.openPopup}>
                                +{this.props.users.length - maxAttendeesShow}
                            </AdditionalAttendeesIcon>
                        </AvatarWrapper>
                }
                <UsersPopup users={this.props.users} isOpened={this.state.isPopupOpened} handleClose={this.closePopup} />
            </Wrapper>
        );
    }
}

export default Attendees;
