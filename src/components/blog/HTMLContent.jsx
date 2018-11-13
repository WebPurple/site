import * as React from 'react'
import styled from 'styled-components'
import { media } from '../../utils/css-utils'

let StyledMarkdown = styled.div`
  font-size: 1.8rem;
  ${media.desktop`font-size: 2.2rem`};
  line-height: 1.58;
  color: ${({ theme }) => theme.greyishBrown};

  h2 {
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
    max-height: 500px;
    width: 100%;
    max-width: 100%;
    ${media.desktop`width: auto`};

    & + em {
      display: block;
      text-align: center;
      padding-top: 10px;
      font-size: 1.4rem;
      ${media.desktop`font-size: 1.6rem`};
    }
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
`

let HTMLContent = ({ children, ...rest }) => (
  <StyledMarkdown dangerouslySetInnerHTML={{ __html: children }} {...rest} />
)

export default HTMLContent
