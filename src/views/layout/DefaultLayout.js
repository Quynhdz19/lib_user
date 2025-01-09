import React from 'react'
import AppContent from './components/AppContent'
import AppHeader from './components/header/AppHeader'
import AppSidebar from './components/sidebar/AppSidebar'

const DefaultLayout = () => {
  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
      </div>
    </>
  )
}

export default DefaultLayout
