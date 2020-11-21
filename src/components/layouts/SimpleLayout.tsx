import { Breadcrumbs, Link } from "@material-ui/core"
import React from "react"
import { Link as RouterLink } from "react-router-dom"

const SimpleLayout: React.FC<SimpleLayoutProps> = ({
  title,
  breadcrumbs = [],
  children
}) => {
  return (
    <div className="pt-12">
      {breadcrumbs.length !== 0 && (
        <Breadcrumbs className="z-10 relfative">
          {breadcrumbs.map((crumb, index) =>
            Boolean(crumb.href) ? (
              <Link
                key={index}
                color="inherit"
                component={RouterLink}
                to={crumb.href!}
                children={crumb.label}
              />
            ) : (
              <Link key={index} color="inherit" children={crumb.label} />
            )
          )}
          <Link color="inherit" children="" />
        </Breadcrumbs>
      )}
      <h1 className="font-bold text-9xl overflow-hidden">{title}</h1>

      {children}
    </div>
  )
}

export interface Breadcrumb {
  label: string
  href?: string
}

export interface SimpleLayoutProps {
  title: string
  breadcrumbs?: Breadcrumb[]
}

export default SimpleLayout
