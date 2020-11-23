import { createMuiTheme, ThemeProvider } from "@material-ui/core"
import React from "react"
import { Route, Router, Switch } from "react-router-dom"
import history from "./utils/history"
import ApplicationView from "./views/ApplicationView"
import LandingView from "./views/LandingView"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#514EFF"
    }
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 10
      },
      contained: {
        boxShadow: "none"
      }
    }
  }
})

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Switch>
          <Route path="/app" render={() => <ApplicationView />} />
          <Route path="/" render={() => <LandingView />} />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
