import React from 'react'
import allpool from './allpool.module.css'
import data from './data.json'
import { Link } from 'react-router-dom'
export default function Home() {
  return (
    <div className={allpool.poolList}>
      <div className={allpool.upperPart}>
        <div className={allpool.left}>
          <div className={allpool.text}>
            <h3>Pools</h3>
            <p>Create positions into pools to earn swap fees </p>
          </div>
          <div className={allpool.total}>
            <h4>Total TVL</h4>
            <p>$7,403,262.61</p>
          </div>
        </div>
        <div className={allpool.right}>
          <Link to={'/add/ETH'}>
            <button className={allpool.button}>Create position</button>
          </Link>
        </div>
      </div>
      <div className={allpool.tablediv}>
        <div className={allpool.head}>
          <table className={allpool.table}>
            <thead>
              <tr className={allpool.row}>
                <th className={allpool.column1}>Pools</th>
                <th className={allpool.column2}>TVL</th>
                <th className={allpool.column3}>Swap Fees APR Range</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className={allpool.content}>
          <table className={allpool.table}>
            <tbody>
              {data.map((token, index) => (
                <tr className={allpool.row} key={index}>
                  <td className={allpool.column1}>
                    {token.Pools.Pool1}-{token.Pools.Pool2}
                  </td>
                  <td className={allpool.column2}>{token.TVL}</td>
                  <td className={allpool.column3}>
                    {`${token['Swap Fees APR Range'].SwapLeft} > `}
                    <span style={{ color: 'red' }}>{token['Swap Fees APR Range'].SwapRight}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
