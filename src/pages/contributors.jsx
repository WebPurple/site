import React from 'react'
import { compose, lifecycle, withState } from 'recompose'
import styled from 'styled-components'

import Header from '../components/common/block-header'
import Loader from '../components/common/loader'
import Layout from '../components/layout'

const ContributorsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`

const Avatar = styled.img`
  height: 10rem;
`

const Name = styled.span`
  font-size: 2.4rem;
  font-family: 'Oxygen', sans-serif;
  padding-top: 1rem;
  color: ${props => props.theme.grape};
`

const Contributor = styled.a`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5rem 10rem;

  &:hover {
    text-decoration: underline;
  }
`

const StyledLoader = styled(Loader)`
  margin: 15rem auto;
`

const Note = styled.footer`
  font-family: 'Oxygen', sans-serif;
  color: ${props => props.theme.warmGrey};
  font-size: 1.8rem;
  margin: 3rem auto;
  text-align: center;
`

const ContributorsPage = ({ contributors }) => (
  <Layout>
    <Header>Contributors</Header>
    {!contributors ? (
      <StyledLoader size="80" border="8" />
    ) : (
      <ContributorsList>
        {contributors.map(c => (
          <li>
            <Contributor
              href={c.html_url}
              target="_blank"
              rel="noopener noreferrer">
              <Avatar src={c.avatar_url} alt={c.login} />
              <Name>{c.login}</Name>
            </Contributor>
          </li>
        ))}
      </ContributorsList>
    )}
    <Note>
      * If you can&apos;t find yourself in this list, but you&apos;ve
      contributed to this project,&nbsp;
      <a
        href="https://help.github.com/articles/why-are-my-contributions-not-showing-up-on-my-profile/"
        target="_blank"
        rel="noopener noreferrer">
        this
      </a>
      &nbsp;might be the answer.
    </Note>
  </Layout>
)

export default compose(
  withState('contributors', 'setContributors'),
  lifecycle({
    componentDidMount() {
      fetch('https://api.github.com/repos/kitos/web-purple/contributors')
        .then(r => r.json())
        .then(contributors => this.props.setContributors(contributors))
    },
  }),
)(ContributorsPage)
