import React from "react"
import { Link } from "react-router-dom"

const LandingView: React.FC = () => {
  return (
    <div>
      UF Scheduler
      <Link to="/f">Go home</Link>
    </div>
  )
}

export default LandingView
