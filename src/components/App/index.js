
import 'App/normalize.css'

import React from 'react'
import { Switch, Route } from 'react-router'
import Home from 'Home'
import Sessions from 'Sessions'
import Session from 'Session'
import NewsOverview from 'NewsOverview'
import styles from './styles.css'

const App = (): React.Element<any> =>
  (<div className={styles.wrapper}>
    <H1>Hello World</H1>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/sessions" component={Sessions} />
      <Route exact path="/sessions/:sessionName/" component={Session} />
      <Route exact path="/news/:page?/" component={NewsOverview} />
    </Switch>
  </div>)

export default App
