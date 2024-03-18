import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from 'styled-components'
// import { Pair } from 'lampros_dex_sdk'
import FullPositionCardPage from '../../components/PositionCardPage'
// import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { TYPE } from '../../theme'
import { LightCard } from '../../components/Card'
import { useActiveWeb3React } from '../../hooks'
// import { usePairs } from '../../data/Reserves'
// import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
import { Dots } from '../../components/swap/styleds'
import position from './position.module.css'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'

// Define your GraphQL query
const LIQUIDITY_POSITIONS_QUERY = gql`
  query Query($userId: ID!) {
    user(id: $userId) {
      liquidityPositions {
        liquidityTokenBalance
        id
        poolOwnership
        pair {
          id
          reserve0
          reserve1
          totalSupply
          token0 {
            id
            name
            symbol
          }
          token1 {
            id
            name
            symbol
          }
        }
      }
    }
  }
`

export default function Pool() {
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()
  console.log(typeof account)

  //   const [pairResult, setPairResult] = useState(null)
  const [pairResult, setPairResult] = useState<{ liquidityPositions: any[] } | null>(null)

  useEffect(() => {
    const client = new ApolloClient({
      link: new HttpLink({
        uri: 'https://api.goldsky.com/api/public/project_clth71vucl2l701uu07ha0im7/subgraphs/udonswap/0.0.1/gn'
      }),
      cache: new InMemoryCache()
    })
    const fetchData = async (address: string) => {
      console.log('hello')
      try {
        const result = await client.query({
          query: LIQUIDITY_POSITIONS_QUERY,
          variables: {
            userId: address.toLowerCase()
          },
          fetchPolicy: 'no-cache'
        })

        setPairResult(result.data.user)

        console.log('the result obj', result)
        console.log('the result obj', result.data.user.liquidityPositions)

        if (result.data.user !== null) {
          console.log('hellobhaisaab')
          const liquidityPositions = result.data.user.liquidityPositions

          if (liquidityPositions.length > 0) {
            liquidityPositions.forEach(({ liquidityTokenBalance, pair }: any, index: number) => {
              const { totalSupply, reserve0, reserve1, token0, token1 } = pair
              const { name: token0Name, symbol: token0Symbol } = token0
              const { name: token1Name, symbol: token1Symbol } = token1

              // Calculate shares
              const shares = parseFloat(liquidityTokenBalance ? liquidityTokenBalance : '') / parseFloat(totalSupply)

              // Calculate ans1 and ans2
              const ans1 = shares * parseFloat(reserve0)
              const ans2 = shares * parseFloat(reserve1)

              console.log(`Liquidity Position ${index + 1}:`)
              console.log('shares:', shares * 100)
              console.log(`${token0Name} (${token0Symbol}):`, ans1)
              console.log(`${token1Name} (${token1Symbol}):`, ans2)
              console.log('liquidityTokenBalance:', liquidityTokenBalance)
            })
          } else {
            console.log('No liquidity positions found.')
          }
        } else {
          console.log('No data found.')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    if (account) fetchData(account)
  }, [account])

  /* // fetch the user's balances of all tracked V2 LP tokens
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
  console.log('the v2Pair', v2Pairs)

    const v2IsLoading =
      fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some(V2Pair => !V2Pair)

    const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair)) */

  console.log('pair result from useState', pairResult)
  return (
    <>
      <div className={position.posMain}>
        <div className={position.title}>
          <h1>YOUR LIQUIDITY</h1>
        </div>

        {!account ? (
          <LightCard padding="40px">
            <TYPE.body color={theme.text3} textAlign="center">
              Connect to a wallet to view your liquidity.
            </TYPE.body>
          </LightCard>
        ) : !pairResult ? (
          <LightCard padding="40px">
            <TYPE.body color={theme.text3} textAlign="center">
              <Dots>Loading</Dots>
            </TYPE.body>
          </LightCard>
        ) : pairResult?.liquidityPositions?.length !== 0 ? (
          <>
            {pairResult?.liquidityPositions?.map((pair, index) => (
              <FullPositionCardPage key={index} pair={pair} />
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
