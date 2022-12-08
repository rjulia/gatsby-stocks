import _ from 'lodash'
import React from "react"
import { Router } from "@reach/router"
import Profile from "../../templates/profile"
import PrivateRoute from "../../components/PrivateRoute"


const DashboardPage = (props) => {
  const path = _.get(props, 'pageContext.locale') === 'en' ? '/dashboard/' : `${_.get(props, 'pageContext.locale')}/dashboard/`
  console.log("🚀 ~ file: [...].js:11 ~ DashboardPage ~ path", path)
  return (
    <Router basepath={path}>
      <PrivateRoute path="profile/" component={Profile} />
    </Router>
  )
}

export default DashboardPage