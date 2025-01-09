import { CContainer, CSpinner } from '@coreui/react'
import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

const AppContent = () => {
  return (
    <CContainer className="px-4 pb-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Outlet />
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
