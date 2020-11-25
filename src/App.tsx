import { createMuiTheme, ThemeProvider } from "@material-ui/core"
import { AnimatePresence } from "framer-motion"
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
        <Route
          render={({ location }) => (
            <>
              <AnimatePresence exitBeforeEnter>
                <Switch
                  location={location}
                  key={
                    location.pathname.startsWith("/app")
                      ? "Application"
                      : "Landing"
                  }
                >
                  <Route path="/app" component={ApplicationView} />
                  <Route path="/" component={LandingView} />
                </Switch>
              </AnimatePresence>
            </>
          )}
        />
      </Router>
    </ThemeProvider>
  )
}

export default App
