// @flow
import {
  compose,
  withState,
  withHandlers,
  mapProps,
  lifecycle,
} from 'recompose'
import type { StockT } from '../../shared/types'
import { getStocks } from '../../shared/utils'

const initialStocks: StockT[] = getStocks()
const withLogic = compose(
  withState('stocks', 'setFilteredStocks', initialStocks),
  withState('lessThan', 'setLessThan', 0),
  withState('textSearchInput', 'setSearchText', ''),
  withHandlers({
    filterBy: ({ setFilteredStocks, setSearchText }) => (filterCB, value) => {
      localStorage.setItem('textSearchInput', '')
      if (!value) {
        setFilteredStocks(initialStocks)
        setSearchText('')
      } else {
        const filtered = initialStocks.filter(filterCB)
        setFilteredStocks(filtered)
      }
    },
    changeTextFilter: ({
      setSearchText,
      stocks,
      setFilteredStocks,
    }) => value => {
      setSearchText(value)
      // don't allow leading spaces
      if (!value) {
        setSearchText('')
        setFilteredStocks(initialStocks)
      } else {
        const filteredBySearch = stocks.filter(eachStock => {
          if (value === '') return true
          return eachStock.sym.includes(value.toUpperCase())
        })
        setFilteredStocks(filteredBySearch)
      }
    },
    resetLessThan: ({ setLessThan }) => () => {
      setLessThan(0)
      localStorage.setItem('lessThan', 0)
    },
  }),
  lifecycle({
    componentDidMount () {
      const initialLessThan = Number(localStorage.getItem('lessThan')) || 0
      const initialTextSearchInput =
        localStorage.getItem('textSearchInput') || ''
      const {
        setLessThan,
        setSearchText,
        filterBy,
        changeTextFilter,
      } = this.props
      setLessThan(initialLessThan)
      setSearchText(initialTextSearchInput)
      if (initialLessThan) {
        filterBy(
          stock => stock.dates[0].close < initialLessThan,
          initialLessThan
        )
      }
      if (initialTextSearchInput) changeTextFilter(initialTextSearchInput)
    },
  }),
  mapProps(
    ({
      filterBy,
      textSearchInput,
      changeTextFilter,
      stocks,
      setLessThan,
      moreThan,
      lessThan,
      resetLessThan,
    }) => {
      return {
        setLessThanFilter: value => {
          setLessThan(value)
          filterBy(stock => stock.dates[0].close < value, value)
          localStorage.setItem('lessThan', value)
        },
        setChangeTextFilter: value => {
          changeTextFilter(value)
          localStorage.setItem('textSearchInput', value)
          resetLessThan()
        },
        textSearchInput,
        stocks,
        moreThan,
        lessThan,
      }
    }
  )
)

export default withLogic
