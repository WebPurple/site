import React from 'react';
import styled from 'styled-components';

import { getJson } from '../../utils/ajax';

import Header from '../../components/common/block-header';
import Loader from '../../components/common/loader';

const ContributorsList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
`;

const Avatar = styled.img`
    height: 10rem;
`;

const Name = styled.span`
    font-size: 2.4rem;
    font-family: 'Oxygen', sans-serif;
    padding-top: 1rem;
    color: ${props => props.theme.grape};
`;

const Contributor = styled.a`
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5rem 10rem;
    
    &:hover {
        text-decoration: underline;
    }
`;

const StyledLoader = styled(Loader)`
    margin: 15rem auto;
`;

const Note = styled.footer`
    font-family: 'Oxygen', sans-serif;
    color: ${props => props.theme.warmGrey};
    font-size: 1.8rem;
    margin: 3rem auto;
    text-align: center;
`;

export default class ContributorsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isFetching: true };
    }

    componentWillMount() {
        getJson('https://api.github.com/repos/kitos/web-purple/contributors')
            .then(contributors => this.setState({ contributors, isFetching: false }));
    }

    render() {
        const { contributors = [] } = this.state;

        return (
            <section>
                <Header>Contributors</Header>
                {this.state.isFetching ? <StyledLoader size="80" border="8" />
                    : (
                        <ContributorsList>
                            {contributors.map(c => (
                                <li>
                                    <Contributor href={c.html_url} target="_blank" rel="noopener noreferrer">
                                        <Avatar src={c.avatar_url} alt={c.login} />
                                        <Name>{c.login}</Name>
                                    </Contributor>
                                </li>
                            ))}
                        </ContributorsList>
                    )}
                <Note>
                    * If you can't see yourself in this list, but you've contributed to this project,&nbsp;
                    <a href="https://help.github.com/articles/why-are-my-contributions-not-showing-up-on-my-profile/" target="_blank" rel="noopener noreferrer">this</a>
                    &nbsp;might answer why.
                </Note>
            </section>
        );
    }
}
