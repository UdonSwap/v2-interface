import { ChainId } from 'udonswap-v2'
import React, { useRef, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { Text } from 'rebass'

import styled from 'styled-components'
// import { ButtonHeader } from '../Button'
import Udonswap from '../../assets/images/UdonSwapLogo.png'
import { useActiveWeb3React } from '../../hooks'
// import { useDarkModeManager } from '../../state/user/hooks'
import { useETHBalances } from '../../state/wallet/hooks'
// import { Link } from 'react-router-dom'
import { YellowCard } from '../Card'
import Settings from '../Settings'
// import Menu from '../Menu'

import Row, { RowBetween } from '../Row'
import Web3Status from '../Web3Status'
import ToggleHeader from '../ToggleHeader'
// import VersionSwitch from './VersionSwitch'
import sidebar from './header.module.css'

import menu from '../../assets/images/menu.svg'
import close from '../../assets/images/close.svg'

const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  top: 0;
  position: absolute;
  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 12px 0 0 0;
    width: calc(100%);
    position: relative;
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`
const Headericon = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    margin-top: -30px;
`};
`

// const HeaderElementWrap = styled.div`
//   display: flex;
//   align-items: center;

//   ${({ theme }) => theme.mediaWidth.upToSmall`
//     margin-top: 0.5rem;
// `};
// `

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;

  :hover {
    cursor: pointer;
  }
`

const TitleText = styled(Row)`
  width: fit-content;
  white-space: nowrap;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    width:50vw;
  `};
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #2f2a3c;
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  color: white;
`

const TestnetWrapper = styled.div`
  white-space: nowrap;
  width: fit-content;
  margin-left: 10px;
  pointer-events: auto;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    margin-top: 10px;
    margin-left: 115px;
`};
`

const NetworkCard = styled(YellowCard)`
  width: fit-content;
  margin-right: 10px;
  border-radius: 12px;
  padding: 8px 12px;
  background-color: #1c1924;

  ${({ theme }) => theme.mediaWidth.upToLarge`
  font-size:7px;
  padding: 13px 9px;
  border-radius: 11px;
  margin-right: 2px;
`};
  ${({ theme }) => theme.mediaWidth.upToMedium`
  font-size: 10px;
    padding: 7px 11px;
    border-radius: 6px;
`};
`

const UniIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    img { 
      width: 4.5rem;
    }
  `};
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: column;
    align-items: flex-end;
  `};
`
const Headermode = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: column-reverse;
    align-items: flex-start;
  `};
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToLarge`
    font-size:8px;
    padding: 8px 9px;
    border-radius: 8px;
    
  `};
`

const NETWORK_LABELS: { [chainId in ChainId]: string | null } = {
  [ChainId.MAINNET]: null,
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.SEPOLIA]: 'Sepolia',
  [ChainId.MODE]: 'Mode'
}

export default function Header() {
  const { account, chainId } = useActiveWeb3React()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  // const [isDark] = useDarkModeManager()
  const headerRef = useRef<HTMLDivElement>(null)
  const [toggle, setToggle] = useState(false)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setToggle(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  return (
    <HeaderFrame>
      <RowBetween style={{ alignItems: 'flex-start' }} padding="1rem 1rem 0 1rem">
        <div style={{ width: '33.33%' }}>
          <Title href="https://beatswap-eta.vercel.app/">
            <UniIcon>{/* <img src={isDark ? LogoDark : Logo} alt="logo" /> */}</UniIcon>
            <TitleText>
              <img className={sidebar.logo} src={Udonswap} alt="logo" />
            </TitleText>
          </Title>
        </div>

        <HeaderElement className={sidebar.center} style={{ width: '33.33%' }}>
          <ToggleHeader />
        </HeaderElement>

        <HeaderControls style={{ width: '33.33%', justifyContent: 'flex-end' }}>
          <HeaderElement>
            <Headermode>
              <TestnetWrapper className={sidebar.modebutton}>
                {!isMobile && chainId && NETWORK_LABELS[chainId] && (
                  <NetworkCard>{NETWORK_LABELS[chainId]}</NetworkCard>
                )}
              </TestnetWrapper>
              <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
                {account && userEthBalance ? (
                  <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                    {userEthBalance?.toSignificant(4)} ETH
                  </BalanceText>
                ) : null}
                <Web3Status />
              </AccountElement>
            </Headermode>
          </HeaderElement>

          <Headericon>
            <Settings />
            <div className={sidebar.right}>
              <div className={sidebar.menu}>
                <img
                  src={`${toggle ? close : menu}`}
                  className={sidebar.imgmenu}
                  onClick={() => setToggle(prev => !prev)}
                />
              </div>

              <div ref={headerRef} className={toggle ? sidebar.flex : sidebar.hidden}>
                <ToggleHeader />
              </div>
            </div>
          </Headericon>
        </HeaderControls>
      </RowBetween>
    </HeaderFrame>
  )
}
