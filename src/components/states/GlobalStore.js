import React from 'react'
import { observable, computed, action, autorun, decorate, observe } from 'mobx'


class GlobalStore {
  //Title
  title = 'Connectable'
  //Global
  error = null
  optionRender = {
    show: false,
    render: null
  }
  //LoginPage
  email = ''
  password = ''
  role = null
  //RegisterPage
  _email = ''
  _password1 = ''
  _password2 = ''
  emailVerification = {
    isSending: false,
    lastSent: null
  }

  //Auth
  user = {
    isLoading: true,
    data: null
  }
  get isAuth() {
    return !this.user.isLoading && this.user.data != null
  }

  get uid() {
    return this.user.isLoading ? null : this.user.data.uid
  }
}

export default decorate(GlobalStore, {
  title: observable,
  error: observable,
  optionRender: observable,
  email: observable,
  password: observable,
  role: observable,
  _email: observable,
  _password1: observable,
  _password2: observable,
  emailVerification: observable,
  user: observable,
  isAuth: computed,
  uid: computed
})

const StoreContext = React.createContext(new GlobalStore())

export const withStoreContext = Component => props => {
  return <StoreContext.Provider value={new GlobalStore()}>
    <Component {...props} />
  </StoreContext.Provider>
}

export const useStore = () => {
  return React.useContext(StoreContext)
}
