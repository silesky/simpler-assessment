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
          open: stockInfo['1. open'],
          high: stockInfo['2. high'],
          low: stockInfo['3. low'],
          close: stockInfo['4. close'],
          closeAdj: stockInfo['5. adjusted close'],
          vol: stockInfo['6. volume'],
          dividend: stockInfo['7. dividend amount'],
          end: stockInfo['7. dividend amount'],
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

export const replaceItems = (obj, mappedKeys) =>
  Object.keys(obj)
    .map(key => {
      const newKey = mappedKeys[key] || key
      return { [newKey]: obj[key] }
    })
    .reduce((accum, value, ind) => {
      var keyName = Object.keys(value)[0]
      return { ...accum, [keyName]: value[keyName] }
    }, {})

/**
 * Searches an array for a text term
 * @param {Array} arr - haystack
 * @param {Any} term - needle
 * @returns {Array}
 *  returns an array of booleans, with the same number of elements as the
 *  search array. Each element corresponds to a match (or lack thereof)
 *  inside the array. e.g [false, true, false] would mean that was one match
 *  in the search array: on index 1.
 */
export const searchArr = (arr: any[], term: string): Object[] => {
  if (!term) {
    return arr
  }
  // term should modify the regex.
  // gotcha: need to (double) escape the backslash since it's in a string.
  const re = new RegExp(`\\b${term}`, 'i')
  const matches = arr.filter(el => {
    const str = typeof el === 'object' ? JSON.stringify(el) : el.toString()
    return re.test(str)
  })
  return matches
}

/**
 * Use multiple filters on an array of object
 * @param {Object[]} arr - the array to filter
 *  example:
 * [
 *   {fruit: 'apple', count: 1, id: 123},
 *   {fruit: 'pear', count: 4, id: 234},
 *   {fruit: 'orange', count: 4, id: 456}
 * ]
 * @param {Object.<Array>} filters - an object with the filter criteria as the property names
 *  example:
 * {
 *   fruit: ['apple', 'orange'],
 *   count: [4]
 * }
 * @returns {Object[]} object array - filtered array of object
 */
export const multiFilter = (
  arr: Object[],
  filters: {
    [key: string]: any[],
  },
): Object[] => {
  const filterKeys = Object.keys(filters)
  return arr.filter(eachObj => {
    return filterKeys.every(eachKey => {
      if (!filters[eachKey].length) {
        return true // passing an empty filter means that filter is ignored.
      }
      return filters[eachKey].includes(eachObj[eachKey])
    })
  })
}
