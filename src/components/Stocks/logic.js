// @flow
import { compose, withStateHandlers, mapProps, lifecycle } from 'recompose'
import type { StockT } from '../../shared/types'
import { getStocks } from '../../shared/utils'

const initialStocks: StockT[] = getStocks()
const withLogic = compose(
  withStateHandlers(
    {
      stocks: initialStocks,
      lessThan: 0,
      textSearchInput: '',
    },
    {
      setLessThan: () => input => {
        const value = Number(input)
        localStorage.setItem('lessThan', value)
        localStorage.setItem('textSearchInput', '')
        const newState = !value
          ? {
            stocks: initialStocks,
            textSearchInput: '',
            lessThan: 0,
          }
          : {
            stocks: initialStocks.filter(
              stock => stock.dates[0].close < value
            ),
            lessThan: value,
            textSearchInput: '',
          }
        return newState
      },
      setChangeText: () => input => {
        const value = input.trim()
        localStorage.setItem('textSearchInput', value)
        const filterByText = textInput =>
          initialStocks.filter(eachStock => {
            if (textInput === '') return true
            return eachStock.sym.includes(textInput.toUpperCase())
          })
        const newState = !value
          ? {
            textSearchInput: '',
            stocks: initialStocks,
            lessThan: 0,
          }
          : {
            textSearchInput: value,
            stocks: filterByText(value),
            lessThan: 0,
          }
        return newState
      },
    }
  ),
  lifecycle({
    componentDidMount () {
      const initialLessThan = Number(localStorage.getItem('lessThan')) || 0
      const initialTextSearchInput =
        localStorage.getItem('textSearchInput') || ''
      const { setLessThan, setChangeText } = this.props
      if (initialLessThan) {
        setLessThan(initialLessThan)
      }
      if (initialTextSearchInput) setChangeText(initialTextSearchInput)
    },
  }),
  mapProps(
    ({
      lessThan,
      moreThan,
      setChangeText,
      setLessThan,
      stocks,
      textSearchInput,
    }) => {
      return {
        lessThan,
        moreThan,
        setChangeTextFilter: ({ target: { value } }) => setChangeText(value),
        setLessThanFilter: ({ target: { value } }) => setLessThan(value),
        stocks,
        textSearchInput,
      }
    }
  )
)

export default withLogic
