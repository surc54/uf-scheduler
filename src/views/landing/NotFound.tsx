import { Button, Link } from "@material-ui/core"
import clsx from "clsx"
import { motion } from "framer-motion"
import React from "react"
import { Link as RouterLink } from "react-router-dom"

const NotFound: React.FC = () => {
  const [scale, setScale] = React.useState<number>(10)

  return (
    <>
      This page does not exist.
      <br />
      <Link component={RouterLink} to="/">
        Click here to back home.
      </Link>
      <br />
      <motion.div
        className="bg-red-600 text-white py-6 px-4 inline-block rounded-xl"
        children="Hello world"
        animate={{ scale: [0.9, 1, 1.1] }}
      />
      <br />
      <Button
        variant="contained"
        onClick={() => setScale(scale === 10 ? 20 : 10)}
      >
        Toggle
      </Button>
      <br />
      <motion.div
        layout
        className={clsx([
          "inline-block",
          "max-w-md",
          "overflow-y-auto",
          "my-4",
          {
            "bg-blue-300": scale === 10,
            "bg-green-300": scale === 20
          }
        ])}
      >
        <motion.div layout>{generateWords(scale)}</motion.div>
      </motion.div>
    </>
  )
}

const generateWords = (size: number): string => {
  let x = ""
  for (let i = 0; i < size; i++) {
    x += Math.random().toString() + " "
  }

  return x.substring(0, x.length - 1)
}

export default NotFound
