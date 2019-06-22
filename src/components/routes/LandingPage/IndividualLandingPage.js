import React from 'react'
import { useStore } from '../../states/GlobalStore';

const IndividualLandingPage = props => {
  const store = useStore()
  store.title = 'Individal Landing page'
  return (<div>
    IndividualLandingPage
  </div>)
}

export default IndividualLandingPage