import { CPlaceholder } from '@coreui/react'
import React from 'react'

const BasePlaceholder = () => {
  return (
    <CPlaceholder as="p" animation="wave">
      <CPlaceholder xs={5} />
      <CPlaceholder xs={12} />
      <CPlaceholder xs={12} />
      <CPlaceholder xs={8} />
    </CPlaceholder>
  )
}

export default BasePlaceholder
