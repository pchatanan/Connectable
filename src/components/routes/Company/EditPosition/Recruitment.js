import React from 'react'
import { Container, Widget } from 'simply-ui'
import { useHover } from '../../../utils/CustomHook';

const EditProcess = props => {
  const { data, onChange } = props
  const { title, format } = data
  const formatValue = format.sameAsTitle ? title : format.value
  return <>
    <Container.FormItem>
      <Widget.Label>Title</Widget.Label>
      <Widget.Input value={title}></Widget.Input>
    </Container.FormItem>
    <Container.FormItem>
      <Widget.Label>Format</Widget.Label>
      <Widget.Input value={formatValue}></Widget.Input>
    </Container.FormItem>
  </>
}

const PreviewProcess = props => {
  const hover = useHover()
  const { title, format } = props.data
  const formatValue = format.sameAsTitle ? title : format.value
  console.log(hover.value)
  return <Container.FlexBox {...hover.bind}>
    <span>Title: <b>{title}</b></span>
    <span>Format: <b>{formatValue}</b></span>
  </Container.FlexBox>
}

const Recruitment = props => {
  const { data, onChange } = props
  const { pipelines } = data
  const [editItem, setEditItem] = React.useState(null)
  const isEditting = editItem !== null
  return (<>
    {pipelines.map((pipeline, idx) => {
      return editItem === idx ? <EditProcess key={idx} data={pipeline} onChange={newPipeline => {
        var newPipelines = [...pipelines]
        newPipelines[idx] = newPipeline
        onChange(newPipelines)
      }} /> : <PreviewProcess key={idx} data={pipeline} />
    })}
    <Widget.Button type='button' styled={`
      width: 50%;
      margin: auto;
    `} onClick={e => {
        onChange({
          pipelines: [...pipelines, {
            title: 'Interview Title',
            format: {
              sameAsTitle: true,
              value: ''
            }
          }]
        })
      }}>Add</Widget.Button>
  </>)
}

export default Recruitment