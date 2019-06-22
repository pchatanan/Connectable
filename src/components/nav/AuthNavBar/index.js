import React from 'react'
import { withRouter } from 'react-router-dom'
import UnknownNavBar from './UnknownNavBar'
import IndividualNavBar from './IndividualNavBar'
import CompanyNavBar from './CompanyNavBar';
import DefaultNavBar from './DefaultNavBar';
import { useStore } from '../../states/GlobalStore';

const AuthNavBar = props => {
  const store = useStore()
  switch (store.role) {
    case 'unknown':
      return <UnknownNavBar />
    case 'individual':
      return <IndividualNavBar />
    case 'company':
      return <CompanyNavBar />
    default:
      return <DefaultNavBar />
  }
}

export default withRouter(AuthNavBar)