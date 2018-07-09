// @flow
import * as React from 'react'
import styled from 'styled-components'
import { height } from 'styled-system'
import { Flex, Box } from 'grid-styled'
import { tColor } from '../utils/css-utils'

let Link = styled.a`
  color: ${tColor('warmGrey')};
  text-decoration: none;
`

let MyBox = styled(Box)`
  ${height};
`

export interface IFileLinkProps {
  icon: React.ComponentType<any>;
  href: string;
  className?: ?string;
  onClick?: () => void;
  children?: any; // React.Node doesn't want to work :-(
}

let FileLink = ({
  children,
  className,
  icon: Icon,
  href,
  onClick,
}: IFileLinkProps) => {
  return (
    <Flex
      is={Link}
      href={href}
      onClick={onClick}
      className={className}
      fontSize={['16px', '18px']}
      target="__blank"
      rel="noreferrer noopener"
      alignItems="center">
      <MyBox is={Icon} height={['12px', '18px']} mr="12px" />
      {children}
    </Flex>
  )
}

export { FileLink }

export default FileLink
