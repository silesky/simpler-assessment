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
    changeTextFilter: ({ setSearchText, setFilteredStocks }) => value => {
      setSearchText(value)
      // don't allow leading spaces
      if (!value) {
        setSearchText('')
        setFilteredStocks(initialStocks)
      } else {
        const filteredBySearch = initialStocks.filter(eachStock => {
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
        setLessThanFilter: ({ target: { value } }) => {
          const intVal = Number(value)
          setLessThan(intVal)
          filterBy(stock => stock.dates[0].close < intVal, intVal)
          localStorage.setItem('lessThan', intVal)
        },
        setChangeTextFilter: ({ target: { value } }) => {
          const trimmedVal = value.trim()
          changeTextFilter(trimmedVal)
          localStorage.setItem('textSearchInput', trimmedVal)
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
