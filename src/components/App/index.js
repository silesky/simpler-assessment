
import React from 'react'
import { Switch, Route } from 'react-router'
import Home from '../../screens/Home'

const App = (): React.Element<any> =>
  (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  )

export default App
