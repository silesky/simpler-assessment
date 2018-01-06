import React from 'react'
import { Link } from 'react-router-dom'
import { getStocks } from '../../shared/utils'

const Stocks = () => (
  <div className="wrapper">
    {getStocks().map(({ sym, lastRefreshed }) => {
      return <Stock key={sym} symbol={sym} lastRefreshed={lastRefreshed} />
    })}
  </div>
)
const Stock = ({ symbol, lastRefreshed }) => {
  const newTo = {
    pathname: `/stocks/${symbol}`,
    symbol: `${symbol}`,
  }
  return (
    <div>
      <Link key={symbol} to={newTo}>
        {symbol}
      </Link>
      <p>({lastRefreshed})</p>
    </div>
  )
}
export default Stocks
