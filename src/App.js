import { CSpinner } from '@coreui/react'
import React, { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'src/assets/scss/index.scss'
import routes from './routes'

const router = createBrowserRouter(routes)

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="pt-3 text-center">
          <CSpinner color="primary" variant="grow" />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
