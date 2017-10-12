import React from 'react';
import styled from 'styled-components';

const NavWrapper = styled.div`
    position: relative;
`;

const NavButton = styled.button`
    outline: 0;
    border: 0;
    background: none;
    display: block;
`;

const DropdownLink = styled.a`
    position: relative;
    display: block;
    box-sizing: border-box;
    text-decoration: none;
    color:#000;
    font-size: 1.8rem;
    font-weight: bold;
    font-family: 'Rubik', sans-serif;
`;

class UserNavigation extends React.Component {

    static propTypes = {
        children: React.PropTypes.node,
    };

    state = {
        isOpen: false,
    };

    toggleOpen() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const NavDropdown = styled.ul`
            position: absolute;
            left: 0;
            z-index: 10;
            display:${this.state.isOpen ? 'block' : 'none'};
            list-style: none;
            margin: 0;
            padding: 10px;
            font-size: 23px;
        `;
        return (
            <NavWrapper>
                <NavButton type="button" onClick={() => { this.toggleOpen(); }}>{this.props.children}</NavButton>
                <NavDropdown>
                    <li><DropdownLink href="/logout">Logout</DropdownLink></li>
                </NavDropdown>
            </NavWrapper>
        );
    }

}

export default UserNavigation;
