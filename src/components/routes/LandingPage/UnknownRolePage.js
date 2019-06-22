import React from 'react'
import { Container, Widget } from 'simply-ui'
import * as firebase from 'firebase'
import { useStore } from '../../states/GlobalStore';

const UnknownRolePage = props => {
  const store = useStore()
  store.title = 'Choose Account Type'
  const [role, setRole] = React.useState('individual')
  const [updatingRole, setUpdatingRole] = React.useState(false)
  const onRoleChange = e => {
    setRole(e.currentTarget.value)
  }
  return (<Container.FlexBox styled={`
  justify-content: flex-start;
  height: 100%;
  overflow: auto;
  padding: 10px;
  `}>

    <h1>Choose Account Type</h1>

    <Container.VerticalForm
      styled={`height: min-content;`}
      onSubmit={e => {
        var setRole = firebase.functions().httpsCallable('setRole');
        setUpdatingRole(true)
        setRole({ role }).then(() => {
          setUpdatingRole(false)
        });
        e.preventDefault()
      }}>

      <Widget.Label htmlFor='role_individual'
        styled={`
          padding: 16px;
          max-width: 800px;
          width: 100%;
          box-sizing: border-box;
          border-radius: 6px;
          cursor: pointer;
          background: ${role == 'individual' ? '#FF6FD8' : 'LightGray'};
          &:hover {
            background: ${role == 'individual' ? '#FF6FD8' : '#ffbced'};
          }
          transition: 0.2s;
        `}>
        <Widget.Input
          styled={`display: none;`}
          type='radio'
          name='role'
          id='role_individual'
          value='individual'
          checked={role === 'individual'}
          onChange={onRoleChange}></Widget.Input>
        <span>Individual account</span>
      </Widget.Label>


      <Widget.Label htmlFor='role_company'
        styled={`
          padding: 16px;
          max-width: 800px;
          width: 100%;
          box-sizing: border-box;
          border-radius: 6px;
          margin: 10px 0;
          cursor: pointer;
          background: ${role == 'company' ? '#FF6FD8' : 'LightGray'};
          &:hover {
            background: ${role == 'company' ? '#FF6FD8' : '#ffbced'};
          }
          transition: 0.2s;
        `}>
        <Widget.Input
          styled={`display: none;`}
          type='radio'
          name='role'
          id='role_company'
          value='company'
          checked={role === 'company'}
          onChange={onRoleChange}></Widget.Input>
        <span>Company account</span>
      </Widget.Label>

      <Widget.Button type='submit'>{updatingRole ? 'Seting role...' : 'Submit'}</Widget.Button>
    </Container.VerticalForm>
  </Container.FlexBox>)
}

export default UnknownRolePage