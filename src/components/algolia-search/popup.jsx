import styled from 'styled-components'
import { width } from 'styled-system'

export let Popup = styled.div`
  ${width};
  background: #fff;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  border: 1px solid lightgray;
  border-radius: 3px;
  padding: 3px;
  margin-top: 10px; // for Arrow
`

export let Arrow = styled.div`
  position: absolute;
  top: 0;
  width: 20px;
  height: 10px;

  margin-top: -9px;

  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
  }

  &::before {
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent #000 transparent;
  }

  &::after {
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent #fff transparent;
  }
`
