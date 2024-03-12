import { JSBI, Pair, Percent } from 'lampros_dex_sdk'
// import { darken } from 'polished'
import React, { useState } from 'react'
import positioncard from './positioncard.module.css'
import { Link } from 'react-router-dom'
import { Text } from 'rebass'
import styled from 'styled-components'
import { useTotalSupply } from '../../data/TotalSupply'

import { useActiveWeb3React } from '../../hooks'
import { useTokenBalance } from '../../state/wallet/hooks'
// import { ExternalLink } from '../../theme'
import { currencyId } from '../../utils/currencyId'
import { unwrappedToken } from '../../utils/wrappedCurrency'
import { ButtonSecondaryPage } from '../Button'
// import { AutoRowPage } from '../Row'
import Card, { GreyCard } from '../Card'
import { AutoColumn } from '../Column'
import CurrencyLogo from '../CurrencyLogo'
import DoubleCurrencyLogo from '../DoubleLogo'
import { RowBetween, RowFixed } from '../Row'
import { Dots } from '../swap/styleds'

export const FixedHeightRow = styled(RowBetween)`
  height: 24px;
  display: block;
`

export const HoverCard = styled(Card)`
  :hover {
    border: 1px solid #9657eb;
  }
  .focus {
    border: none;
  }
`

interface PositionCardProps {
  pair: Pair
  showUnwrapped?: boolean
  border?: string
}

export function MinimalPositionCard({ pair, showUnwrapped = false, border }: PositionCardProps) {
  const { account } = useActiveWeb3React()

  const currency0 = showUnwrapped ? pair.token0 : unwrappedToken(pair.token0)
  const currency1 = showUnwrapped ? pair.token1 : unwrappedToken(pair.token1)

  const [showMore, setShowMore] = useState(false)

  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false)
        ]
      : [undefined, undefined]

  return (
    <>
      {userPoolBalance && (
        <GreyCard
          border={border}
          style={{ backgroundColor: '#131118', minWidth: '25rem', border: '1px solid #323232' }}
          color={'white'}
        >
          <AutoColumn gap="12px">
            <FixedHeightRow>
              <RowFixed>
                <Text fontWeight={500} fontSize={16}>
                  Your position
                </Text>
              </RowFixed>
            </FixedHeightRow>
            <FixedHeightRow onClick={() => setShowMore(!showMore)}>
              <RowFixed>
                <DoubleCurrencyLogo currency0={currency0} currency1={currency1} margin={true} size={20} />
                <Text fontWeight={500} fontSize={20}>
                  {currency0.symbol}/{currency1.symbol}
                </Text>
              </RowFixed>
              <RowFixed>
                <Text fontWeight={500} fontSize={20}>
                  {userPoolBalance ? userPoolBalance.toSignificant(4) : '-'}
                </Text>
              </RowFixed>
            </FixedHeightRow>
            <AutoColumn gap="4px">
              <FixedHeightRow>
                <Text color="#888D9B" fontSize={16} fontWeight={500}>
                  {currency0.symbol}:
                </Text>
                {token0Deposited ? (
                  <RowFixed>
                    <Text color="#888D9B" fontSize={16} fontWeight={500} marginLeft={'6px'}>
                      {token0Deposited?.toSignificant(6)}
                    </Text>
                  </RowFixed>
                ) : (
                  '-'
                )}
              </FixedHeightRow>
              <FixedHeightRow>
                <Text color="#888D9B" fontSize={16} fontWeight={500}>
                  {currency1.symbol}:
                </Text>
                {token1Deposited ? (
                  <RowFixed>
                    <Text color="#888D9B" fontSize={16} fontWeight={500} marginLeft={'6px'}>
                      {token1Deposited?.toSignificant(6)}
                    </Text>
                  </RowFixed>
                ) : (
                  '-'
                )}
              </FixedHeightRow>
            </AutoColumn>
          </AutoColumn>
        </GreyCard>
      )}
    </>
  )
}

export default function FullPositionCardPage({ pair, border }: PositionCardProps) {
  const { account } = useActiveWeb3React()

  const currency0 = unwrappedToken(pair.token0)
  const currency1 = unwrappedToken(pair.token1)

  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  const poolTokenPercentage =
    !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
      : undefined

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false)
        ]
      : [undefined, undefined]

  return (
    <div className={positioncard.posMain}>
      <div className={positioncard.PosSec1}>
        <DoubleCurrencyLogo currency0={currency0} currency1={currency1} margin={true} size={20} />
        <Text fontWeight={500} fontSize={20}>
          {!currency0 || !currency1 ? <Dots>Loading</Dots> : `${currency0.symbol}/${currency1.symbol}`}
        </Text>
      </div>

      <div>
        <div className={positioncard.bFlex}>
          <Text fontSize={16} fontWeight={500}>
            {currency0.symbol}:
          </Text>
          {token0Deposited ? (
            <RowFixed>
              <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
                {token0Deposited?.toSignificant(6)}
              </Text>
              <CurrencyLogo size="20px" style={{ marginLeft: '8px' }} currency={currency0} />
            </RowFixed>
          ) : (
            '-'
          )}
        </div>
        <div className={positioncard.bFlex}>
          <Text fontSize={16} fontWeight={500}>
            {currency1.symbol}:
          </Text>
          {token1Deposited ? (
            <RowFixed>
              <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
                {token1Deposited?.toSignificant(6)}
              </Text>
              <CurrencyLogo size="20px" style={{ marginLeft: '8px' }} currency={currency1} />
            </RowFixed>
          ) : (
            '-'
          )}
        </div>
      </div>

      <div>
        <div style={{ fontSize: '16px', padding: '3px 0px' }}>
          Tokens: <span style={{ color: 'green' }}>{userPoolBalance ? userPoolBalance.toSignificant(4) : '-'}</span>
        </div>
        <div style={{ fontSize: '16px', padding: '3px 0px' }}>
          Share: {poolTokenPercentage ? poolTokenPercentage.toFixed(2) + '%' : '-'}
        </div>
      </div>
      <div className={positioncard.BtnFlex}>
        <ButtonSecondaryPage as={Link} to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`} width="50px">
          +
        </ButtonSecondaryPage>
        <ButtonSecondaryPage as={Link} width="50px" to={`/remove/${currencyId(currency0)}/${currencyId(currency1)}`}>
          −
        </ButtonSecondaryPage>
      </div>
    </div>
  )
}
