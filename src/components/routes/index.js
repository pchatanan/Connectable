import React from 'react'
import { observer } from 'mobx-react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import * as firebase from 'firebase'
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import { useStore } from '../states/GlobalStore';
import TopNavBar from '../nav/TopNavBar';
import LandingPage from './LandingPage';
import ResetPasswordPage from './ResetPasswordPage';
import { Widget, Main } from 'simply-ui'
import AddPositionPage from './Company/AddPositionPage';

export const secureAuth = (Component, isAuth, role) => props => {
  const store = useStore()
  if (store.isAuth === isAuth && (!role || store.role === role)) {
    return <Component {...props} />
  }
  return <Redirect to={routes.LandingPage.path} push />
}

export const routes = {
  LandingPage: {
    path: '/',
    component: LandingPage
  },
  LoginPage: {
    path: '/login',
    component: secureAuth(LoginPage, false)
  },
  RegisterPage: {
    path: '/register',
    component: secureAuth(RegisterPage, false)
  },
  ResetPasswordPage: {
    path: '/reset_password',
    component: secureAuth(ResetPasswordPage, false)
  },
  AddPositionPage: {
    path: '/add_position',
    component: secureAuth(AddPositionPage, true, 'company')
  }
}

const AppRouter = props => {
  console.log('router')
  const store = useStore()
  React.useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      store.user = {
        isLoading: false,
        data: user
      }
    })
  }, [])

  React.useEffect(() => {
    if (store.isAuth) {
      const storedRole = localStorage.getItem(store.uid)
      if (storedRole && storedRole !== 'unknown') {
        console.log(`Found ${storedRole} !!!`)
        store.role = storedRole
      }
      else {
        return firebase.firestore().collection('users').doc(store.uid)
          .onSnapshot(doc => {
            console.log('Doc changed')
            if (doc.data() && doc.data().role) {
              store.user.data.getIdTokenResult(true)
                .then((idTokenResult) => {
                  const { role } = idTokenResult.claims
                  if (role) {
                    store.role = role
                    localStorage.setItem(store.uid, role)
                  }
                  else {
                    store.role = null
                  }
                })
                .catch((error) => {
                  store.error = error.message
                })
            }
            else {
              console.log('no data')
            }
          })
      }
    }
  }, [store.isAuth])
  if (store.user.isLoading) {
    return (<div>Authenticating...</div>)
  }
  if (store.isAuth && !store.role) {
    return (<div>Retrieving role...</div>)
  }
  return (<BrowserRouter>
    <TopNavBar />
    <Main.ContentContainer>
      {Object.values(routes).map((r, index) => <Route exact path={r.path} component={r.component} key={index} />)}
    </Main.ContentContainer>
    <Main.ErrorContainer show={store.error != null} onClick={e => { store.error = null }}>
      <span>{store.error}</span>
      <Widget.Button onClick={e => {
        store.error = null
      }}>dismiss</Widget.Button>
    </Main.ErrorContainer>
    <Main.OptionContainer option={store.optionRender} onClick={e => { store.optionRender = { show: false, render: null } }} />
  </BrowserRouter>)
}

export default observer(AppRouter)