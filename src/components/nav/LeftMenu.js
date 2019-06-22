import React from 'react'
import { NavBar } from 'simply-ui'
import { useStore } from '../states/GlobalStore';
import { observer } from 'mobx-react-lite';

const LeftMenu = props => {
  const store = useStore()
  return <NavBar.TitleContainer>
    <NavBar.TitleSpan>{store.title}</NavBar.TitleSpan>
  </NavBar.TitleContainer>
}

export default observer(LeftMenu)