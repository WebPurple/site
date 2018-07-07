import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const Container = styled.div`
  padding: 20px;
`

const Title = styled.h1`
  font-size: 3.6rem;
  font-family: Rubik, sans-serif;
  font-weight: bold;
`

const Code = styled.pre`
  font-size: 1.6rem;
`

const Link = styled.a`
  font-size: 2rem;
`

const LINK =
  'https://github.com/WebPurple/site/issues/new?labels=bug&title=WebPurple+site+crash&body='

const codeBlock = code => '```\n' + code + '\n```'

const parseError = error => {
  if (error instanceof Error) {
    return error.name + '\n' + error.message + '\n' + error.stack
  }
  if (error.componentStack) {
    window.temp = error.componentStack
    return 'Component Stack\n' + error.componentStack.slice(1)
  }
  return JSON.stringify(error)
}

const openIssueLink = erros =>
  encodeURI(LINK + erros.reduce((acc, err) => acc + '\n' + codeBlock(err), ''))

export function errorHandler(WrappedComponent) {
  return class ErrorHandler extends React.Component {
    constructor(props) {
      super(props)
      this.state = { hasError: false }
    }

    handleError = (isCatch, ...args) => {
      this.setState(() => ({ hasError: true }))
      if (isCatch) {
        const erros = [...args].map(arg => parseError(arg))
        const link = openIssueLink(erros)
        ReactDOM.render(
          <Container>
            <Title>Something went wrong!</Title>
            <Link href={link}>Open issue</Link>
            <Container>{erros.map(error => <Code>{error}</Code>)}</Container>
          </Container>,
          document.getElementById('___gatsby'),
        )
      } else {
        console.log(
          'You can create new issue at https://github.com/WebPurple/site/issues/new?labels=bug',
        )
      }
    }

    componentDidMount() {
      window.addEventListener('error', (...args) =>
        this.handleError(false, ...args),
      )
    }

    componentDidCatch(error, info) {
      this.handleError(true, error, info)
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}
