import { Breadcrumbs, Link, makeStyles } from "@material-ui/core"
import clsx from "clsx"
import { motion, AnimatePresence } from "framer-motion"
import React from "react"
import { Link as RouterLink, Route, RouteProps } from "react-router-dom"

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.primary.main
  }
}))

const SimpleLayout: React.FC<SimpleLayoutProps> = ({
  title,
  breadcrumbs = [],
  component: Component,
  ...others
}) => {
  const classes = useStyles()

  const generateCrumbs = () => {
    return breadcrumbs.map((crumb, index) => (
      <Link
        key={index}
        color="inherit"
        component={RouterLink}
        to={crumb.href!}
        children={crumb.label}
        {...(crumb.props ?? {})}
      />
    ))
  }

  const crumbs = (
    <Breadcrumbs>
      {generateCrumbs()}
      <Link color="inherit" children="" />
    </Breadcrumbs>
  )

  return (
    <Route
      {...others}
      render={matchProps => (
        <div className="pt-12 pb-8 grid grid-cols-1 lg:grid-cols-2 min-h-full px-4 container mx-auto">
          <div className="hidden lg:block"></div>
          <div className="flex flex-col justify-center items-start h-full">
            {breadcrumbs.length !== 0 ? crumbs : null}
            <motion.h1
              layout
              layoutId="simpleLayoutTitle"
              className={clsx(
                "font-bold text-5xl overflow-hidden mb-4 w-full",
                classes.title
              )}
            >
              {title}
            </motion.h1>

            <Component {...matchProps} />
          </div>
        </div>
      )}
    />
  )
}

export interface Breadcrumb {
  label: string
  href: string
  props?: Record<string, any>
}

export interface SimpleLayoutProps
  extends Omit<RouteProps, "component" | "render"> {
  title: string
  breadcrumbs?: Breadcrumb[]
  component: any
}

export default SimpleLayout
