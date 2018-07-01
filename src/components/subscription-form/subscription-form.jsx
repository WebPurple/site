import React from 'react'
import styled, { withTheme } from 'styled-components'
import { compose, lifecycle, withStateHandlers } from 'recompose'
import ym from 'react-yandex-metrika'

import { media } from '../../utils/css-utils'
import Button from '../common/button'
import { subscibtionBackground } from '../../utils/selectors'

const SubscriptionFormContainer = styled.section`
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6em 2em;
  background-size: cover;
  transform: translateZ(0);
  background: url(${subscibtionBackground()});
  background-position: top center;
  ${media.desktop`padding: 10em 2em;`};

  position: relative;

  & > * {
    position: relative;
  }

  &:before {
    position: absolute;
    background: linear-gradient(to bottom, #be00ff, #6200ff);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    display: block;
    opacity: 0.75;
  }
`

const Header = styled.h2`
  text-align: center;
  margin: 0 0 0.615rem;
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

const FORM_NAME = 'email-subscription'

const SubscriptionForm = ({ theme, hasSubscribed, subscribe }) =>
  !hasSubscribed && (
    <SubscriptionFormContainer>
      <Header>Be informed about the coolest meetups</Header>
      <SubHeader>
        Get Webpurples latest news straight to your inbox. Enter your email
        address below:
      </SubHeader>
      <FormWrapper
        name={FORM_NAME}
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={subscribe}>
        <p hidden>
          <label>
            Don’t fill this out: <input name="bot-field" />
          </label>
        </p>

        <Input
          name="email"
          type="email"
          required
          placeholder="Enter your email"
        />

        <Button defaultSheme={'#fff'} hoverColor={theme.vividPurple}>
          Subscribe
        </Button>
      </FormWrapper>
    </SubscriptionFormContainer>
  )

const encode = data =>
  Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')

export default compose(
  withStateHandlers(() => ({}), {
    subscribe: () => (_, setStateOnly) => {
      if (!setStateOnly) {
        let form = window.document.forms[FORM_NAME]
        let email = form.elements.email.value

        window
          .fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode({
              'form-name': FORM_NAME,
              email,
            }),
          })
          .then(() => {
            window.localStorage.setItem(FORM_NAME, 'done')
            alert('Мы вас запомнили! Только рассылку пока не реализовали :-)')
            ym('reachGoal', 'email-subscription')
          })
      }

      return { hasSubscribed: true }
    },
  }),
  lifecycle({
    componentDidMount() {
      if (window.localStorage.getItem(FORM_NAME) === 'done') {
        this.props.subscribe(null, true)
      }
    },
  }),
  withTheme,
)(SubscriptionForm)
