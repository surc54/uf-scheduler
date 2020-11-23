import React from "react"
import { Button, ButtonProps, Icon, makeStyles } from "@material-ui/core"
import clsx from "clsx"

const useStyles = makeStyles(theme => ({
  root: {
    transform: "translateY(-3px)",
    boxShadow: `0px 4px 0px ${theme.palette.primary.dark}`,
    transition: "transform 0.15s, box-shadow 0.15s",
    "&:hover": {
      background: theme.palette.primary.main,
      boxShadow: `0px 4px 0px ${theme.palette.primary.dark}`
    },
    "&:active": {
      background: theme.palette.primary.main,
      transform: "translateY(0)",
      boxShadow: `0px 1px 0px ${theme.palette.primary.dark}`
    }
  }
}))

const LandingButton: React.FC<LandingButtonProps> = ({
  children,
  className,
  ...others
}) => {
  const classes = useStyles()

  return (
    <Button
      className={clsx(classes.root, className, "text-2xl capitalize px-6 py-4")}
      variant="contained"
      color="primary"
      disableFocusRipple
      {...others}
    >
      {children}
      <Icon className="ml-4">arrow_forward</Icon>
    </Button>
  )
}

export interface LandingButtonProps extends ButtonProps {}

export default LandingButton
