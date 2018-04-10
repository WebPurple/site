import React from 'react'
import styled, { withTheme } from 'styled-components'
import { compose, lifecycle, withStateHandlers } from 'recompose'
import ym from 'react-yandex-metrika'

import { BrowserOnly, media } from '../../utils/css-utils'
import Button from '../common/button'
import { subscibtionBackground } from '../../utils/selectors'

const SubscriptionFormContainer = styled.section`
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6em 2em;
  ${media.desktop`padding: 10em 2em;`};

  background-size: cover;
  background: #9300ef url(${subscibtionBackground()});
  background-blend-mode: soft-light;
`

const Header = styled.h2`
  text-align: center;
  margin: 0;
  margin-bottom: 0.615rem; /* 16px */
  font-family: 'Rubik', sans-serif;
  font-weight: bold;
  color: #fff;
  font-size: 2.6em;
  ${media.tablet`
    font-size: 4.8em;
  `};
`

const SubHeader = styled.p`
  text-align: center;
  margin: 0;
  margin-bottom: 2.86rem; /* 40px */
  font-family: 'Oxygen', sans-serif;
  color: #fff;
  font-size: 1.4em;
  ${media.tablet`
    font-size: 2.4em;
  `};
`

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${media.tablet`
    width: auto;
    flex-direction: row;
  `};
`

const Input = styled.input`
  font-family: 'Oxygen', sans-serif;
  font-size: 2.4em;
  box-sizing: border-box;
  width: 100%;
  padding: 0.83em 1.25em;
  color: #ccc;
  margin-bottom: 1rem; /* 24px */
  ${media.tablet`
    width: 350px;
    margin-right: .625rem; /* 15px */
    margin-bottom: 0;
  `};
`

const SubscriptionForm = ({ theme, hasSubscribed, subscribe }) =>
  !hasSubscribed && (
    <BrowserOnly>
      <SubscriptionFormContainer>
        <Header>Be informed about the coolest meetups</Header>
        <SubHeader>
          Get Webpurples latest news straight to your inbox. Enter your email
          address below:
        </SubHeader>
        <FormWrapper data-netlify="true">
          <Input
            type="email"
            required
            placeholder="Enter your email"
            name="email"
          />
          <Button
            defaultSheme={'#fff'}
            hoverColor={theme.vividPurple}
            onClick={() => subscribe()}>
            Subscribe
          </Button>
        </FormWrapper>
      </SubscriptionFormContainer>
    </BrowserOnly>
  )

export default compose(
  withStateHandlers(() => ({}), {
    subscribe: () => setStateOnly => {
      if (!setStateOnly) {
        window.localStorage.setItem('email-subscription', 'done')
        ym('reachGoal', 'email-subscription')
      }

      return { hasSubscribed: true }
    },
  }),
  lifecycle({
    componentDidMount() {
      if (window.localStorage.getItem('email-subscription') === 'done') {
        this.props.subscribe(true)
      }
    },
  }),
  withTheme,
)(SubscriptionForm)
