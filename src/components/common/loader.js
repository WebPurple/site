import React from 'react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    
    to {
        transform: rotate(360deg);
    }
`

const Svg = styled.svg`
  display: block;
  animation: ${spin} 0.7s linear infinite;
`

export default ({ size = 80, border = 8, className = '' }) => (
  <Svg
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <circle
      cx={size / 2}
      cy={size / 2}
      r={(size - border) / 2}
      stroke="url(#paint0_linear)"
      strokeWidth={border}
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x2="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(80) scale(80) rotate(90)">
        <stop stopColor="#9012FE" />
        <stop offset="0.430939" stopColor="#C41CA8" />
        <stop offset="1" stopColor="#E62270" />
      </linearGradient>
    </defs>
  </Svg>
)
