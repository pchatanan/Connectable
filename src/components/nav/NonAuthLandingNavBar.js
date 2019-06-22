import React from 'react'
import { routes } from '../routes'
import { withRouter } from 'react-router-dom'
import { NavBar, Icon } from 'simply-ui'

const NonAuthLandingNavBar = props => {
  const { pathname } = props.location
  var items = []
  if (pathname != routes.LandingPage.path) {
    items.push({
      onClick: () => {
        props.history.push(routes.LandingPage.path)
      },
      icon: Icon.Home
    })
  }
  if (pathname != routes.LoginPage.path) {
    items.push({
      onClick: () => {
        props.history.push(routes.LoginPage.path)
      },
      icon: Icon.Login
    })
  }
  if (pathname != routes.RegisterPage.path) {
    items.push({
      onClick: () => {
        props.history.push(routes.RegisterPage.path)
      },
      icon: Icon.Register
    })
  }
  return <NavBar.MenuItem items={items} />
}

export default withRouter(NonAuthLandingNavBar)