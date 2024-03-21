import { JSBI, Pair } from 'udonswap-v2'
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
// import { currencyId } from '../../utils/currencyId'
import { unwrappedToken } from '../../utils/wrappedCurrency'
import { ButtonSecondaryPage } from '../Button'
// import { AutoRowPage } from '../Row'
import Card, { GreyCard } from '../Card'
import { AutoColumn } from '../Column'
// import CurrencyLogo from '../CurrencyLogo'
import DoubleCurrencyLogo from '../DoubleLogo'
import { RowBetween, RowFixed } from '../Row'
// import { Dots } from '../swap/styleds'
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
// export default function FullPositionCardPage({ pair }: any) {
//   const { account } = useActiveWeb3React()
//   console.log('account', account);
//   console.log('pair in card',pair);
//   const currency0 = unwrappedToken(pair.token0)
//   const currency1 = unwrappedToken(pair.token1)
//   const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
//   const totalPoolTokens = useTotalSupply(pair.liquidityToken)
//   const poolTokenPercentage =
//     !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
//       ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
//       : undefined
//   const [token0Deposited, token1Deposited] =
//     !!pair &&
//       !!totalPoolTokens &&
//       !!userPoolBalance &&
//       // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
//       JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
//       ? [
//         pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
//         pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false)
//       ]
//       : [undefined, undefined]
//   return (

//     <div className={positioncard.posMain}>
//       <div className={positioncard.PosSec1}>
//         <DoubleCurrencyLogo currency0={currency0} currency1={currency1} margin={true} size={20} />
//         <Text fontWeight={500} fontSize={20}>
//           {!currency0 || !currency1 ? <Dots>Loading</Dots> : `${currency0.symbol}/${currency1.symbol}`}
//         </Text>
//       </div>
//       <div>
//         <div className={positioncard.bFlex}>
//           <Text fontSize={16} fontWeight={500}>
//             {currency0.symbol}:
//           </Text>
//           {token0Deposited ? (
//             <RowFixed>
//               <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
//                 {token0Deposited?.toSignificant(6)}
//               </Text>
//               <CurrencyLogo size="20px" style={{ marginLeft: '8px' }} currency={currency0} />
//             </RowFixed>
//           ) : (
//             '-'
//           )}
//         </div>
//         <div className={positioncard.bFlex}>
//           <Text fontSize={16} fontWeight={500}>
//             {currency1.symbol}:
//           </Text>
//           {token1Deposited ? (
//             <RowFixed>
//               <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
//                 {token1Deposited?.toSignificant(6)}
//               </Text>
//               <CurrencyLogo size="20px" style={{ marginLeft: '8px' }} currency={currency1} />
//             </RowFixed>
//           ) : (
//             '-'
//           )}
//         </div>
//       </div>
//       <div>
//         <div style={{ fontSize: '16px', padding: '3px 0px' }}>
//           Tokens: <span style={{ color: 'green' }}>{userPoolBalance ? userPoolBalance.toSignificant(4) : '-'}</span>
//         </div>
//         <div style={{ fontSize: '16px', padding: '3px 0px' }}>
//           Share: {poolTokenPercentage ? poolTokenPercentage.toFixed(2) + '%' : '-'}
//         </div>
//       </div>
//       <div className={positioncard.BtnFlex}>
//         <ButtonSecondaryPage as={Link} to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`} width="50px">
//           +
//         </ButtonSecondaryPage>
//         <ButtonSecondaryPage as={Link} width="50px" to={`/remove/${currencyId(currency0)}/${currencyId(currency1)}`}>
//           −
//         </ButtonSecondaryPage>
//       </div>
//     </div>
//   )
// }

export default function FullPositionCardPage({ pair }: any): JSX.Element {
  if (!pair?.pair?.token0 || !pair?.pair?.token1) {
    // Handle case where token0 or token1 is undefined
    return (
      <div className={positioncard.posMain}>
        <div>Loading</div>
      </div>
    )
  }

  function formatNumber(number: number): number {
    return Math.floor(number * 100) / 100 // Truncate to two decimal places
  }

  function truncateDecimals(number: number, decimalPlaces: number): number {
    const powerOfTen = Math.pow(10, decimalPlaces)
    return Math.floor(number * powerOfTen) / powerOfTen
  }

  const { totalSupply, reserve0, reserve1, token0, token1 } = pair.pair
  const { symbol: token0Symbol, id: token0Id } = token0
  const { symbol: token1Symbol, id: token1Id } = token1

  let token0UrlPart = token0Id === '0x4200000000000000000000000000000000000006' ? 'ETH' : token0Id
  let token1UrlPart = token1Id === '0x4200000000000000000000000000000000000006' ? 'ETH' : token1Id

  let displayToken0Symbol = token0Symbol
  let displayToken1Symbol = token1Symbol

  if (token0Id === '0x4200000000000000000000000000000000000006') {
    displayToken0Symbol = 'ETH'
  }

  if (token1Id === '0x4200000000000000000000000000000000000006') {
    displayToken1Symbol = 'ETH'
  }

  // Calculate shares
  const shares = parseFloat(pair.liquidityTokenBalance || 0) / parseFloat(totalSupply || 0)

  // Calculate ans1 and ans2
  const ans1 = truncateDecimals(shares * parseFloat(reserve0), 4)
  const ans2 = truncateDecimals(shares * parseFloat(reserve1), 4)

  // Calculate poolShares
  const poolShares = formatNumber(shares * 100)

  return (
    <div className={positioncard.posMain}>
      <div className={positioncard.left}>
        <div className={positioncard.PosSec1}>
          <Text className={positioncard.text1}>{`${displayToken0Symbol}/${displayToken1Symbol}`}</Text>
        </div>
        <div className={positioncard.second}>
          <div className={positioncard.bFlex}>
            <Text className={positioncard.text2}>{displayToken0Symbol || '-'}:</Text>
            <Text marginLeft={'6px'} className={positioncard.text2}>
              {ans1}
            </Text>
          </div>
          <div className={positioncard.bFlex}>
            <Text className={positioncard.text2}>{displayToken1Symbol || '-'}:</Text>
            <Text className={positioncard.text2} marginLeft={'6px'}>
              {ans2}
            </Text>
          </div>
        </div>
      </div>

      <div className={positioncard.third}>
        <div className={positioncard.text3}>
          Tokens:{' '}
          <span style={{ color: 'green', fontWeight: 600 }}>{truncateDecimals(pair.liquidityTokenBalance, 4)}</span>
        </div>
        <div className={positioncard.text3}>
          Pool Shares: <span style={{ color: 'green', fontWeight: 600 }}>{poolShares}%</span>
        </div>
      </div>
      <div className={positioncard.BtnFlex}>
        <ButtonSecondaryPage as={Link} to={`/add/${token0UrlPart}/${token1UrlPart}`} className={positioncard.button4}>
          +
        </ButtonSecondaryPage>
        <ButtonSecondaryPage
          as={Link}
          // width="50px"
          to={`/remove/${token0UrlPart}/${token1UrlPart}`}
          className={positioncard.button4}
        >
          −
        </ButtonSecondaryPage>
      </div>
    </div>
  )
}
