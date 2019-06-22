import React from 'react'
import { useStore } from '../states/GlobalStore'
import NonAuthLandingNavBar from './NonAuthLandingNavBar'
import * as firebase from 'firebase'
import AuthNavBar from './AuthNavBar'

const RightMenu = props => {
  const store = useStore()
  if (store.isAuth) {
    if (store.user.data.emailVerified) {
      return <AuthNavBar />
    }
    else {
      return (<div>
        <button onClick={e => {
          firebase.auth().signOut()
            .then(() => {
              store.error = 'logout successfully'
            })
            .catch(err => {
              store.error = err.mssage
            })
        }}>Logout</button>
      </div>)
    }

  }
  else {
    return <NonAuthLandingNavBar />
  }
}

export default RightMenu