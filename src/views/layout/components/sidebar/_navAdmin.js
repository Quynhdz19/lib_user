import { cilCloudUpload, cilHistory, cilHome, cilSpeedometer } from "@coreui/icons";
import CIcon from '@coreui/icons-react'
import { CNavItem, CNavTitle } from '@coreui/react'
import React from 'react'
import { RouteMap } from 'src/routes/routeMap'

const _navAdmin = [
  {
    component: CNavItem,
    name: 'Trang chủ',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Lịch sử tải file',
    to: RouteMap.HistoryDownloaded,
    icon: <CIcon icon={cilHistory} customClassName="nav-icon" />,
  },
]

export default _navAdmin
