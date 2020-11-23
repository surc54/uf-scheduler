import { AnimatePresence, AnimateSharedLayout } from "framer-motion"
import React from "react"
import { Switch } from "react-router-dom"
import SimpleLayout from "../components/layouts/SimpleLayout"
import AboutView from "./landing/AboutView"
import HomeView from "./landing/HomeView"
import NotFound from "./landing/NotFound"

const LandingView: React.FC = props => {
  return (
    <AnimateSharedLayout type="crossfade">
      <AnimatePresence exitBeforeEnter>
        <Switch>
          <SimpleLayout
            path="/about"
            title="About"
            breadcrumbs={[{ label: "UF Scheduler", href: "/" }]}
            component={AboutView}
          />
          <SimpleLayout
            path="/"
            title="UF Scheduler"
            exact
            component={HomeView}
          />
          <SimpleLayout
            path="*"
            title="404"
            breadcrumbs={[{ label: "UF Scheduler", href: "/" }]}
            component={NotFound}
          />
        </Switch>
      </AnimatePresence>
    </AnimateSharedLayout>
  )
}

export default LandingView
