import React from 'react'
import { getStockBySymbol } from '../../shared/utils'

const Stock = ({ match: { params: { stockName } } }) => {
  const {
    dates,
  } = getStockBySymbol(stockName)
  return (
    <div>
      <h1>{stockName}</h1>
      { dates.map(({ date, ...eachDate }) => (
        <div key={date}>
          <hr />
          <h2>{date}</h2>
          <div>open: { eachDate.open}</div>
          <div>high: { eachDate.high }</div>
          <div>low: { eachDate.low }</div>
          <div>close: { eachDate.close }</div>
          <div>adjusted close: { eachDate.closeAdj } </div>
          <div>volume: { eachDate.vol } </div>
          <div>dividend: { eachDate.dividend } </div>
        </div>
      ))
      }
    </div>
  )
}
export default Stock
