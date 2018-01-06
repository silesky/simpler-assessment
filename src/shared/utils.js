import stocks from '../data/sample.json'
import { StockT, DateT } from './types'

export const getStocks = (): StockT[] => {
  return stocks.map(
    ({
      'Meta Data': { '2. Symbol': sym, '3. Last Refreshed': lastRefreshed },
      'Weekly Adjusted Time Series': dates,
    }) => {
      const mappedDates: DateT[] = Object.keys(dates).map(eachDate => {
        const stockInfo = dates[eachDate]
        return {
          date: eachDate,
          open: Number(stockInfo['1. open']),
          high: Number(stockInfo['2. high']),
          low: Number(stockInfo['3. low']),
          close: Number(stockInfo['4. close']),
          closeAdj: Number(stockInfo['5. adjusted close']),
          vol: Number(stockInfo['6. volume']),
          dividend: Number(stockInfo['7. dividend amount']),
          end: Number(stockInfo['7. dividend amount']),
        }
      })

      return {
        sym,
        lastRefreshed,
        dates: mappedDates,
      }
    },
  )
}

export const getStockBySymbol = (symbol: string): StockT =>
  getStocks().find(({ sym }) => symbol.toUpperCase() === sym)
