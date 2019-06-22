import React from 'react'

const useHover = () => {
  const [hovering, setHovering] = React.useState(false)
  return {
    bind: {
      onMouseEnter: e => {
        setHovering(true)
      },
      onMouseLeave: e => {
        setHovering(false)
      }
    },
    value: hovering
  }
}

export { useHover }