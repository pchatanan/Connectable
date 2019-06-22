import React from 'react'
import { Container, Widget } from 'simply-ui'
import ArrayInput from '../ArrayInput';

const JobPosting = props => {
  const { data, onChange } = props
  const { location, job_intro, job_responsibility, job_requirement } = data
  return (<>
    <Container.FormItem>
      <Widget.Label htmlFor='location'>Location</Widget.Label>
      <Widget.Input id='location' value={location} onChange={e => {
        onChange({ ...data, location: e.target.value })
      }}></Widget.Input>
    </Container.FormItem>
    <Container.FormItem>
      <Widget.Label htmlFor='job_intro' >Job Introduction</Widget.Label>
      <Widget.TextArea id='job_intro' value={job_intro} onChange={e => {
        onChange({ ...data, job_intro: e.target.value })
      }}></Widget.TextArea>
    </Container.FormItem>
    <ArrayInput label='Job Responsibilities' value={job_responsibility} onChange={newValue => {
      onChange({ ...data, job_responsibility: newValue })
    }} />
    <ArrayInput label='Job Requirements' value={job_requirement} onChange={newValue => {
      onChange({ ...data, job_requirement: newValue })
    }} />
  </>)
}

export default JobPosting