import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import header from '../Header/header.module.css'
const HeaderElementWrap = styled.div`
  background: #1c1924;
  border-radius: 10px;
  display: flex;
  gap: 0;
  justify-content: center;
  max-width: 800px;
  margin: '0px auto'
    ${({ theme }) => theme.mediaWidth.upToSmall`
        margin-top: 10px;
        display:flex;
        flex-direction: column;
        width: 10px
    `};
`
const ButtonHeader = styled(NavLink)`
  border: 1px solid #0000;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  padding: 1rem 2rem;
  position: relative;
  text-decoration: none;
  transition: color 0.3s;
  &.active {
    color: #e9e002;
    /* Additional active styles if needed */
  }
  &:hover {
    color: #e9e002;
  }
  ${({ theme }) => theme.mediaWidth.upToLarge`
  font-size: 11px;  
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 0.7rem 1.5rem;
  margin-top: 4px
    `};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  font-size: 10px;  
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 12px 100px 12px 12px;
  margin-top:0;
    `};
`
const ButtonHeaderBorder = styled(ButtonHeader)`
  border-right-color: #deff0259;
  &:hover {
    color: #e9e002;
  }
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        border-bottom-color: #deff0259;
        border-right: 0px;
    `};
`
export default function ToggleHeader() {
  return (
    <HeaderElementWrap style={{ margin: '0px auto' }} className={header.toggleMenuMain}>
      <ButtonHeaderBorder exact activeClassName="active" to="/swap">
        Swap
      </ButtonHeaderBorder>
      <ButtonHeaderBorder exact activeClassName="active" to="/liquidity">
        Pools
      </ButtonHeaderBorder>
      <ButtonHeader exact activeClassName="active" to="/positions">
        Positions
      </ButtonHeader>
    </HeaderElementWrap>
  )
}
