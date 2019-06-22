import React from 'react'
import { Container, Widget } from 'simply-ui'
import JobPosting from './JobPosting';
import Recruitment from './Recruitment';
import Application from './Application';
import { useStore } from '../../../states/GlobalStore';

const items = [
  {
    label: 'Job Posting',
    value: 'job_posting'
  },
  {
    label: 'Recruitment',
    value: 'recruitment'
  },
  {
    label: 'Application',
    value: 'application'
  }
]

const EditPosition = props => {
  const store = useStore()
  const defaultIdx = 1
  const { position, onChange } = props
  const [section, setSection] = React.useState(items[defaultIdx].value)
  return (<>
    <Widget.SelectView defaultIdx={defaultIdx} styled={`
      position: sticky;
      top: 0;
    `} items={items} onChange={idx => { setSection(items[idx].value) }} store={store} />
    <Container.FlexBox>
      <Container.VerticalForm onSubmit={e => {
        console.log('Submitted')
        e.preventDefault()
      }}>
        {section === 'job_posting' && <JobPosting data={position.job_posting} onChange={job_posting => {
          onChange({ ...position, job_posting })
        }} />}
        {section === 'recruitment' && <Recruitment data={position.recruitment} onChange={recruitment => {
          onChange({ ...position, recruitment })
        }} />}
        {section === 'application' && <Application data={position.application} onChange={application => {
          onChange({ ...position, application })
        }} />}
      </Container.VerticalForm>
    </Container.FlexBox>
  </>)
}

export default EditPosition