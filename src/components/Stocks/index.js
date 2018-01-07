// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import withLogic from './logic'
import type { StockT } from '../../shared/types'

type StocksPropsT = {
  lessThan: string,
  setChangeTextFilter: Function,
  setLessThanFilter: Function,
  stocks: StockT[],
  textSearchInput: string,
}
const Stocks = ({
  lessThan,
  setChangeTextFilter,
  setLessThanFilter,
  stocks,
  textSearchInput,
}: StocksPropsT): React.Element<*> => (
  <div className='wrapper'>
    <div className='filterWrapper'>
      <label>Symbol Search</label>
      <input
        placeholder='enter a stock symbol.'
        value={textSearchInput}
        type='text'
        onChange={setChangeTextFilter}
      />
    </div>
    <div className='filterWrapper'>
      <label>Less Than Share Price:</label>
      <input
        placeholder='enter a number.'
        value={lessThan || ''}
        type='number'
        onChange={setLessThanFilter}
      />
    </div>
    {stocks.map(({ sym, dates }) => {
      return (
        <Stock
          key={sym}
          symbol={sym}
          currentPrice={dates[0].close}
          recentDate={dates[0].date}
        />
      )
    })}
  </div>
)

type StockPropsT = {
  symbol: string,
  currentPrice: Number,
  recentDate: string,
}
const Stock = ({
  symbol,
  currentPrice,
  recentDate,
}: StockPropsT): React.Element<*> => {
  const newTo = {
    pathname: `/stocks/${symbol}`,
    symbol: `${symbol}`,
  }
  return (
    <div>
      <Link key={symbol} to={newTo}>
        {symbol}
      </Link>
      <p>({recentDate})</p>
      <p>${currentPrice}</p>
    </div>
  )
}
export default withLogic(Stocks)
