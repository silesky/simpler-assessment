// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import withLogic from './logic'
import type { StockT } from '../../shared/types'

type StockPropsT = {
  textSearchInput: string,
  setChangeTextFilter: Function,
  stocks: StockT[],
  setLessThanFilter: Function,
  setMoreThanFilter: Function,
  moreThan: string,
  lessThan: string,
}

const Stocks = ({
  textSearchInput,
  setChangeTextFilter,
  stocks,
  setLessThanFilter,
  lessThan,
}: StockPropsT): React.Element<*> => (
  <div className='wrapper'>
    <div className='filterWrapper'>
      <label>Symbol Search</label>
      <input
        placeholder='enter a stock symbol.'
        value={textSearchInput}
        type='text'
        onChange={({ target: { value } }) => setChangeTextFilter(value.trim())}
      />
    </div>
    <div className='filterWrapper'>
      <label>Less Than Share Price:</label>
      <input
        placeholder='enter a number.'
        value={lessThan || ''}
        type='number'
        onChange={({ target: { value } }) => setLessThanFilter(Number(value))}
      />
    </div>
    {stocks.map(({ sym, lastRefreshed, dates }) => {
      return (
        <Stock
          key={sym}
          symbol={sym}
          currentPrice={dates[0].close}
          lastRefreshed={lastRefreshed}
        />
      )
    })}
  </div>
)
const Stock = ({ symbol, currentPrice, lastRefreshed }) => {
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
      <p>${currentPrice}</p>
    </div>
  )
}
export default withLogic(Stocks)
