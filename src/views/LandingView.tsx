import { AnimateSharedLayout, motion, Variants } from "framer-motion"
import React from "react"
import { RouteComponentProps, Switch } from "react-router-dom"
import SimpleLayout from "../components/layouts/SimpleLayout"
import AboutView from "./landing/AboutView"
import HomeView from "./landing/HomeView"
import NotFound from "./landing/NotFound"

const LandingView: React.FC<RouteComponentProps> = props => {
  const layoutVariants: Variants = {
    hidden: {
      translateX: 50,
      opacity: 0,
      transition: {
        type: "tween"
      }
    },
    visible: {
      translateX: 0,
      opacity: 1,
      transition: {
        type: "tween"
      }
    }
  }

  return (
    <div className="w-full h-full overflow-x-hidden">
      <motion.div
        className="h-full"
        variants={layoutVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <AnimateSharedLayout type="crossfade">
          <Switch location={props.location} key={props.location.pathname}>
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
        </AnimateSharedLayout>
      </motion.div>
    </div>
  )
}

export default LandingView
