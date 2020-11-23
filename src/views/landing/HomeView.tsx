import { Link, makeStyles } from "@material-ui/core"
import clsx from "clsx"
import React from "react"
import { Link as RouterLink } from "react-router-dom"
import LandingButton from "../../components/shared/LandingButton"
import history from "../../utils/history"

const useStyles = makeStyles(theme => ({
  links: {
    "& > *": {
      marginRight: 16
    }
  }
}))

const goToApp = () => {
  history.push("/app")
}

const HomeView: React.FC = () => {
  const classes = useStyles()

  return (
    <>
      <p className="text-3xl font-medium">
        Easily organize your semester at UF
      </p>
      <LandingButton className="mt-12" onClick={goToApp}>
        Get started
      </LandingButton>
      <div className={clsx("mt-8", classes.links)}>
        <Link component={RouterLink} to="/about">
          About
        </Link>
        <Link href="https://www.hadithya.com/scheduler">Version 1</Link>
      </div>
    </>
  )
}

export default HomeView
