import { Checkbox } from '@material-tailwind/react'
import React from 'react'

const CheckBoxz = (props) => {
  const { children, label, ...prop } = props
  return (
    <Checkbox label={children || label} labelProps={{ className: 'text-sm text-color font-normal' }} color="orange" {...prop} />
  )
}

export default CheckBoxz