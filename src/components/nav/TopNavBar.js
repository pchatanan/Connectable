import React from 'react'
import { Container, NavBar, Main } from 'simply-ui'
import RightMenu from './RightMenu';
import LeftMenu from './LeftMenu';
import AppLogo from '../icons/AppLogo';

const TopNavBar = props => {
  return (<Main.NavBarContainer>
    <NavBar.AppLogo logo={AppLogo} />
    <LeftMenu />
    <RightMenu />
  </Main.NavBarContainer>)

}

export default TopNavBar