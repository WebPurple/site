import * as React from 'react'
import styled from 'styled-components'
import { media } from '../../utils/css-utils'

let StyledMarkdown = styled.div`
  font-family: Oxigen, sans-serif;
  font-size: 1.8rem;
  ${media.desktop`font-size: 2.2rem`};
  line-height: 1.58;
  color: ${({ theme }) => theme.greyishBrown};

  h2 {
    font-family: Rubik, sans-serif;
    font-size: 3.6rem;
    ${media.desktop`font-size: 4.4rem`};
  }

  p,
  ul,
  blockquote {
    margin-top: 2rem;
    ${media.desktop`margin-top: 3rem;`};
  }

  img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }

  ul {
    padding: 0;
    list-style: none;

    li {
      position: relative;
      margin-top: 2.4rem;
      padding-left: 3.6rem;

      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 1.1rem;
        display: block;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: ${({ theme }) => theme.lipstick};
      }
    }
  }

  blockquote {
    margin: 0;
    padding-left: 3.6rem;
    border-left: solid 3px #e62270;
    font-style: italic;
  }

  tt,
  code {
    background-color: hsla(0, 0%, 0%, 0.04);
    border-radius: 3px;
    font-family: 'SFMono-Regular', Consolas, 'Roboto Mono', 'Droid Sans Mono',
      'Liberation Mono', Menlo, Courier, monospace;
    padding: 0.2em 0 0.2em;
    font-size: 1rem;
    ${media.desktop`font-size: 1.2rem`};
  }

  pre {
    background: hsla(0, 0%, 0%, 0.04);
    border-radius: 3px;
    line-height: 1.42;
    overflow: auto;
    word-wrap: normal; // So code will scroll on Safari.
    padding: 1.2rem;
  }
  pre code {
    background: none;
    line-height: 1.42;
  }
  // Add space before and after code/tt elements.
  code:before,
  code:after,
  tt:before,
  tt:after {
    letter-spacing: -0.2em;
    content: '\u00A0';
  }

  // But don't add spaces if the code is inside a pre.
  pre code:before,
  pre code:after,
  pre tt:before,
  pre tt:after {
    content: none;
  }
`

let HTMLContent = ({ children, ...rest }) => (
  <StyledMarkdown dangerouslySetInnerHTML={{ __html: children }} {...rest} />
)

export default HTMLContent
