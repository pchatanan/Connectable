import React from 'react'
import { NavBar, Icon } from 'simply-ui'
import { routes } from '../../routes'
import * as firebase from 'firebase'
import { withRouter } from 'react-router-dom'

const IndividualNavBar = props => {
  const items = [
    {
      onClick: () => { firebase.auth().signOut() },
      icon: Icon.Logout
    }
  ]
  return (<>
    <NavBar.MenuItem items={items} />
  </>)
}

export default withRouter(IndividualNavBar)