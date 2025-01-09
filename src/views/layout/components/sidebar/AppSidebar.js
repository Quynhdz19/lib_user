import CIcon from '@coreui/icons-react'
import { CCloseButton, CSidebar, CSidebarBrand, CSidebarHeader } from '@coreui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logo } from 'src/assets/brand/logo'
import { sygnet } from 'src/assets/brand/sygnet'
import { RouteMap } from 'src/routes/routeMap'
import { setAppSiderCollapsed } from 'src/redux/modules/appSlice'
import navigation from './_nav'
import navigationAdmin from './_navAdmin'
import { AppSidebarNav } from './AppSidebarNav'

const AppSidebar = () => {
  const appState = useSelector((state) => state.app)
  const authState = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const role = authState.user?.role
  const menu = role === 'STUDENT' ? navigation : navigationAdmin

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      visible={!appState.sider.collapsed}
      onVisibleChange={(visible) => {
        dispatch(setAppSiderCollapsed(!visible))
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to={RouteMap.HomePage}>
          <CIcon customClassName="sidebar-brand-full" icon={logo} height={100} />
          <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={100} />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch(setAppSiderCollapsed(!appState.sider.collapsed))}
        />
      </CSidebarHeader>
      <AppSidebarNav items={menu} />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
