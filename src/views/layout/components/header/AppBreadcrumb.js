import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { RouteMap } from 'src/routes/routeMap'
import CourseDetailPage from 'src/views/pages/courses/CourseDetailPage'
import CoursesListPage from 'src/views/pages/courses/CoursesListPage'
import DashboardPage from 'src/views/pages/dashboard/DashboardPage'

const routes = [
  { path: RouteMap.HomePage, exact: true, name: 'Home' },
  { path: RouteMap.DashboardPage, name: 'Dashboard', element: DashboardPage },
  { path: RouteMap.CoursesListPage, name: 'Courses', element: CoursesListPage },
  { path: RouteMap.CourseDetailPage, name: 'CourseDetail', element: CourseDetailPage },
  // { path: '/courses-video', name: 'CoursesList', element: VideoCourses },
]

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.name : false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="my-0">
      <CBreadcrumbItem href={RouteMap.HomePage}>Home</CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            key={index}
          >
            {breadcrumb.name}
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
