import React from "react"
import { Route, Router, Switch } from "react-router-dom"
import history from "./utils/history"
import AboutView from "./views/AboutView"
import LandingView from "./views/LandingView"
import NotFound from "./views/NotFound"

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={LandingView} />
        <Route path="/about" component={AboutView} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App
