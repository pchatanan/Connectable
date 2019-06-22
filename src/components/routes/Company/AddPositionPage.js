import React from 'react'
import { useStore } from '../../states/GlobalStore'
import { observer } from 'mobx-react'
import EditPosition from './EditPosition';

const newlyAddedPosition = {
  job_posting: {
    location: '',
    job_intro: '',
    job_responsibility: [],
    job_requirement: []
  },
  recruitment: {
    pipelines: []
  },
  application: {
    cover_letter: true,
    questions: []
  }
}


const AddPositionPage = props => {
  const store = useStore()
  const [position, setPosition] = React.useState(newlyAddedPosition)
  store.title = 'Add New Position'
  return (<div>
    <EditPosition position={position} onChange={setPosition} />
  </div>)
}

export default observer(AddPositionPage)