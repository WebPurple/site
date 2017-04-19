import React from 'react';
import styled, { withTheme } from 'styled-components';

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

const AvatarWrapper = styled.span`
    & + & {
        margin-left: 1.2rem;
    }

`;

const AdditionalAttendeesIcon = styled.span`
    display: inline-block;
    width: 4rem;
    height: 4rem;
    border-radius: 50rem;
    background: ${props => props.theme.lipstick};
    font-family: Oxygen;
    font-size: 1.4rem;
    font-weight: bold;
    color: #ffffff;
    vertical-align: top;
    text-align: center;
    line-height: 4rem;
    margin-left: 1.2rem;
    cursor: pointer;

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
        this.setState({ ...this.state, isPopupOpened: true });
    }

    closePopup() {
        this.setState({ ...this.state, isPopupOpened: false });
    }

    render() {
        return (
            <span>
                {this.props.users.slice(0, maxAttendeesShow).map(attendee => (
                    <AvatarWrapper key={attendee._id}>
                        <Avatar
                            url={attendee.vkPhotoUrl}
                            displayName={attendee.displayName} />
                    </AvatarWrapper>
                ))}
                {
                    this.props.users.length - maxAttendeesShow <= 0 ?
                        null :
                        <AdditionalAttendeesIcon onClick={() => this.openPopup()}>
                            +{this.props.users.length - maxAttendeesShow}
                        </AdditionalAttendeesIcon>
                }
                <UsersPopup users={this.props.users} isOpened={this.state.isPopupOpened} onClose={() => this.closePopup()} />
            </span>
        );
    }
}

export default withTheme(Attendees);
