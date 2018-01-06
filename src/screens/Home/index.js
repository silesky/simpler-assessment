import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'
import stocks from '../../data/sample'
/*
 {
        "Meta Data": {
            "1. Information": "Weekly Adjusted Prices and Volumes",
            "2. Symbol": "MSFT",
            "3. Last Refreshed": "2017-11-20",
            "4. Time Zone": "US/Eastern"
        },
*/

const Home = () => (
  <div className="wrapper">
    <h1>Stocks</h1>
    {stocks.map(eachStock => {
      const symbol = eachStock['Meta Data']['2. Symbol']
      const lastRefreshed = eachStock['Meta Data']['3. Last Refreshed']
      return (
        <StockLink key={symbol} symbol={symbol} lastRefreshed={lastRefreshed} />
      )
    })}
  </div>
)
const StockLink = ({ symbol, lastRefreshed }) => (
  <div>
    <Link key={symbol} to={`/stocks/${symbol}`}>
      {symbol}
    </Link>
    <p>({lastRefreshed})</p>
  </div>
)
export default Home
