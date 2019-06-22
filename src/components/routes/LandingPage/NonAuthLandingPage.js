import React from 'react'
import { useStore } from '../../states/GlobalStore';

const NonAuthLandingPage = props => {
  const store = useStore()
  store.title = 'Connectable'
  return (<div>
    NonAuthLandingPage
  </div>)
}

export default NonAuthLandingPage