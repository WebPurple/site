// @flow
import React from 'react'
import type { Node } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import ArrowButton from '../components/arrow-button/arrow-button'

const LINK =
  'https://github.com/WebPurple/site/issues/new?labels=bug&title=WebPurple+site+crash&body='

let globalHandlerMounted: boolean = false
let consoleIssueLink: boolean = false

const ErrorContainer = styled.div`
  padding: 20px;
`

const CodeContainer = styled.div`
  padding: 20px;
  border: 1px solid ${props => props.theme.lipstick || '#e62270'};
  border-radius: 2px;
  margin-top: 10px;
`

const Title = styled.h1`
  font-size: 3.6rem;
  font-family: Rubik, sans-serif;
  font-weight: bold;
  color: ${props => props.theme.lipstick || '#e62270'};
`

const Code = styled.pre`
  font-size: 1.6rem;
  overflow-x: auto;
`

const Link = ArrowButton.withComponent('a').extend`
  color: black;
  font: bold 1.8em Rubik;
  font-family: Rubik, sans-serif;
`

const codeBlock = (code: string): string => '```\n' + code + '\n```'

const parseError = (error: Object): string => {
  let errorText = JSON.stringify(error)
  if (error instanceof Error) {
    errorText = error.name + '\n' + error.message + '\n' + error.stack
    // $FlowFixMe
  } else if (error instanceof ErrorEvent) {
    errorText = error.error.message + '\n' + error.error.stack
  } else if (error.componentStack) {
    errorText = 'Component Stack\n' + error.componentStack.slice(1)
  }
  return errorText
}

const openIssueLink = (errors: Array<string>): string =>
  encodeURI(LINK + errors.reduce((acc, err) => acc + '\n' + codeBlock(err), ''))

const formatErrors = (...args: any): Array<string> =>
  [...args].map(arg => parseError(arg))

const consoleNewIssueLink = () => {
  if (!consoleIssueLink) {
    console.log(
      'You can create new issue at https://github.com/WebPurple/site/issues/new?labels=bug',
    )
    consoleIssueLink = true
  }
}

const ErrorSplash = ({ errors }: { errors: Array<string> }) =>
  Array.isArray(errors) && (
    <ErrorContainer>
      <Title>Something went wrong!</Title>
      <Link href={openIssueLink(errors)}>Open issue</Link>
      {errors.map(error => (
        <CodeContainer>
          <Code>{error}</Code>
        </CodeContainer>
      ))}
    </ErrorContainer>
  )

const globalErrorHandler = (...args: any): boolean => {
  const root = document.getElementById('___gatsby')
  setImmediate(() => {
    if (root !== null && !root.children.length) {
      const errors = formatErrors(...args)
      ReactDOM.render(<ErrorSplash errors={errors} />, root)
      window.removeEventListener('error', globalErrorHandler)
    }
  })

  consoleNewIssueLink()
  return true
}

type ErrorHandlerPropsType = {
  children: Node,
}

type ErrorHandlerStateType = {
  errors: ?Array<string>,
}

export class ErrorHandler extends React.Component<
  ErrorHandlerPropsType,
  ErrorHandlerStateType,
> {
  constructor(props: ErrorHandlerPropsType) {
    super(props)
    this.state = {
      errors: null,
    }
  }

  componentDidMount() {
    if (!globalHandlerMounted) {
      window.addEventListener('error', globalErrorHandler)
      globalHandlerMounted = true
    }
  }

  componentDidCatch(error: any, info: any) {
    this.setState(
      state => (state.errors ? null : { errors: formatErrors(error, info) }),
    )
  }

  render() {
    const { errors } = this.state
    return errors ? <ErrorSplash errors={errors} /> : this.props.children
  }
}
