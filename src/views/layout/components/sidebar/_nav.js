import { cilHome, cilTask } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavItem, CNavTitle } from '@coreui/react'
import React from 'react'
import { RouteMap } from 'src/routes/routeMap'

const _nav = [
  {
    component: CNavItem,
    name: 'Trang chủ',
    to: RouteMap.HomePage,
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Bài học',
  },
  {
    component: CNavItem,
    name: 'Khóa học của tôi',
    to: RouteMap.MyLearningPage,
    icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
  },
]

export default _nav
