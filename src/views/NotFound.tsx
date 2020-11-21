import React from "react"
import { Link } from "@material-ui/core"
import { Link as RouterLink } from "react-router-dom"
import SimpleLayout from "../components/layouts/SimpleLayout"

const NotFound: React.FC = () => {
  return (
    <div className="container mx-auto">
      <SimpleLayout
        title="404"
        breadcrumbs={[{ label: "UF Scheduler", href: "/" }]}
      >
        This page does not exist.
        <br />
        <Link component={RouterLink} to="/">
          Click here to back home.
        </Link>
      </SimpleLayout>
    </div>
  )
}

export default NotFound
