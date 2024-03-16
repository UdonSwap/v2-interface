import React, { useContext, useMemo } from 'react'
import { ThemeContext } from 'styled-components'
import { Pair } from 'udonswap-v2'
// import Question from '../../components/QuestionHelper'
import FullPositionCardPage from '../../components/PositionCardPage'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { TYPE } from '../../theme'
// import { Text } from 'rebass'
// import Question from '../../components/QuestionHelper'
import { LightCard } from '../../components/Card'
// import { RowBetween } from '../../components/Row'
// import { AutoColumn } from '../../components/Column'
import { useActiveWeb3React } from '../../hooks'
import { usePairs } from '../../data/Reserves'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
// import AppBody from '../AppBody'
import { Dots } from '../../components/swap/styleds'
// import { DivideSquare } from 'react-feather'
import position from './position.module.css'

export default function Pool() {
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map(tokens => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map(tpwlt => tpwlt.liquidityToken), [
    tokenPairsWithLiquidityTokens
  ])
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some(V2Pair => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  return (
    <>
      <div className={position.posMain}>
        <div className={position.title}>
          <h1>LIQUIDITY</h1>
        </div>

        {!account ? (
          <LightCard padding="40px">
            <TYPE.body color={theme.text3} textAlign="center">
              Connect to a wallet to view your liquidity.
            </TYPE.body>
          </LightCard>
        ) : v2IsLoading ? (
          <LightCard padding="40px">
            <TYPE.body color={theme.text3} textAlign="center">
              <Dots>Loading</Dots>
            </TYPE.body>
          </LightCard>
        ) : allV2PairsWithLiquidity?.length > 0 ? (
          <>
            {allV2PairsWithLiquidity.map(v2Pair => (
              <FullPositionCardPage key={v2Pair.liquidityToken.address} pair={v2Pair} />
            ))}
          </>
        ) : (
          <LightCard padding="40px">
            <TYPE.body color={theme.text3} textAlign="center">
              No liquidity found.
            </TYPE.body>
          </LightCard>
        )}
      </div>
    </>
  )
}
