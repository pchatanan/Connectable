import React from 'react'
import { useStore } from '../../states/GlobalStore'
import EmailNotVerified from './EmailNotVerified'
import UnknownRolePage from './UnknownRolePage'
import CompanyLandingPage from './CompanyLandingPage'
import NonAuthLandingPage from './NonAuthLandingPage'
import IndividualLandingPage from './IndividualLandingPage';

const LandingPage = props => {
  const store = useStore()
  if (store.isAuth) {
    if (store.user.data.emailVerified) {
      switch (store.role) {
        case 'unknown':
          return <UnknownRolePage />
        case 'individual':
          return <IndividualLandingPage />
        case 'company':
          return <CompanyLandingPage />
        default:
          return (<div>Auth Landing Page</div>)
      }

    }
    else {
      return <EmailNotVerified />
    }
  }
  return <NonAuthLandingPage />
}

export default LandingPage