import React from 'react'
import { NavBar, Icon } from 'simply-ui'
import { routes } from '../../routes';
import * as firebase from 'firebase'
import { withRouter } from 'react-router-dom'

const CompanyNavBar = props => {
  const { pathname } = props.location
  var items = []
  if (pathname != routes.LandingPage.path) {
    items.push({
      onClick: () => { props.history.push(routes.LandingPage.path) },
      icon: Icon.Home
    })
  }
  if (pathname != routes.AddPositionPage.path) {
    items.push({
      onClick: () => { props.history.push(routes.AddPositionPage.path) },
      icon: Icon.Add
    })
  }
  items.push({
    onClick: () => { firebase.auth().signOut() },
    icon: Icon.Logout
  })
  return <NavBar.MenuItem items={items} />
}

export default withRouter(CompanyNavBar)