import React from 'react'
import { Container, Widget, Icon } from 'simply-ui'

const ArrayInput = props => {
  const inputRef = React.useRef()
  const [temp, setTemp] = React.useState('')
  const [mouseOverIdx, setMouseOverIdx] = React.useState(null)
  const [mode, setMode] = React.useState({
    isEdit: false,
    idx: null
  })
  const { label, value, onChange } = props

  const handleOnAdd = () => {
    if (mode.isEdit) {
      setMode({
        isEdit: false,
        idx: null
      })
    }
    else {
      onChange([...value, temp])
    }
    setTemp('')
  }

  const isEditMode = idx => ((mouseOverIdx === idx && !mode.isEdit) || (mode.idx === idx && mode.isEdit))

  return (<Container.FormItem>
    <Widget.Label htmlFor='input_label'>{label}</Widget.Label>
    <Container.FlexBox styled={`flex-direction: row;`}>
      <Widget.Input ref={inputRef} styled={`
        flex: 5;
        min-width: 0;`} id='input_label' value={temp} onKeyUp={e => {
          if (e.key === 'Enter') {
            handleOnAdd()
          }
        }} onChange={e => {
          setTemp(e.target.value)
          if (mode.isEdit) {
            var newValue = [...value]
            newValue[mode.idx] = e.target.value
            onChange(newValue)
          }
        }}></Widget.Input>
      <Widget.Button type='button' styled={`
        flex: 2;
        margin-left: 12px;
        min-width: 0;
      `} onClick={e => {
          handleOnAdd()
        }}>{mode.isEdit ? 'Done' : 'Add'}</Widget.Button>
    </Container.FlexBox>
    {value.length > 0 && <ul style={{ fontSize: '22px', overflowWrap: 'break-word' }}>
      {value.map((text, idx, ary) => <Widget.EditableList editMode={isEditMode(idx)} key={idx} onMouseEnter={e => {
        setMouseOverIdx(idx)
      }} onMouseLeave={e => {
        setMouseOverIdx(null)
      }} >
        {mode.idx === idx ? temp : text}
        {isEditMode(idx) && <Container.FlexBox styled={`
          flex-direction: row;
          justify-content: flex-end;
          `}>
          {idx > 0 && <Widget.Button styled={`margin-right: 13.2px;`} circle type='button' onClick={e => {
            var newValue = [...value]
            newValue[idx] = newValue.splice(idx - 1, 1, newValue[idx])[0];
            onChange(newValue)
            if (mode.idx === idx) {
              setMode({
                isEdit: true,
                idx: idx - 1
              })
            }
            setMouseOverIdx(idx - 1)
          }}><Icon.Up /></Widget.Button>}
          {idx < ary.length - 1 && <Widget.Button styled={`margin-right: 13.2px;`} circle type='button' onClick={e => {
            var newValue = [...value]
            newValue[idx] = newValue.splice(idx + 1, 1, newValue[idx])[0];
            onChange(newValue)
            if (mode.idx === idx) {
              setMode({
                isEdit: true,
                idx: idx + 1
              })
            }
            setMouseOverIdx(idx + 1)
          }}><Icon.Down /></Widget.Button>}
          {mode.idx !== idx ? <Widget.Button styled={`margin-right: 13.2px;`} circle type='button' onClick={e => {
            setTemp(text)
            inputRef.current.focus()
            setMode({
              isEdit: true,
              idx
            })
          }}><Icon.Edit /></Widget.Button> : <Widget.Button styled={`margin-right: 13.2px;`} circle type='button' onClick={e => {
            setTemp('')
            setMode({
              isEdit: false,
              idx: null
            })
          }}><Icon.Close /></Widget.Button>}
          <Widget.Button circle type='button' onClick={e => {
            var newValue = [...value]
            newValue.splice(idx, 1)
            onChange(newValue)
          }}><Icon.Delete /></Widget.Button>
        </Container.FlexBox>}
      </Widget.EditableList>)}
    </ul>}
  </Container.FormItem>)
}

export default ArrayInput