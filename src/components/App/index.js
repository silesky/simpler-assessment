
import React from 'react'
import { Switch, Route } from 'react-router'
import Home from '../../screens/Home'
import Stock from '../../components/Stock'

const App = (): React.Element<any> =>
  (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/stocks/:stockName/" component={Stock} />
    </Switch>
  )

export default App
