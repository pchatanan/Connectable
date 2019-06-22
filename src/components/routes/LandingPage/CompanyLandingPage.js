import React from 'react'
import { useStore } from '../../states/GlobalStore';

const CompanyLandingPage = props => {
  const store = useStore()
  store.title = 'Company'
  return (<div>
    CompanyLandingPage
  </div>)
}

export default CompanyLandingPage