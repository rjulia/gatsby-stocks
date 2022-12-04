import _ from 'lodash'
import React from "react"
import { navigate } from "gatsby"
import AuthService from "../services/auth.service"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const { getCurrentUser } = AuthService
  if ( _.isEmpty(getCurrentUser()) && location.pathname !== `/login/`) {
    navigate("/login/")
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute