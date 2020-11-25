import { Button } from "@material-ui/core"
import { motion, Variants } from "framer-motion"
import React from "react"
import { Link } from "react-router-dom"

const ApplicationView: React.FC = () => {
  const variants: Variants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1
    }
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <h1>ApplicationView</h1>
      <Button component={Link} to="/">
        Go home
      </Button>
    </motion.div>
  )
}

export default ApplicationView
