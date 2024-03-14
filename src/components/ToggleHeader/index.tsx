import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const HeaderElementWrap = styled.div`
    background: #1c1924;
    border-radius: 10px;
    display: flex;
    gap: 0;
    justify-content: center;
    max-width: 800px;

    ${({ theme }) => theme.mediaWidth.upToSmall`
        margin-top: 0.5rem;
    `};
`

const ButtonHeader = styled(NavLink)`
    border: 1px solid #0000;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    letter-spacing:1px;
    padding: 1rem 2rem;
    position: relative;
    text-decoration: none;
    transition: color .3s;

    &.active {
        color:#e9e002;
        /* Additional active styles if needed */
    }
    &:hover {
        color: #e9e002;
    }
   
`

const ButtonHeaderBorder = styled(ButtonHeader)`
    border-right-color: #deff0259;
    &:hover {
        color: #e9e002;
    }
`

export default function ToggleHeader() {
    return (
        <HeaderElementWrap style={{ margin: '0px auto' }}>
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
